<script setup>
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useDishStore } from "../stores/use-store";
const route = useRoute();
const dishStore = useDishStore();
const router = useRouter();
console.log(route.params.name);
const back = () => {
  router.push("/");
};
</script>

<template>
  <div>
    <h1>{{ route.params.name }}</h1>
  </div>
  <button class="mt-5 btn btn-outline-secondary" @click="back">Regresar</button>
</template>

<style scoped></style>
