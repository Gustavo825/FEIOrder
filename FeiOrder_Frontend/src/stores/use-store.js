import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
export const useUserStore = defineStore("user", () => {
  let token = ref("");
  let user = ref(null);
  const expiresIn = ref("");
  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(res);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", "true");
      setTime();
      return res.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
      }
      throw { error: "error de servidor" };
    }
  };

  const register = async (email, username, name, password, repassword, image) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        username,
        password,
        repassword,
        name,
        image,
      });
      console.log(res);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", "true");
      setTime();
      return res.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
      }
      throw { error: "error de servidor" };
    }
  };
  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
    } finally {
      resetStore();
      localStorage.removeItem("user");
    }
  };
  const setTime = () => {
    setTimeout(() => {
      console.log("refrescante");

      refreshToken();
    }, expiresIn.value * 1000 - 60000);
  };
  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      localStorage.setItem("user", true);
      console.log(res.data);
    } catch (error) {}
  };
  const getInfoUser = async () => {
    refreshToken();
    try {
      const res = await api.get("/auth/infoUser", {
        headers: { Authorization: "Bearer " + token.value },
      });
      user.value = res.data;
      console.log(res.data);
    } catch (error) {}
  };
  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };
  return {
    token,
    expiresIn,
    user,
    access,
    refreshToken,
    logout,
    register,
    getInfoUser,
  };
});

export const useDishStore = defineStore("dish", () => {
  let dishes = ref(null);

  const register = async (title, cost, description, timeToCook) => {
    try {
      const res = await api.post("/dish/createDish",{
        title,
        cost,
        description,
        timeToCook,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error)
      if (error.response) {
        throw error.response.data;
      } else {
      }
      throw { error: "Error de servidor" };
    }
  };

  const getDishes = async () => {
    try {
      const res = await api.get("/dish");
      dishes.value = res.data;
      console.log(res.data);
    } catch (error) {}
  };

  return {
    dishes,
    getDishes,
    register,
  };
});
