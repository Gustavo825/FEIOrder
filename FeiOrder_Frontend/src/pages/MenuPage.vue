<template>
  <q-layout class="index padding">
    <q-page-container>
      <q-page v-if="dishStore.dishes != null">
        <h2 class="offscreen">Menu navegation</h2>
        <div class="q-pa-md tab">
          <q-tabs v-model="tab" narrow-indicator dense align="center">
            <h3 class="figure">
              <q-tab class="text-green" name="GENERAL" icon="mdi-food" label="A la carta" />
            </h3>
            <h3 class="figure">
              <q-tab class="text-primary" name="BREAKFAST" icon="mdi-food-croissant" label="Paquete de desayuno" />
            </h3>
            <h3 class="figure">
              <q-tab class="text-purple" name="DRINK" icon="mdi-beer" label="Bebidas" />
            </h3>
            <h3 class="figure">
              <q-tab class="text-teal" name="SALE" icon="mdi-percent" label="Promociones" />
            </h3>
          </q-tabs>
        </div>
        <q-scroll-area class="scroll-index" :visible="false">
          <div v-if="loading != 'true'">
            <div class="row no-wrap">
              <template v-for="dish in dishes" :key="dish._id">
                <cardIndex :dish="dish" :isAdmin="false"> </cardIndex>
              </template>
            </div>
          </div>
          <template v-if="dishes.length == 0 && loading != 'true'">
            <h5 class="messageNoData">No hay platillos en esta categoría</h5>
          </template>
        </q-scroll-area>
      </q-page>
    </q-page-container>
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
