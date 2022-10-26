<template>
  <div class="q-pa-md">
    <q-table
      title="Orden"
      :rows="shoppingStore.shoppingList"
      :columns="columns"
      row-key="name"
      :separator="separator"
    />
  </div>
</template>
<script setup>
import { useShoppingStore } from "src/stores/use-store";
const shoppingStore = useShoppingStore();
const columns = [
  {
    name: "title",
    required: true,
    label: "Titulo del platillo",
    align: "left",
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Costo",
    align: "Costo",
    label: "Costo",
    field: "cost",
    sortable: true,
  },
];
</script>
