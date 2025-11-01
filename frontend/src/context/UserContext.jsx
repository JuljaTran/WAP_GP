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

  // Save current user whenever it changes
  useEffect(() => {
    if (user && user.username) {
      localStorage.setItem("quiz_user", JSON.stringify(user));
    }
  }, [user]);

  // Register a new user (start with 0 points)
  const register = (username) => {
    const newUser = { username, avatar: null, totalPoints: 0, unlocked: [] };
    localStorage.setItem("quiz_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Login an existing user
  const login = (username) => {
     try {
      const raw = localStorage.getItem("quiz_user");
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.username === username) {
          setUser(saved);
          return;
        }
      }
      // If user not found, create a fresh profile
      const newUser = { username, avatar: null, totalPoints: 0, unlocked: [] };
      localStorage.setItem("quiz_user", JSON.stringify(newUser));
      setUser(newUser);
    } catch {
      const newUser = { username, avatar: null, totalPoints: 0, unlocked: [] };
      localStorage.setItem("quiz_user", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  
  // Set user's avatar
  const setAvatar = (avatarKey) => {
    setUser((u) => ({ ...u, avatar: avatarKey }));
  };

  // Add points to the user and check if any animals are unlocked
  const addPoints = (pts) => {
   setUser((u) => {
      const newPoints = (u.totalPoints || 0) + pts;
      const unlocks = [...(u.unlocked || [])];
      const thresholds = [
        { key: "rabbit", pts: 100 },
        { key: "dog", pts: 500 },
        { key: "lion", pts: 1000 }
      ];
      thresholds.forEach((t) => {
        if (newPoints >= t.pts && !unlocks.includes(t.key)) unlocks.push(t.key);
      });
      const updated = { ...u, totalPoints: newPoints, unlocked: unlocks };
      localStorage.setItem("quiz_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, register, login, setAvatar, addPoints, setUserState: setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() { 
  return useContext(UserContext); 
}
