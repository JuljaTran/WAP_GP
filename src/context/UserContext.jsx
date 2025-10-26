import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const DEFAULT = {
  username: null,
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

  useEffect(() => {
    localStorage.setItem("quiz_user", JSON.stringify(user));
  }, [user]);

  const login = (username) => setUser(u => ({ ...u, username }));
  const setAvatar = (avatarKey) => setUser(u => ({ ...u, avatar: avatarKey }));
  const addPoints = (pts) => {
    setUser(u => {
      const newPoints = (u.totalPoints || 0) + pts;
      const unlocks = [...(u.unlocked || [])];
      const thresholds = [
        { key: "rabbit", pts: 100 },
        { key: "dog", pts: 500 },
        { key: "lion", pts: 1000 }
      ];
      thresholds.forEach(t => {
        if (newPoints >= t.pts && !unlocks.includes(t.key)) unlocks.push(t.key);
      });
      return { ...u, totalPoints: newPoints, unlocked: unlocks };
    });
  };
  const setUserState = (obj) => setUser(obj);

  return (
    <UserContext.Provider value={{ user, login, setAvatar, addPoints, setUserState }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(){ return useContext(UserContext); }
