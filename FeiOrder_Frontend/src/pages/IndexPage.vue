<template>
  <q-layout class="index padding">
    <q-page v-if="dishStore.dishes != null">
      <q-scroll-area class="scroll-index" :visible="false">
        <q-img
          class="title-popular"
          src="../assets/titlePopularDishes.png"
        ></q-img>
        <div class="row no-wrap">
          <cardIndex
            v-for="dish in dishStore.dishes.dishes"
            :key="dish._id"
            :dish="dish"
            :isAdmin="false"
          >
          </cardIndex>
        </div>
        <q-img class="title-categories" src="../assets/categories.png"></q-img>

        <div class="row no-wrap options">
          <q-img class="option-specific" src="../assets/breakfast.png"> </q-img>
          <q-img class="option-specific" src="../assets/generalMenu.png"> </q-img>
          <q-img class="option-specific" src="../assets/drinks.png"> </q-img>
          <q-img class="option-specific" src="../assets/sale.png"> </q-img>

        </div>
      </q-scroll-area>
    </q-page>
  </q-layout>
</template>

<script setup>
import { api } from "../boot/axios.js";
import { ref } from "vue";
import cardIndex from "../components/cardIndex.vue";
import { useDishStore } from "../stores/use-store.js";
const dishStore = useDishStore();
dishStore.getDishes();
const slide = ref(1);
</script>
<style>
@import "../styles/indexStyle.css";
</style>
