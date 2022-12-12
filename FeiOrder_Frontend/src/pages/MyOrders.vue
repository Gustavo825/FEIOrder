<template>
  <q-layout class="background padding">
    <q-page-container>
      <q-page>
        <div class="q-pa-md tab">
          <h2 class="offscreen">My orders navegation</h2>
          <q-tabs v-model="tab" narrow-indicator dense align="center">
            <h3 class="figure">
              <q-tab
                accesskey="a"
                class="text-green"
                name="CREATED"
                icon="mdi-bookmark"
                label="Pedidos actuales"
              />
            </h3>
            <h3 class="figure">
              <q-tab
                accesskey="d"
                class="text-teal"
                name="DELIVERED"
                icon="mdi-package"
                label="Pedidos anteriores"
              />
            </h3>
            <h3 class="figure">
              <q-tab
                accesskey="c"
                class="text-orange"
                name="CANCELED"
                icon="mdi-cancel"
                label="Pedidos cancelados"
              />
            </h3>
          </q-tabs>
        </div>

        <div class="q-pa-md">
          <q-table
            dark
            v-if="shoppingStore.myOrders"
            grid
            :rows="orders"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
            no-data-label="No hay datos"
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
              <OrderOrders :order="props.row" :is-admin="false"> </OrderOrders>
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
const tab = ref("CREATED");
const shoppingStore = useShoppingStore();
const userStore = useUserStore();
const expanded = ref(false);
const orders = ref();

watch(tab, (newValue, oldValue) => {
  getRows();
});
const getRows = async () => {
  orders.value = [];
  console.log(tab.value);
  if (tab.value == "CANCELED") {
    for (let i = 0; i < shoppingStore.myOrders.length; i++) {
      if (shoppingStore.myOrders[i].state == "CANCELED") {
        const clientId = shoppingStore.orders[i].userID;
        shoppingStore.orders[i].client = await userStore.getInfoUserById(
          clientId
        );
        orders.value.push(shoppingStore.myOrders[i]);
      }
    }
  } else if (tab.value == "DELIVERED") {
    for (let i = 0; i < shoppingStore.myOrders.length; i++) {
      if (shoppingStore.myOrders[i].state == "DELIVERED") {
        const clientId = shoppingStore.orders[i].userID;
        shoppingStore.orders[i].client = await userStore.getInfoUserById(
          clientId
        );
        orders.value.push(shoppingStore.myOrders[i]);
      }
    }
  } else {
    for (let i = 0; i < shoppingStore.myOrders.length; i++) {
      console.log(shoppingStore.myOrders[i].state);
      if (
        shoppingStore.myOrders[i].state == "COOKING" ||
        shoppingStore.myOrders[i].state == "CREATED" ||
        shoppingStore.myOrders[i].state == "READY TO PICK UP"
      ) {
        shoppingStore.myOrders[i].client = await userStore.getInfoUser();
        orders.value.push(shoppingStore.myOrders[i]);
      }
    }
  }
  console.log(orders.value);
  return orders;
};

const getInfo = async () => {
  await shoppingStore.getUserOrders();
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
];
</script>

<style>
@import "../styles/myOrders.css";
</style>
