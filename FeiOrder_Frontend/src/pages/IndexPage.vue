<template>
  <q-layout class="index padding">
    <q-page v-if="dishStore.dishes != null">
      <p v-if="dishStore.dishes != null">
        <!-- {{ dishStore.dishes.dishes[1] }} -->
      </p>
      <h3 class="title">Los favoritos:</h3>
      <q-scroll-area style="height: 260px; min-width: 900px">
        <div class="row no-wrap">
          <div v-for="dish in dishStore.dishes.dishes" :key="dish.title">
            <q-card class="my-card">
              <q-img class="image" :src="dish.image">
                <div class="absolute-bottom">
                  <div class="text-h6">
                    {{ dish.title }}
                  </div>
                  <div class="text-subtitle2">Costo: ${{ dish.cost }}</div>
                </div>
              </q-img>

              <q-card-actions align="right">
                <q-btn flat round color="red" icon="favorite" />
                <q-btn flat round color="teal" icon="bookmark" />
                <q-btn flat round color="primary" icon="share" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </q-page>
  </q-layout>
</template>

<script setup>
import { api } from "../boot/axios.js";
import { ref } from "vue";
import carousel from "../components/carouselIndex.vue";
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
  font-family: "Open Sans", sans-serif;
  color: white;
  margin-bottom: 1rem;
}
.my-card {
  width: 300px;
  height: 250px;
  margin-right: 2rem;
}
.image {
  height: 200px;
  min-width: 300px;
}
</style>
