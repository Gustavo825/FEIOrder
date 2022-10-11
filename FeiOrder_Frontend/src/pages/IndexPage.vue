<template>
  <q-page class="padding">
    <h3>Bienvenido a FeiOrder</h3>
    <p v-if="dishStore.dishes != null">{{ dishStore.dishes }}</p>
    <carousel></carousel>
  </q-page>
</template>

<script setup>
import { api } from "../boot/axios.js";
import { ref } from "vue";
import carousel from "../components/carouselIndex.vue";
import { useDishStore } from "../stores/use-store.js";
const dishStore = useDishStore();
dishStore.getDishes();
</script>
