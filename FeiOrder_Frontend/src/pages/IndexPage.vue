<template>
  <q-layout class="index padding">
    <q-page v-if="dishStore.dishes != null">
      <q-img
        class="title-popular"
        src="../assets/titlePopularDishes.png"
      ></q-img>
      <q-scroll-area class="scroll-index" :visible="false">
        <div class="row no-wrap">
          <template v-for="dish in dishStore.dishes.dishes" :key="dish._id">
            <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
          </template>
        </div>
      </q-scroll-area>

      <q-img class="title-categories" src="../assets/categories.png"></q-img>
      <q-scroll-area class="scroll-index" :visible="false">
        <div class="row no-wrap options">
          <q-img
            @click="goToMenu('BREAKFAST')"
            class="option-specific"
            src="../assets/breakfast.png"
          >
          </q-img>
          <q-img
            @click="goToMenu('GENERAL')"
            class="option-specific"
            src="../assets/generalMenu.png"
          >
          </q-img>
          <q-img
            @click="goToMenu('DRINK')"
            class="option-specific"
            src="../assets/drinks.png"
          >
          </q-img>
          <q-img
            @click="goToMenu('SALE')"
            class="option-specific"
            src="../assets/sale.png"
          >
          </q-img>
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
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const dishStore = useDishStore();
dishStore.getDishes();
const slide = ref(1);
const goToMenu = (type) => {
  router.push("/menu/" + type);
};
</script>
<style>
@import "../styles/indexStyle.css";
</style>
