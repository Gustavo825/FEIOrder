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
            class="absolute"
            style="top: 0; right: 12px; transform: translate(-170%, -50%)"
          >
            <img
              v-if="userStore.user && userStore.user.image"
              :src="userStore.user.image"
            />
            <q-icon v-else name="person" />
          </q-avatar>
        </q-card-section>

        <q-card-section
          align="center"
          v-if="userStore.user"
          class="q-pt-none user-information"
        >
          <div class="text-subtitle">{{ userStore.user.username }}</div>
          <div class="text-subtitle1 text-grey">
            {{ userStore.user.email }}
          </div>
          <div class="subtitle1 text-grey">
            {{ userStore.user.name }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-icon name="edit" />
          <q-btn @click="clickUpdateButton()" flat color="primary">
            Editar
          </q-btn>
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
import { useRouter } from "vue-router";
const router = useRouter();
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
const clickUpdateButton = () => {
  router.push("/UpdateUser");
};
</script>
