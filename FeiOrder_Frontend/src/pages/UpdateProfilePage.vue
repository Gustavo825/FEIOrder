<template>
  <q-layout class="home">
    <q-page padding>
      <q-card dark class="card">
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

        <q-card-section class="col no-wrap items-center" v-if="userStore.user">
          <div class="col">Correo: {{ userStore.user.email }}</div>

          <q-form class="col" @submit.prevent="handleSubmit()">
            <label class="form-label">Username:</label>
            <q-input
              class="form-input input-update"
              dark
              outlined
              v-model="username"
              type="text"
            >
            </q-input>
            <label class="form-label">Nombre:</label>

            <q-input
              class="form-input input-update"
              dark
              outlined
              v-model="name"
              type="text"
            >
            </q-input>
            <q-file
              outlined
              class="input-image"
              label-color="white"
              accept=".jpg, image/*"
              v-model="image"
              label="Ingrese su foto de perfil"
              @update:model-value="selectedImage()"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" color="white" @click.stop.prevent />
              </template>
            </q-file>
            <q-img class="image-from-input" :src="imageURL"></q-img>

            <q-btn
              class="form-submit-update"
              label="Editar"
              type="submit"
              color="primary"
            ></q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/use-store";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const username = ref("");
const name = ref("");
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
    name = userStore.user.name;
    username = userStore.user.username;
  }
};

onMounted(() => {
  getInfo();
});
const imageURL = ref("");
const image = ref("");
const form = ref(null);
const handleSubmit = async () => {
  try {
    userStore.updateUser(userStore.user.id, name, username);
    if (imageURL.value) {
      userStore.updateImage(image);
    }
    router.push("/Profile");
  } catch {
    console.log(error.code);
  }
};
const selectedImage = () => {
  imageURL.value = URL.createObjectURL(image.value);
};
</script>
<style scoped>
@import "../styles/updateProfileStyle.css";
</style>
