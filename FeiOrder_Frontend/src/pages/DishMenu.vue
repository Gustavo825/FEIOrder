<template>
  <q-layout class="index">
  <q-layout class="index-padding">
    <q-page v-if="dishStore.dishes != null">
      <q-img
        class="title-dishes"
        src="../assets/allDishes.png"
      ></q-img>
      <q-btn
        class="register-button"
        label="Registrar platillo"
        v-on:click="clickRegisterButton()"
        color="primary"
        type="submit"
      >
      </q-btn>
      <div class="q-pa-md cards-view">
        <q-table
          dark
          grid
          card-class="bg-primary text-white"
          :rows="dishStore.dishes.dishes"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
        >
          <template v-slot:item="props">
            <cardIndex :dish="props.row" :isAdmin="true"> </cardIndex>
          </template>

          <template v-slot:top-right>
            <q-input
              dark
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon dark name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </q-page>
    </q-layout>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDishStore } from "../stores/use-store.js";
import { useRouter } from "vue-router";
import cardIndex from "../components/cardIndex.vue";

const dishStore = useDishStore();
const filter = ref("");
const router = useRouter();
const getInfoDishes = async () => {
  dishStore.getDishes();
};
onMounted(() => {
  getInfoDishes();
});
const columns = [
  {
    name: "title",
    required: true,
    label: "Titlo del platillo",
    align: "left",
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "description",
    align: "center",
    label: "Descripción",
    field: "description",
  },
  { name: "cost", label: "Costo", field: "cost", sortable: true },
  { name: "catimeToCook", label: "Tiempo de preparación", field: "timeToCook" },
];
const clickRegisterButton = () => {
  router.push("/RegisterDish");
};
</script>
<style>
@import "../styles/menuDishStyle.css";
</style>
