<template>
  <q-layout class="index padding">
    <q-page v-if="dishStore.dishes != null">
      <!-- <q-img class="title-popular" src="../assets/generalTitle.png"></q-img> -->
      <div class="q-pa-md tab">
        <div class="q-gutter-y-md">
          <q-tabs class="" v-model="tab" narrow-indicator dense align="center">
            <q-tab
              class="text-green"
              name="GENERAL"
              icon="mdi-food"
              label="A la carta"
            />
            <q-tab
              class="text-primary"
              name="BREAKFAST"
              icon="mdi-food-croissant"
              label="Paquete de desayuno"
            />
            <q-tab
              class="text-purple"
              name="DRINK"
              icon="mdi-beer"
              label="Bebidas"
            />
            <q-tab
              class="text-teal"
              name="SALE"
              icon="mdi-percent"
              label="Promociones"
            />
          </q-tabs>
        </div>
      </div>
      <q-scroll-area class="scroll-index" :visible="false">
        <div class="row no-wrap">
          <div v-if="loading != 'true'">
            <template v-for="dish in dishes" :key="dish._id">
              <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
            </template>
          </div>

          <template v-if="dishes.length == 0 && loading != 'true'">
            <h5 class="messageNoData">No hay platillos en esta categoria</h5>
          </template>
        </div>
      </q-scroll-area>
    </q-page>
  </q-layout>
</template>

<script setup>
import { api } from "../boot/axios.js";
import { ref } from "vue";
import { onMounted, watch } from "vue";
import cardIndex from "../components/cardIndex.vue";
import { useDishStore } from "../stores/use-store.js";
import { useRoute, useRouter } from "vue-router";

const dishStore = useDishStore();
const dishes = ref([]);
const tab = ref("GENERAL");
const loading = ref("true");
const route = useRoute();
const router = useRouter();
watch(tab, (newValue, oldValue) => {
  getInfo();
});
const getInfo = async () => {
  loading.value = "true";
  await dishStore.getDishes();
  dishes.value = [];
  for (let i = 0; i < dishStore.dishes.dishes.length; i++) {
    console.log(dishStore.dishes.dishes[i].type, tab.value);
    if (dishStore.dishes.dishes[i].type == tab.value) {
      dishes.value.push(dishStore.dishes.dishes[i]);
    }
  }
  loading.value = "false";
};

onMounted(() => {
  tab.value = route.params.type;
  getInfo();
});
</script>
<style>
@import "../styles/indexStyle.css";
</style>
