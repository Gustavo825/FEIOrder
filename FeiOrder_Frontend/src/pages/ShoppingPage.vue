<template>
  <div class="q-pa-md">
    <q-table
      title="Orden"
      :rows="shoppingStore.shoppingList"
      :columns="columns"
      row-key="name"
      :separator="separator"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="Costo" :props="props">
            {{ props.row.cost }}
          </q-td>
          <q-td key="Tiempo de preparación" :props="props">
            {{ props.row.timeToCook }}
          </q-td>
          <q-td key="Accion" :props="props">
            <q-btn
              @click="removeDish(props.row._id)"
              name="delete"
              flat
              label="Quitar"
              icon="delete"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { useShoppingStore } from "src/stores/use-store";
const shoppingStore = useShoppingStore();
const removeDish = (id) => {
  shoppingStore.remove(id);
};
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
    align: "center",
    label: "Costo",
    field: "cost",
    sortable: true,
  },

  {
    name: "Tiempo de preparación",
    align: "center",
    label: "Tiempo de preparación",
    field: "timeToCook",
    sortable: true,
  },
  {
    name: "Accion",
    align: "center",
    label: "Accion",
    field: "Accion",
  },
];
</script>
