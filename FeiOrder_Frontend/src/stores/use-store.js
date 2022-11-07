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
    } catch (error) {}
  };

  const getInfoUserById = async (id) => {
    refreshToken();
    try {
      const res = await api.get("/auth/infoUserById/" + id, {
        headers: { Authorization: "Bearer " + token.value },
      });
      let retrivedUser = res.data;
      const storageRefVar = storageRef(storage, `${id}/imgProfile`);
      retrivedUser.image = await getDownloadURL(storageRefVar);
      return retrivedUser;
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
    getInfoUserById,
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
        const storageRefVar = storageRef(
          storage,
          `dishes/${res.data.dish._id}/imgProfile`
        ); //`${user.currentUser}`
        await uploadBytes(storageRefVar, imageFile);
      }
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

  const updateImage = async (imageFile, id) => {
    try {
      const storageRefVar = storageRef(storage, `dishes/${id}/imgProfile`); //`${user.currentUser}`
      await uploadBytes(storageRefVar, imageFile.value);
      dishes.value.dishes[getDish(id)].image = await getDownloadURL(
        storageRefVar
      );
    } catch (error) {
      console.log(error);
      return error.code;
    }
  };

  const updateDish = async (
    id,
    title,
    cost,
    description,
    timeToCook,
    categoryVal
  ) => {
    const useStore = useUserStore();
    useStore.refreshToken();
    try {
      const res = await api.patch(
        `/dish/update/${id}`,
        {
          title,
          cost,
          description,
          timeToCook,
          categoryVal,
        },
        { headers: { Authorization: "Bearer " + useStore.token } }
      );
    } catch (error) {
      console.log(error);
      return error.code;
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
        dishes.value.dishes[i].image = await getDownloadURL(storageRefVar);
      }
    } catch (error) {}
  };
  const getDish = (id) => {
    for (let i = 0; i < dishes.value.dishes.length; i++) {
      if (id == dishes.value.dishes[i]._id) {
        return i;
      }
    }
  };
  return {
    dishes,
    getDishes,
    getDish,
    register,
    updateDish,
    updateImage,
  };
});

export const useShoppingStore = defineStore("shopping", () => {
  const useStore = useUserStore();
  const cost = ref(0);
  const time = ref(0);
  const shoppingList = ref([]);
  let orders = ref(null);
  let actualOrder = ref(null);
  let myOrders = ref(null)
  let idList = 0;
  if (localStorage.getItem("shoppingList")) {
    shoppingList.value = JSON.parse(localStorage.getItem("shoppingList"));
  }
  const calculateCost = () => {
    cost.value = 0;
    for (let i = 0; i < shoppingList.value.length; i++) {
      cost.value += parseFloat(shoppingList.value[i].cost);
      time.value += parseFloat(shoppingList.value[i].timeToCook);
    }
  };
  const add = (dish) => {
    dish.idList = idList;
    idList++;
    shoppingList.value.push(dish);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList.value));
  };
  const remove = (id) => {
    console.log(id);
    shoppingList.value = shoppingList.value.filter(
      (item) => item.idList !== id
    );
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList.value));
    console.log(localStorage.getItem("shoppingList"));
  };
  const find = (title) =>
    shoppingList.value.find((item) => item.title === title);

  const makeOrder = async (comment) => {
    useStore.refreshToken();
    const dishes = shoppingList.value;
    const totalCost = cost.value;
    const stimatedTime = time.value;
    try {
      const res = await api.post(
        "/order/createOrder",
        {
          totalCost,
          comment,
          stimatedTime,
          dishes,
        },
        { headers: { Authorization: "Bearer " + useStore.token } }
      );
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw { error: "error de servidor" };
      }
    } finally {
      localStorage.removeItem("shoppingList");
      shoppingList.value = [];
      cost.value = 0;
      time.value = 0;
    }
  };

  const getUserOrders = async () => {
    const useStore = useUserStore();
    useStore.refreshToken();
    actualOrder.value = []
    try {
      const res = await api.get("/order/userOrders",{
        headers: { Authorization: "Bearer " + useStore.token },
      });
      myOrders.value = res.data.userOrders;
      for (let i = 0 ; i < myOrders.value.length; i++) {
        if (myOrders.value[i].state != "DELIVERED" && myOrders.value[i].state != "CANCELED") {
          actualOrder.value.push(myOrders.value[i]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOrders = async () => {
    const useStore = useUserStore();
    useStore.refreshToken();
    console.log(useStore.token);
    try {
      const res = await api.get("/order", {
        headers: { Authorization: "Bearer " + useStore.token },
      });
      orders.value = res.data.orders;
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async (id, state) => {
    const useStore = useUserStore();
    useStore.refreshToken();
    console.log(useStore.token);
    try {
      const res = await api.patch(
        `/order/update/${id}`,
        {
          state,
        },
        { headers: { Authorization: "Bearer " + useStore.token } }
      );
      getOrders();
    } catch (error) {
      console.log(error);
      return error.code;
    }
  };
  return {
    shoppingList,
    add,
    remove,
    find,
    makeOrder,
    time,
    cost,
    calculateCost,
    orders,
    myOrders,
    actualOrder,
    getOrders,
    getUserOrders,
    getOrders,
    updateOrder,
  };
});
