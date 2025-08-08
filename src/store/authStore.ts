import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  role: "admin" | "viewer";
  fullname?: string;
  address?: string;
  phone?: number;
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// This store simulates user authentication and role management
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        if (email === "admin@example.com" && password === "password123") {
          set({
            user: {
              email,
              role: "admin",
              fullname: "Anisha Lamichhane",
              address: "Tokha, Kathmandu",
              phone: 9866666666,
            },
          });
          return true;
        } else if (email === "viewer@example.com" && password === "password123") {
          set({
            user: {
              email,
              role: "viewer",
              fullname: "John Doe",
              address: "Illinois, USA",
              phone: 43898439948,
            },
          });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", 
    }
  )
);

export default useAuthStore;
