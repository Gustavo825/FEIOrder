<template>
  <q-layout class="index padding">
    <q-page-container>
      <q-page v-if="dishStore.dishes != null">
        <h2 class="figure">
          <q-img class="title-popular" src="../assets/titlePopularDishes.png" alt="Platillos"></q-img>
          <span class="alt-img">Platillos populares</span>
        </h2>

        <q-scroll-area class="scroll-index" :visible="false">
          <div class="row no-wrap">
            <template v-for="dish in dishStore.dishes.dishes" :key="dish._id">
              <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
            </template>
          </div>
        </q-scroll-area>

        <h2 class="figure">
          <q-img class="title-categories" src="../assets/categories.png" alt="Categorías"></q-img>
          <span class="alt-img">Categorias</span>
        </h2>

        <q-scroll-area class="scroll-index" :visible="false">
          <div class="row no-wrap options">
            <q-img tabindex="4" accesskey="d" alt="Paquete de desayuno" @click="goToMenu('BREAKFAST')"
              class="option-specific" src="../assets/breakfast.png">
            </q-img>

            <q-img tabindex="4" accesskey="c" alt="A la carta" @click="goToMenu('GENERAL')" class="option-specific"
              src="../assets/generalMenu.png">
            </q-img>
            <q-img tabindex="4" accesskey="b" alt="Bebidas" @click="goToMenu('DRINK')" class="option-specific"
              src="../assets/drinks.png">
            </q-img>
            <q-img tabindex="4" accesskey="p" alt="Promociones" @click="goToMenu('SALE')" class="option-specific"
              src="../assets/sale.png">
            </q-img>
          </div>
        </q-scroll-area>
      </q-page>
    </q-page-container>
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
