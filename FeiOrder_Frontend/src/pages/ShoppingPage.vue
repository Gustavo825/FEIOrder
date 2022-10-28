<template>
  <q-layout class="background padding">
    <q-page>
      <div class="q-pa-md table-cart">
        <q-table
          class="table"
          title="Orden"
          :rows="shoppingStore.shoppingList"
          :columns="columns"
          row-key="name"
          :separator="separator"
          no-data-label="Agrega platillos desde el menu"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>

              <q-td key="Costo" :props="props"> ${{ props.row.cost }} </q-td>
              <q-td key="Tiempo de preparación" :props="props">
                {{ props.row.timeToCook }}
              </q-td>
              <q-td key="Accion" :props="props">
                <q-btn
                  @click="removeDish(props.row.idList)"
                  name="delete"
                  flat
                  label="Quitar"
                  icon="delete"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="confirm" align="right">
          <q-btn
            :disabled="shoppingStore.shoppingList.length == 0"
            @click="makeOrder"
            class="form-submit"
            label="Hacer pedido"
            type="submit"
          ></q-btn>
        </div>
      </div>
      <confirmOrder v-on:close="confirmClose" :card="card"></confirmOrder>
    </q-page>
  </q-layout>
</template>
<script setup>
import { ref } from "vue";
import { useShoppingStore } from "src/stores/use-store";
import confirmOrder from "src/dialogs/confirmOrder.vue";

const shoppingStore = useShoppingStore();
const text = ref("");
const card = ref(false);
const confirmDisable = false;
const removeDish = (id) => {
  shoppingStore.remove(id);
  shoppingStore.calculateCost();
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

const makeOrder = async () => {
  card.value = !card.value;
  //shoppingStore.makeOrder();
};
const confirmClose = () => {
  card.value = false;
};
</script>

<style>
@import "../styles/shoppingCartStyle.css";
</style>
