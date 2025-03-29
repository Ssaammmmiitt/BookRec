import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth:true,

  register: async (username, email, password) => {
    set({ isLoading: true });

    //"http://10.0.2.2:3002/api/auth/register"
    try {
      const response = await fetch("http://10.0.2.2:3002/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://10.0.2.2:3002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(
        "User Data Before Storage:",
        JSON.stringify(data.user, null, 2)
      );

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      const safeUser = JSON.parse(JSON.stringify(data.user)); // Removes circular references
      await AsyncStorage.setItem("user", JSON.stringify(safeUser));
      await AsyncStorage.setItem("token", data.token);

      set({ user: safeUser, token: data.token, isLoading: false });

      return { success: true };
    } catch (error) {
      console.log("Login failed", error);
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    }
    finally{
      set({isCheckingAuth:false});
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ user: null, token: null });
    } catch (error) {
      console.log("Logout failed", error);
    }
  },

}));
