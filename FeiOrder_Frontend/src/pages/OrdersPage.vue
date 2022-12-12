<template>
  <q-layout class="background">
    <q-page-container>
      <q-page>
        <div class="q-pa-md tab">
          <h2 class="offscreen">My orders navegation</h2>
          <div class="q-gutter-y-md">
            <q-tabs v-model="tab" narrow-indicator dense align="center">
              <h3 class="figure">
                <q-tab
                  accesskey="r"
                  class="text-green"
                  name="CREATED"
                  icon="mdi-bookmark"
                  label="Recientes"
                />
              </h3>
              <h3 class="figure">
                <q-tab
                  accesskey="c"
                  class="text-primary"
                  name="COOKING"
                  icon="mdi-chef-hat"
                  label="Cocinando"
                />
              </h3>
              <h3 class="figure">
                <q-tab
                  accesskey="p"
                  class="text-purple"
                  name="READY TO PICK UP"
                  icon="mdi-food"
                  label="Preparadas"
                />
              </h3>
              <h3 class="figure">
                <q-tab
                  accesskey="e"
                  class="text-teal"
                  name="DELIVERED"
                  icon="mdi-package"
                  label="Entregadas"
                />
              </h3>
              <h3 class="figure">
                <q-tab
                  accesskey="c"
                  class="text-orange"
                  name="CANCELED"
                  icon="mdi-cancel"
                  label="Canceladas"
                />
              </h3>
            </q-tabs>
          </div>
        </div>

        <div v-if="shoppingStore.orders" class="q-pa-md">
          <q-table
            dark
            grid
            :rows="orders"
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
              <OrderOrders
                v-on:update="onChange"
                :order="props.row"
                :is-admin="true"
              >
              </OrderOrders>
            </template>
          </q-table>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useUserStore, useShoppingStore } from "src/stores/use-store";

import OrderOrders from "../components/orderOrders.vue";

const filter = ref("");
const orders = ref([]);
const shoppingStore = useShoppingStore();
const userStore = useUserStore();
const tab = ref("CREATED");
watch(tab, (newValue, oldValue) => {
  getRows();
});
const onChange = async () => {
  getRows();
  console.log("k");
};
const getRows = async () => {
  orders.value = [];
  for (let i = 0; i < shoppingStore.orders.length; i++) {
    if (shoppingStore.orders[i].state == tab.value) {
      const clientId = shoppingStore.orders[i].userID;
      shoppingStore.orders[i].client = await userStore.getInfoUserById(
        clientId
      );
      orders.value.push(shoppingStore.orders[i]);
    }
  }
  return orders;
};
const getInfo = async () => {
  await shoppingStore.getOrders();
  console.log(shoppingStore.orders);
  getRows();
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
