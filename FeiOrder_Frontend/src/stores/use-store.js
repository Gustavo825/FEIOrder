import { defineStore } from "pinia";
import { ref } from "vue";
import {
  connectStorageEmulator,
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
  const updateUser = async (id, name, username) => {
    try {
      const res = await api.patch(
        `/auth/update/${id}`,
        {
          name,
          username,
        },
        { headers: { Authorization: "Bearer " + token.value } }
      );
      user.value.name = res.data.user.name;
      user.value.username = res.data.user.username;
      console.log(res.data.user.name);
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

  const register = async (email, name, username, password, repassword) => {
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
      localStorage.removeItem("user");
      localStorage.removeItem("shoppingList");
      resetStore();
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
    const shoppingStore = useShoppingStore();
    shoppingStore.shoppingList = [];
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
    updateUser,
  };
});

export const useDishStore = defineStore("dish", () => {
  let dishes = ref(null);

  const register = async (
    title,
    cost,
    description,
    timeToCook,
    imageFile,
    type
  ) => {
    const useStore = useUserStore();
    useStore.refreshToken();
    console.log(useStore.token);
    try {
      const res = await api.post(
        "/dish/createDish",
        {
          title,
          cost,
          description,
          timeToCook,
          type,
        },
        { headers: { Authorization: "Bearer " + useStore.token } }
      );
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

export const useShoppingStore = defineStore("shopping", () => {
  const shoppingList = ref([]);
  if (localStorage.getItem("shoppingList")) {
    shoppingList.value = JSON.parse(localStorage.getItem("shoppingList"));
  }

  const add = (dish) => {
    shoppingList.value.push(dish);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList.value));
  };
  const remove = (id) => {
    console.log(id);
    console.log(localStorage.getItem("shoppingList"));
    shoppingList.value = shoppingList.value.filter((item) => item._id !== id);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList.value));
    console.log(localStorage.getItem("shoppingList"));
  };
  const find = (title) =>
    shoppingList.value.find((item) => item.titlte === title);

  return {
    shoppingList,
    add,
    remove,
    find,
  };
});
