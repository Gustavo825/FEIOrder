<template>
  <q-page padding class="login">
    <div>
      <q-form class="form" @submit.prevent="handleSubmit" ref="form">
        <q-img
          :src="'https://drive.google.com/uc?export=view&id=14E8IU8fF260oyWVV4CdeDIAGgZFocSoC'"
        />
        <label class="form-label">Contraseña:</label>
        <q-input
          dark
          outlined
          class="form-input"
          v-model="email"
          type="text"
          label="Ingrese correo electrónico"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor escriba algo',
            (val) =>
              /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) ||
              'Formato Email incorrecto',
          ]"
        ></q-input>
        <label class="form-label">Correo:</label>
        <q-input
          class="form-input"
          v-model="password"
          type="password"
          dark
          outlined
          label="Ingrese contraseña"
          :rules="[
            (val) =>
              (val && val.length > 5) || 'Contraseña mayor a 6 carácteres',
          ]"
        ></q-input>
        <q-btn class="form-submit" label="Ingresar" type="submit"></q-btn>
        <q-btn
          v-on:click="clickRegisterButton()"
          class="registerButton"
          label="Registrarse"
        ></q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/use-store";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const form = ref(null);

const handleSubmit = async () => {
  try {
    if (await form.value.validate()) {
      await userStore.access(email.value, password.value);
      email.value = "";
      password.value = "";
      router.push("/");
    }
  } catch (error) {
    if (error.error) {
      alertError(error.error);
    }
    if (error.errors) {
      alertError(error.errors[0].msg);
    }
  }
};

const alertError = (message = "Error de servidor") => {
  $q.dialog({
    title: "Error",
    message: message,
  });
};
const clickRegisterButton = () => {
  router.push("/Register");
};
// const resetValidation = () => form.value.resetValidation();
</script>
<style scoped>
@import "../styles/loginStyle.css";
</style>
