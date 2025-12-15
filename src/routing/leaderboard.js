import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = req.app.get("db");

    const leaderboard = await db.collection("user").aggregate([
      {
        $lookup: {
          from: "user_auth",
          localField: "user_auth_id",
          foreignField: "_id",
          as: "auth"
        }
      },
      { $unwind: "$auth" },
      {
        $project: {
          _id: 1,
          username: "$auth.username",
          avatar: { $ifNull: ["$avatar", null] },
          totalPoints: { $ifNull: ["$totalPoints", 0] }
        }
      },
      { $sort: { totalPoints: -1 } }
    ]).toArray();

    res.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
