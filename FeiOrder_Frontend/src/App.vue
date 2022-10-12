<template>
  <router-view v-slot="{ Component }">
    <transition name="scale" mode="out-in">
        <component :key="$route.fullPath" :is="Component"></component>
    </transition>
  </router-view>
</template>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
