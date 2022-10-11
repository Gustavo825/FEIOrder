<template>
  <q-layout class="home">
    <q-page padding>
      <q-card dark bordered class="card">
        <q-img src="../assets/defaultBanner.jpg" />

        <q-card-section>
          <q-avatar
            size="120px"
            font-size="52px"
            fab
            color="primary"
            icon="person"
            class="absolute"
            style="top: 0; right: 12px; transform: translate(-170%, -50%)"
          />
        </q-card-section>

        <q-card-section v-if="userStore.user" class="q-pt-none">
          <div class="text-subtitle2">{{ userStore.user.username }}</div>
          <div class="text-caption text-grey">
            {{ userStore.user.email }}
          </div>
          <div class="text-caption text-grey">
            {{ userStore.user.name }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-icon name="edit" />
          <q-btn flat color="primary"> Editar </q-btn>
        </q-card-actions>
      </q-card>
    </q-page>
  </q-layout>
</template>
<style scoped>
@import "../styles/homeStyle.css";
</style>
<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/use-store";
const userStore = useUserStore();
const getInfo = async () => {
  if (userStore.user == null) {
    try {
      await userStore.getInfoUser();
    } catch (error) {
      if (error.error) {
        alertError(error.error);
      }
      if (error.errors) {
        alertError(error.errors[0].msg);
      }
    }
  }
};
onMounted(() => {
  getInfo();
});
</script>
