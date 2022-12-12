<template>
  <q-card @keyup.enter="clickSeeMore" tabindex="2" id="card" class="my-card">
    <q-img class="image" :src="dish.image">
      <div class="absolute-bottom">
        <div class="text-h6">
          {{ dish.title }}
        </div>
        <div class="text-subtitle2">Costo: ${{ dish.cost }}</div>
      </div>
    </q-img>
    <q-card-actions v-if="!isAdmin" align="right">
      <q-btn
        @click="addToCart(dish)"
        flat
        round
        alt="Shopping"
        color="teal"
        icon="shopping_cart"
      />
      <q-btn @click="clickSeeMore" flat round color="blue" icon="info"> </q-btn>
      <InfoDish v-on:close="close" :dish="dish" :card="card"></InfoDish>
    </q-card-actions>

    <q-card-actions v-else align="right">
      <q-btn
        @click="clickEditDish"
        alt="Edit Dish"
        flat
        round
        color="primary"
        icon="edit"
      />
      <q-btn
        @click="clickSeeMore"
        alt="Information Dish"
        flat
        round
        color="blue"
        icon="info"
      >
      </q-btn>
      <EditDish
        v-on:close="closeEdit"
        :dishEdit="dish"
        :card="cardEdit"
      ></EditDish>
      <InfoDish v-on:close="close" :dish="dish" :card="card"></InfoDish>
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { useNotify } from "../composables/notifyHook";
import { useShoppingStore } from "../stores/use-store";
// @ts-ignore
import InfoDish from "../dialogs/InfoDish.vue";
import { useRouter } from "vue-router";
import EditDish from "src/dialogs/EditDish.vue";
const router = useRouter();
const shoppingStore = useShoppingStore();
const { showNotify } = useNotify();
const card = ref(false);
const cardEdit = ref(false);
const $q = useQuasar();
defineProps({
  dish: [],
  isAdmin: Boolean,
});

const close = () => {
  card.value = false;
};

const closeEdit = () => {
  cardEdit.value = false;
};

const clickEditDish = () => {
  cardEdit.value = !cardEdit.value;
};
const clickSeeMore = () => {
  card.value = !card.value;
};
const addToCart = (dish) => {
  console.log(dish);
  $q.dialog({
    title: "Confirmación",
    message: "¿Quieres agregar este platillo a tu carrito de compras?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    shoppingStore.add(dish);

    router.push("/ShoppingCart");
  });
};
</script>

<style scoped>
.my-card {
  width: 300px;
  height: 250px;
  margin-right: 2rem;
  border-radius: 20px;
  margin-top: 5vh;
}

.image {
  height: 200px;
  min-width: 300px;
}
</style>
