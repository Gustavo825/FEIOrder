<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

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
