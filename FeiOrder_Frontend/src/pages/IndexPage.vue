<template>
  <q-layout class="index padding">
    <q-page v-if="dishStore.dishes != null">
      <h3 class="title">Populares:</h3>
      <q-scroll-area style="height: 260px; min-width: 900px">
        <div class="row no-wrap">
          <cardIndex
            v-for="dish in dishStore.dishes.dishes"
            :key="dish._id"
            :id="dish._id"
            :image="dish.image"
            :title="dish.title"
            :cost="dish.cost"
          >
          </cardIndex>
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
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");

.index {
  display: flex;
  justify-content: center;
  background-color: cadetblue;
}
.title {
  font-family: "Open Sans";
  color: rgb(25, 24, 24);
  margin-bottom: 1rem;
}
</style>
