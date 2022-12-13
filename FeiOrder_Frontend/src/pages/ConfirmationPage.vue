<template>
    <h1>Validando usuario</h1>
  </template>
  
  <script setup>
  import { api } from "../boot/axios.js";
  import { ref } from "vue";
  import { onMounted, watch } from "vue";
  import cardIndex from "../components/cardIndex.vue";
  import { useUserStore } from "../stores/use-store.js";
  import { useRoute, useRouter } from "vue-router";
  
  const userStore = useUserStore();
  const dishes = ref([]);
  const confirmationCode = ref("GENERAL");
  const route = useRoute();
  const router = useRouter();

  const confirmUser = async () => {
    console.log(confirmationCode.value)
    await userStore.confirmUser(confirmationCode.value);
    router.push("/login")
  };
  
  onMounted(() => {
    console.log(route.params)
    confirmationCode.value = route.params.confirmationCode;
    confirmUser();
  });
  </script>
  <style>
  @import "../styles/indexStyle.css";
  </style>
  