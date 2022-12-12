<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-10">
        <div v-if="userStore.user">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            v-if="userStore.user.role == 'ADMIN'"
            @click="toggleLeftDrawer"
          />
        </div>
        <h1 class="figure">
          <a tabindex="1" href="/">
            <img
              class="navbar-logo"
              alt="FeiOrder"
              src="../assets/FEIOrder.png"
            />
          </a>
          <span class="alt-img">Fei Order</span>
        </h1>
        <q-toolbar-title> </q-toolbar-title>
        <h2 class="offscreen">Site navegation</h2>
        <h3 class="figure">
          <q-btn icon="home" stack flat to="/">Inicio</q-btn>
        </h3>
        <h3 class="figure" v-if="userStore.token">
          <q-btn icon="shopping_cart" stack flat to="/ShoppingCart"
            >Mi pedido</q-btn
          >
        </h3>
        <h3 class="figure" v-if="userStore.token">
          <q-btn icon="mdi-basket" stack flat to="/MyOrders"
            >Historial pedidos</q-btn
          >
        </h3>
        <h3 class="figure" v-if="!userStore.token">
          <q-btn flat stack icon="mdi-login" to="/Login">Login</q-btn>
        </h3>
        <h3 class="figure" v-if="!userStore.token">
          <q-btn flat to="/Register">Register</q-btn>
        </h3>
        <h3 class="figure" v-if="userStore.token">
          <q-btn icon="person" stack flat to="/Profile">Perfil</q-btn>
        </h3>
        <h3 class="figure" v-if="userStore.token">
          <q-btn icon="logout" stack flat @click="logout">Logout</q-btn>
        </h3>
      </q-toolbar>
    </q-header>

    <q-drawer dark v-model="leftDrawerOpen" show-if-above="false" bordered>
      <q-list>
        <q-item-label header> FeiOrder</q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUserStore } from "../stores/use-store.js";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const essentialLinks = [
  {
    title: "Administración de platillos",
    icon: "restaurant_menu",
    link: "/dishMenu",
  },
  {
    title: "Ordenes",
    icon: "receipt_long",
    link: "/orders",
  },
  {
    title: "Facebook",
    icon: "public",
    link: "https://facebook/feiOrder",
  },
];
const logout = () => {
  userStore.logout();
  router.push("/Login");
};
</script>
<style scoped>
@import "../styles/homeStyle.css";
</style>
