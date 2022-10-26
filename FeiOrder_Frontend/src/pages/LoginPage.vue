<template>
  <div class="doc-container login">
    <div class="row items-start">
      <div class="col col-display">
        <q-img
          class="img-background"
          src="../assets/loginUserBackground.png"
        ></q-img>
      </div>
      <div class="col">
        <q-scroll-area class="scroll-login">
          <q-form class="form" @submit.prevent="handleSubmit" ref="form">
            <q-img class="login-logo" src="../assets/FEIOrder.png" />
            <label class="form-label">Correo:</label>

            <q-input
              outlined
              dark
              class="form-input"
              v-model="email"
              type="text"
              label="Ingrese correo electrónico"
              v-bind:error="emailError"
              error-color="black"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor escriba algo',
                (val) =>
                  /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) ||
                  'Formato Email incorrecto',
              ]"
            ></q-input>
            <label class="form-label">Contraseña:</label>
            <q-input
              class="form-input"
              v-model="password"
              type="password"
              outlined
              dark
              label="Ingrese contraseña"
              :rules="[
                (val) =>
                  (val && val.length > 5) || 'Contraseña mayor a 6 carácteres',
              ]"
            ></q-input>
            <q-btn
              class="form-submit"
              label="Iniciar sesión"
              type="submit"
            ></q-btn>
            <q-btn
              v-on:click="clickRegisterButton()"
              class="registerButton"
              label="Registrarse"
              type="submit"
            ></q-btn>
          </q-form>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/use-store";
import { useNotify } from "../composables/notifyHook";
import { useRouter } from "vue-router";
const router = useRouter();
const { showNotify } = useNotify();
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
      showNotify("Bienvenido", "green");
      router.push("/");
    }
  } catch (error) {
    if (error.error) {
      showNotify(error.error);
    }
    if (error.errors) {
      $q.notify(error.errors[0].msg);
    }
  }
};

const clickRegisterButton = () => {
  router.push("/Register");
};
// const resetValidation = () => form.value.resetValidation();
</script>
<style scoped>
@import "../styles/loginStyle.css";
</style>
