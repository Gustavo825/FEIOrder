<template>
  <q-card class="my-card">
    <q-img class="image" :src="dish.image">
      <div class="absolute-bottom">
        <div class="text-h6">
          {{ dish.title }}
        </div>
        <div class="text-subtitle2">Costo: ${{ dish.cost }}</div>
      </div>
    </q-img>

    <q-card-actions v-if="!isAdmin" align="right">
      <q-btn disabled="false" flat round color="red" icon="favorite" />
      <q-btn
        @click="addToCart(dish)"
        flat
        round
        color="teal"
        icon="shopping_cart"
      />
      <q-btn
        @click="copy(dish._id)"
        flat
        round
        color="primary"
        icon="content_copy"
      />
      <q-btn
        @click="clickSeeMore"
        flat
        round
        color="black"
        icon="arrow_forward_ios"
      >
      </q-btn>
      <InfoDish :dish="dish" :card="card"></InfoDish>
    </q-card-actions>
    <q-card-actions v-else align="right">
      <q-btn
        @click="clickSeeMore"
        flat
        round
        color="black"
        icon="arrow_forward_ios"
      >
      </q-btn>
      <q-btn @click="clickEditDish" flat round color="primary" icon="edit" />
      <EditDish :dishEdit="dish" :card="cardEdit"></EditDish>
      <InfoDish :dish="dish" :card="card"></InfoDish>
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
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
const copy = (id) => {
  if (!navigator.clipboard) {
    showNotify("No se pudo copiar");
    return;
  }
  const path = window.location.origin + "/dish/" + id;
  navigator.clipboard
    .writeText(path)
    .then(() => {
      showNotify("Texto copiado al portapaples", "green");
    })
    .catch((err) => {
      showNotify("No se pudo copiar");
    });
};
</script>

<style scoped>
.my-card {
  width: 300px;
  height: 250px;
  margin-right: 2rem;
  border-radius: 20px;
}
.image {
  height: 200px;
  min-width: 300px;
}
</style>
