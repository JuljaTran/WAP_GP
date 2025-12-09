import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const DEFAULT = {
  username: null,
  userId: null,
  authId: null,
  avatar: null,
  totalPoints: 0,
  unlocked: []
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("quiz_user");
      return raw ? JSON.parse(raw) : DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  // Save current user whenever it changes
  useEffect(() => {
    if (!user?.username) return;
    localStorage.setItem("quiz_user", JSON.stringify(user));
  }, [user]);

  // Login an existing user
  const login = (userData) => {
    if (!userData?.profileId) {
      setUser(DEFAULT); // fallback guest
      return;
    }

  setUser(
      {
        username: userData.username,
        userId: userData.profileId,
        authId: userData.authId,
        avatar: userData.avatar,
        totalPoints: userData.totalPoints || 0,
        unlocked: userData.unlocked || []
      }
  );
};

  // Logout user
  const logout = () => {
    localStorage.removeItem("quiz_user");
  };

  
  // Set user's avatar
  const setAvatar = async (avatarKey) => {
    if (!user.userId) return;

    try {
      const response = await fetch(`http://localhost:1234/api/user/${user.userId}/avatar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ avatar: avatarKey })
      });

      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }

      setUser(u => ({
        ...u,
        avatar: avatarKey
      }));

    }
    catch (err) {
      console.error("Error setting avatar:", err);
    }
  }

  // Add points to the user and check if any animals are unlocked
  const addPoints = async (pts) => {
    if (!user || !user.userId) {
      console.error("No user logged in");
      return null;
    }

    try {
    const response = await fetch(`http://localhost:1234/api/user/${user.userId}/points`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ points: pts })
    });

    if (!response.ok) {
      throw new Error("Failed to update points");
    }

    const data = await response.json();

    setUser(u => ({
      ...u,
      totalPoints: data.totalPoints,
      unlocked: data.unlocked
    }));

    return data.unlocked.at (-1) || null; // return the last unlocked animal or null

  } catch (err) {
    console.error("Error adding points:", err);
    return null;
  }
};

  return (
    <UserContext.Provider value={{ user, login, logout, setAvatar, addPoints }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() { 
  return useContext(UserContext); 
}
