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
  const login = (userData) => {
    if (!userData || !userData.username) {
    setUser(DEFAULT); // fallback guest
    return;
}

  setUser(userData);
};

  // Logout user
  const logout = () => {
  setUser(DEFAULT);
  };

  
  // Set user's avatar
  const setAvatar = (avatarKey) => {
    setUser((u) => ({ ...u, avatar: avatarKey }));
  };

  // Add points to the user and check if any animals are unlocked
  const addPoints = async (pts) => {
    let unlockedAnimal = null;

    try {
    const response = await fetch("http://localhost:1234/api/auth/user/points", {
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

    const lastUnlock = data.unlocked[data.unlocked.length - 1];
    unlockedAnimal = lastUnlock || null;

  } catch (err) {
    console.error("Error adding points:", err);
  }
  return unlockedAnimal;
};

  return (
    <UserContext.Provider value={{ user, register, login, logout, setAvatar, addPoints, setUserState: setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() { 
  return useContext(UserContext); 
}
