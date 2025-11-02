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
    if (!user?.username) return;
  const current = localStorage.getItem("quiz_user");
  const parsed = current ? JSON.parse(current) : null;

  if (JSON.stringify(parsed) !== JSON.stringify(user)) {
    localStorage.setItem("quiz_user", JSON.stringify(user));
  }
  }, [user]);

  // Register a new user (start with 0 points)
  const register = (username) => {
    const newUser = { username, avatar: null, totalPoints: 0, unlocked: [] };
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
      setUser(newUser);
    } catch {
      const newUser = { username, avatar: null, totalPoints: 0, unlocked: [] };
      setUser(newUser);
    }
  };

  
  // Set user's avatar
  const setAvatar = (avatarKey) => {
    setUser((u) => ({ ...u, avatar: avatarKey }));
  };

  // Add points to the user and check if any animals are unlocked
  const addPoints = (pts) => {
    let unlockedAnimal = null;

   setUser((u) => {
      const newPoints = (u.totalPoints || 0) + pts;
      const unlocks = [...(u.unlocked || [])];

      const thresholds = [
        { key: "rabbit", pts: 100 },
        { key: "dog", pts: 500 },
        { key: "lion", pts: 1000 }
      ];

      thresholds.forEach((t) => {
        if (newPoints >= t.pts && !unlocks.includes(t.key)) {
          unlocks.push(t.key);
          unlockedAnimal = t.key;
        }
      });

    return{ ...u, totalPoints: newPoints, unlocked: unlocks };
    });
    
  return unlockedAnimal;
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
