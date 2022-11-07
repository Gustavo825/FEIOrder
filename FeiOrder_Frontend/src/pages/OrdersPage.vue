<template>
  <div class="q-pa-md tab">
    <div class="q-gutter-y-md">
      <q-tabs class="" v-model="tab" narrow-indicator dense align="center">
        <q-tab
          class="text-green"
          name="CREATED"
          icon="mdi-bookmark"
          label="Recientes"
        />
        <q-tab
          class="text-primary"
          name="COOKING"
          icon="mdi-chef-hat"
          label="Cocinando"
        />
        <q-tab
          class="text-purple"
          name="READY TO PICK UP"
          icon="mdi-food"
          label="Preparadas"
        />
        <q-tab
          class="text-teal"
          name="DELIVERED"
          icon="mdi-package"
          label="Entregadas"
        />
        <q-tab
          class="text-orange"
          name="CANCELED"
          icon="mdi-cancel"
          label="Canceladas"
        />
      </q-tabs>
    </div>
  </div>
  <q-layout class="background">
    <div class="q-pa-md">
      <q-table
        dark
        v-if="shoppingStore.orders"
        grid
        :rows="shoppingStore.orders"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            dark
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <orderOrders v-if="props.row.state == tab" :order="props.row" :is-admin="true">
          </orderOrders>
        </template>
      </q-table>
    </div>
  </q-layout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useShoppingStore } from "src/stores/use-store";

import orderOrders from "../components/orderOrders.vue";
const filter = ref("");
const shoppingStore = useShoppingStore();
const tab = ref("CREATED");
const getInfo = async () => {
  await shoppingStore.getOrders();
};
onMounted(() => {
  getInfo();
});
const columns = [
  {
    name: "id",
    required: true,
    label: "id",
    align: "id",
    field: (row) => row._id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "totalCost",
    align: "totalCost",
    label: "totalCost",
    field: "totalCost",
    sortable: true,
  },
  {
    name: "stimatedTime",
    label: "stimatedTime",
    field: "stimatedTime",
    sortable: true,
  },
  { name: "state", label: "state", field: "state", sortable: true },
  { name: "date", label: "date", field: "date" },
  { name: "dishes", label: "dishes", field: "dishes" },
  { name: "comment", label: "comment", field: "comment" },
  { name: "userID", label: "userID", field: "userID" },
];
</script>
<style>
@import "../styles/ordersStyle.css";
</style>
