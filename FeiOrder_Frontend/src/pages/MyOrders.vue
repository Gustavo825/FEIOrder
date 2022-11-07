<template>
      <div class="q-pa-md tab">
    <div class="q-gutter-y-md">
      <q-tabs class="" v-model="tab" narrow-indicator dense align="center">
        <q-tab
          class="text-green"
          name="CREATED"
          icon="mdi-bookmark"
          label="Pedidos actuales"
        />
        <q-tab
          class="text-teal"
          name="DELIVERED"
          icon="mdi-package"
          label="Pedidos anteriores"
        />
        <q-tab
          class="text-orange"
          name="CANCELED"
          icon="mdi-cancel"
          label="Pedidos cancelados"
        />
      </q-tabs>
    </div>
  </div>
  <q-layout class="background">
    <div class="q-pa-md">
      <q-table
        dark
        v-if="shoppingStore.myOrders"
        grid
        :rows="shoppingStore.myOrders"
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
          <orderOrders v-if="props.row.state == tab" :order="props.row" :is-admin="false">
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
  const tab = ref("CREATED");
  const shoppingStore = useShoppingStore();
  const expanded = ref(false);
  
  const getInfo = async () => {
    await shoppingStore.getUserOrders();
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