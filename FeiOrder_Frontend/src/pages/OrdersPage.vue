<template>
  <div class="q-pa-md">
    <q-table
      v-if="shoppingStore.orders"
      grid
      card-class="bg-primary text-white"
      title="Ordenes"
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
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="text-overline text-orange-9">{{ props.row._id }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">
                {{ props.row.date }}
              </div>
              <div class="text-overline text-green-9">
                Tiempo estimado: {{ props.row.stimatedTime }}
              </div>
              <div class="text-overline text-yellow-9">
                Costo total: {{ props.row.totalCost }}
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn flat color="dark" label="Share" />
              <q-btn flat color="primary" label="Book" />

              <q-space />

              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expanded = !expanded"
              />
            </q-card-actions>

            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subitle2">
                  {{ lorem }}
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useShoppingStore } from "src/stores/use-store";
const shoppingStore = useShoppingStore();
const expanded = ref(false);

const getInfo = async () => {
  await shoppingStore.getOrders();
  console.log(shoppingStore.orders);
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
