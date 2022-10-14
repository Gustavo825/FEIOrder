<template>
  <q-card class="my-card">
    <q-img class="image" :src="image">
      <div class="absolute-bottom">
        <div class="text-h6">
          {{ title }}
        </div>
        <div class="text-subtitle2">Costo: ${{ cost }}</div>
      </div>
    </q-img>

    <q-card-actions align="right">
      <q-btn flat round color="red" icon="favorite" />
      <q-btn flat round color="teal" icon="shopping_cart" />
      <q-btn @click="copy(id)" flat round color="primary" icon="content_copy" />

      <q-btn
        @click="$router.push(`/dish/${id}`)"
        flat
        round
        color="black"
        icon="arrow_forward_ios"
      >
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup>
import internal from "stream";
import { useNotify } from "../composables/notifyHook";
const { showNotify } = useNotify();
defineProps({
  id: String,
  image: String,
  title: String,
  cost: String,
});

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
}
.image {
  height: 200px;
  min-width: 300px;
}
</style>
