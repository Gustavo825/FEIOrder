<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-10">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-img class="navbar-logo" src="../assets/FEIOrder.png" />
        <q-toolbar-title> </q-toolbar-title>

        <q-btn flat to="/">Inicio</q-btn>
        <q-btn flat to="/Login" v-if="!userStore.token">Login</q-btn>
        <q-btn flat to="/Register" v-if="!userStore.token">Register</q-btn>
        <q-btn flat v-if="userStore.token" to="/Profile">Perfil</q-btn>
        <q-btn flat v-if="userStore.token" @click="logout">Logout</q-btn>
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
    title: "Menú",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Favoritos",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
  {
    title: "Foro",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    icon: "public",
    link: "https://facebook.quasar.dev",
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
