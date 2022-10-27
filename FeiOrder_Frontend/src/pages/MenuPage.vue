<template>
  <q-layout class="index padding">
    <q-page v-if="dishStore.dishes != null">
      <q-img class="title-popular" src="../assets/generalTitle.png"></q-img>
      <q-scroll-area class="scroll-index">
        <div class="row no-wrap">
          <template v-for="dish in generalDishes" :key="dish._id">
            <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
          </template>
        </div>
      </q-scroll-area>
      <q-img class="title-popular" src="../assets/breakfastTitle.png"></q-img>
      <q-scroll-area class="scroll-index">
        <div class="row no-wrap">
          <template v-for="dish in breakfastDishes" :key="dish._id">
            <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
          </template>
        </div>
      </q-scroll-area>
      <q-img class="title-popular" src="../assets/drinkTitle.png"></q-img>
      <q-scroll-area class="scroll-index">
        <div class="row no-wrap">
          <template v-for="dish in drinkDishes" :key="dish._id">
            <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
          </template>
        </div>
      </q-scroll-area>
      <q-img class="title-popular" src="../assets/saleTitle.png"></q-img>
      <q-scroll-area class="scroll-index">
        <div class="row no-wrap">
          <template v-for="dish in saleDishes" :key="dish._id">
            <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
          </template>
        </div>
      </q-scroll-area>
    </q-page>
  </q-layout>
</template>

<script setup>
import { api } from "../boot/axios.js";
import { ref } from "vue";
import { onMounted } from "vue";
import cardIndex from "../components/cardIndex.vue";
import { useDishStore } from "../stores/use-store.js";
const dishStore = useDishStore();
const slide = ref(1);
const breakfastDishes = ref([]);
const generalDishes = ref([]);
const drinkDishes = ref([]);
const saleDishes = ref([]);
const getInfo = async () => {
  await dishStore.getDishes();
  for (let i = 0; i < dishStore.dishes.dishes.length; i++) {
    if (dishStore.dishes.dishes[i].type == "GENERAL") {
      generalDishes.value.push(dishStore.dishes.dishes[i]);
    } else if (dishStore.dishes.dishes[i].type == "BREAKFAST") {
      breakfastDishes.value.push(dishStore.dishes.dishes[i]);
    } else if (dishStore.dishes.dishes[i].type == "DRINK") {
      drinkDishes.value.push(dishStore.dishes.dishes[i]);
    } else if (dishStore.dishes.dishes[i].type == "SALE") {
      saleDishes.value.push(dishStore.dishes.dishes[i]);
    }
  }
};
onMounted(() => {
  getInfo();
});
</script>
<style>
@import "../styles/indexStyle.css";
</style>
