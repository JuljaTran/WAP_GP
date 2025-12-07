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

  // Save user to localStorage
  useEffect(() => {
    if (!user?.username) return;
    localStorage.setItem("quiz_user", JSON.stringify(user));
  }, [user]);

  // Register a new user
  const register = (username) => {
    const newUser = { username, avatar: null, totalPoints: 0, unlocked: [] };
    setUser(newUser);
  };

  // Login
  const login = (userData) => {
    if (!userData || !userData.username) {
      setUser(DEFAULT);
      return;
    }

    setUser({
      username: userData.username,
      avatar: userData.avatar ?? null,
      totalPoints: userData.totalPoints ?? 0,
      unlocked: userData.unlocked ?? []
    });
  };

  // Logout
  const logout = () => {
    setUser(DEFAULT);
    localStorage.removeItem("quiz_user");
  };

  // Set avatar locally
  const setAvatar = (avatarKey) => {
    setUser((u) => ({ ...u, avatar: avatarKey }));
  };

  // Add points locally
  const addPoints = (pts) => {
    setUser((u) => {
      if (!u) return u;

      const newTotal = (u.totalPoints || 0) + pts;

      const thresholds = [
        { key: "rabbit", pts: 100 },
        { key: "dog", pts: 500 },
        { key: "lion", pts: 1000 }
      ];

      const newUnlocked = [...(u.unlocked || [])];

      thresholds.forEach(t => {
        if (newTotal >= t.pts && !newUnlocked.includes(t.key)) {
          newUnlocked.push(t.key);
        }
      });

      return {
        ...u,
        totalPoints: newTotal,
        unlocked: newUnlocked
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, setAvatar, addPoints }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
