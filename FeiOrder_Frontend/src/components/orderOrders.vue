<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card @keyup.enter="expandCard" tabindex="4" v-if="isAdmin" class="my-card" flat bordered>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <img v-if="order.client && order.client.image" :src="order.client.image" alt="Avatar imagen" />
              <q-icon v-else name="person" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ order.client.username }}</q-item-label>
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
        <q-btn @click="updateStateOrder('COOKING')" flat color="primary" icon="mdi-chef-hat" />
        <q-btn @click="updateStateOrder('READY TO PICK UP')" flat color="purple" icon="mdi-food" />
        <q-btn @click="updateStateOrder('DELIVERED')" flat color="teal" icon="mdi-package" />
        <q-btn @click="updateStateOrder('CANCELED')" flat color="orange" icon="mdi-cancel" />

        <q-space />

        <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded" />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-card-section class="text-subitle2">
            <q-list bordered> </q-list>
            <q-item v-for="dish in order.dishes" :key="dish.id" class="q-my-sm" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <img :src="dish.image" alt="Imagen platillo" />
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

    <q-card tabindex="4" @keyup.enter="expandCard" v-if="!isAdmin" class="my-card" flat bordered>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <img v-if="order.client && order.client.image" :src="order.client.image" alt="Avatar imagen" />
              <q-icon v-else name="person" />
            </q-avatar>
          </q-item-section>
          <q-item-section> </q-item-section>
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
        <div class="text-subtitle4">{{ order.state }}</div>
      </q-card-section>

      <q-card-actions>
        <q-space />

        <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded" />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-card-section class="text-subitle2">
            <q-list bordered> </q-list>
            <q-item v-for="dish in order.dishes" :key="dish.id" class="q-my-sm" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <img :src="dish.image" alt="Imagen platillo" />
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
import { useNotify } from "../composables/notifyHook";
const { showNotify } = useNotify();
const $q = useQuasar();
const emit = defineEmits("update");
const userStore = useUserStore();
const shoppingStore = useShoppingStore();
const client = ref();
const expanded = ref(false);
const props = defineProps({
  order: {},
  isAdmin: Boolean,
});
const expandCard = () => {
  expanded.value = !expanded.value;
};
const updateStateOrder = (state) => {
  $q.dialog({
    title: "Confirmación",
    message: "¿Estas seguro que quieres actualizar la orden?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await shoppingStore.updateOrder(props.order._id, state);
    showNotify("Orden actualizada", "green");
    emit("update");
  });
};


const getInfo = async () => {
  const clientId = props.order.userID;
  console.log(clientId);
  client.value = await userStore.getInfoUserById(clientId);
};
</script>
