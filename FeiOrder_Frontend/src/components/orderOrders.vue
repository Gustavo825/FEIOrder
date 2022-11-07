<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-if="client" class="my-card" flat bordered>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <img :src="client.image" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ client.username }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset />
        <div class="text-h5">
          {{ order.date.substring(11, 19) }} -
          {{ order.date.substring(0, 10) }}
        </div>

        <div class="text-subtitle4">
          {{}}
          Tiempo estimado: {{ order.stimatedTime }}
          minutos
        </div>
        <div class="text-subtitle4">Costo total: ${{ order.totalCost }}</div>
        <div class="text-subtitle4">{{ order.comment }}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          @click="updateStateOrder('COOKING')"
          flat
          color="primary"
          icon="mdi-chef-hat"
        />
        <q-btn
          @click="updateStateOrder('READY TO PICK UP')"
          flat
          color="purple"
          icon="mdi-food"
        />
        <q-btn
          @click="updateStateOrder('DELIVERED')"
          flat
          color="teal"
          icon="mdi-package"
        />
        <q-btn
          @click="updateStateOrder('CANCELED')"
          flat
          color="orange"
          icon="mdi-cancel"
        />

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
          <q-card-section class="text-subitle2">
            <q-list bordered> </q-list>
            <q-item
              v-for="dish in order.dishes"
              :key="dish.id"
              class="q-my-sm"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <img :src="dish.image" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ dish.title }}</q-item-label>
                <q-item-label caption lines="1">${{ dish.cost }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { useUserStore, useShoppingStore } from "src/stores/use-store";
const $q = useQuasar();
const userStore = useUserStore();
const shoppingStore = useShoppingStore();
const client = ref();
const props = defineProps({
  order: {},
});
const updateStateOrder = (state) => {
  $q.dialog({
    title: "Confirmación",
    message: "¿Estas seguro que quieres actualizar la orden?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    shoppingStore.updateOrder(props.order._id, state);
  });
};
const expanded = ref(false);
const getInfo = async () => {
  const clientId = props.order.userID;
  client.value = await userStore.getInfoUserById(clientId);
};
onMounted(() => {
  getInfo();
});
</script>
