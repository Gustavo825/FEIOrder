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
        <q-img class="navbar-logo" src="../assets/FEIOrder.png" />
        <q-toolbar-title> </q-toolbar-title>

        <q-btn icon="home" stack flat to="/">Inicio</q-btn>
        <q-btn
          icon="shopping_cart"
          stack
          flat
          v-if="userStore.token"
          to="/ShoppingCart"
          >Mi pedido</q-btn
        >
        <q-btn flat stack icon="mdi-login" to="/Login" v-if="!userStore.token"
          >Login</q-btn
        >
        <q-btn flat to="/Register" v-if="!userStore.token">Register</q-btn>
        <q-btn icon="person" stack flat v-if="userStore.token" to="/Profile"
          >Perfil</q-btn
        >
        <q-btn icon="logout" stack flat v-if="userStore.token" @click="logout"
          >Logout</q-btn
        >
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
