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

  // Save user state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quiz_user", JSON.stringify(user));
  }, [user]);

  // Register a new user (start with 0 points)
  const register = (username) => {
    setUser({ username, avatar: null, totalPoints: 0, unlocked: [] });
  };

  // Login an existing user
  const login = (username) => {
    try {
      const raw = localStorage.getItem("quiz_user");
      if (raw) {
        const allUsers = JSON.parse(raw); // assuming multiple users could be stored
        const existing = allUsers.username === username ? allUsers : null;
        if (existing) {
          setUser(existing);
          return;
        }
      }
      // If user does not exist → create a new user with 0 points
      setUser({ username, avatar: null, totalPoints: 0, unlocked: [] });
    } catch {
      setUser({ username, avatar: null, totalPoints: 0, unlocked: [] });
    }
  };

  // Set user's avatar
  const setAvatar = (avatarKey) => {
    setUser(u => ({ ...u, avatar: avatarKey }));
  };

  // Add points to the user and check if any animals are unlocked
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

  return (
    <UserContext.Provider value={{ user, register, login, setAvatar, addPoints, setUserState: setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the user context
export function useUser() { 
  return useContext(UserContext); 
}
