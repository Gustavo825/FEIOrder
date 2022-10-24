import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { api } from "src/boot/axios";
import { storage } from "../firebaseConfig";
export const useUserStore = defineStore("user", () => {
  let token = ref("");
  let user = ref(null);
  const expiresIn = ref("");
  const updateImage = async (imageFile) => {
    try {
      const storageRefVar = storageRef(storage, `${user.value.id}/imgProfile`); //`${user.currentUser}`
      await uploadBytes(storageRefVar, imageFile.value);
      user.value.image = await getDownloadURL(storageRefVar);
    } catch (error) {
      console.log(error);
      return error.code;
    }
  };
  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(res + "aaa");
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

  const register = async (
    email,
    name,
    username,
    password,
    repassword,
    image
  ) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        username,
        password,
        repassword,
        name,
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
      const storageRefVar = storageRef(storage, `${user.value.id}/imgProfile`); //`${user.currentUser}`
      user.value.image = await getDownloadURL(storageRefVar);
      console.log(user);
    } catch (error) {}
  };
  const resetStore = () => {
    token.value = null;
    user.value = null;
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
    updateImage,
  };
});

export const useDishStore = defineStore("dish", () => {
  let dishes = ref(null);

  const register = async (title, cost, description, timeToCook, imageFile) => {
    try {
      const res = await api.post("/dish/createDish", {
        title,
        cost,
        description,
        timeToCook,
      });
      if (imageFile) {
        console.log(imageFile);
        const storageRefVar = storageRef(
          storage,
          `dishes/${res.data.dish._id}/imgProfile`
        ); //`${user.currentUser}`
        await uploadBytes(storageRefVar, imageFile);
      }
      console.log(res.data.id);
      return res.data;
    } catch (error) {
      console.log(error);
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

      for (let i = 0; i < res.data.dishes.length; i++) {
        const storageRefVar = storageRef(
          storage,
          `dishes/${dishes.value.dishes[i]._id}/imgProfile`
        ); //`${user.currentUser}`
        console.log(storageRefVar);
        dishes.value.dishes[i].image = await getDownloadURL(storageRefVar);
      }
    } catch (error) {}
  };
  const getDish = (id) => {
    for (let i = 0; i < dishes.length(); i++) {
      console.log(i);
      if (id == dishes[i].id) {
        return dishes[i];
      }
    }
  };
  return {
    dishes,
    getDishes,
    getDish,
    register,
  };
});
