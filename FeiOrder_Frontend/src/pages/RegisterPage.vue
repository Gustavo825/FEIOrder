<template>
  <div class="doc-container register">
    <div class="row items-start">
        <q-img class="img-background" src="../assets/register.jpeg"></q-img>
      <div class="col">
        <q-form class="form-register" @submit.prevent="handleSubmit" ref="form">
          <q-img src="../assets/FEIOrder.png" />
          <label class="form-label">Correo:</label>
          <q-input
            class="form-input"
            dark
            outlined
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
          <label class="form-label">Username:</label>
          <q-input
            class="form-input"
            dark
            outlined
            v-model="username"
            type="text"
            label="Ingrese un username"
          ></q-input>
          <label class="form-label">Nombre:</label>
          <q-input
            class="form-input"
            dark
            outlined
            v-model="name"
            type="text"
            label="Ingrese un nombre"
          ></q-input>
          <label class="form-label">Contraseña:</label>

          <q-input
            class="form-input"
            dark
            outlined
            v-model="password"
            type="password"
            label="Ingrese contraseña"
            :rules="[
              (val) =>
                (val && val.length > 5) || 'Contraseña mayor a 6 carácteres',
            ]"
          ></q-input>
          <label class="form-label">Confirma tu contraseña:</label>

          <q-input
            class="form-input"
            dark
            outlined
            v-model="repassword"
            type="password"
            label="Ingrese contraseña"
            :rules="[
              (val) =>
                (val && val === password) || 'No coinciden las contraseñas',
            ]"
          ></q-input>

          <q-btn
            class="form-submit-register"
            label="Registrarse"
            type="submit"
            color="primary"
          ></q-btn>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/use-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const userStore = useUserStore();
const $q = useQuasar();

const email = ref("");
const password = ref("");
const username = ref("");
const repassword = ref("");
const name = ref("");
const form = ref(null);

const handleSubmit = async () => {
  try {
    if (await form.value.validate()) {
      await userStore.register(
        email.value,
        name.value,
        username.value,
        password.value,
        repassword.value
      );
      email.value = "";
      password.value = "";
      repassword.value = "";
      name.value = "";
      username.value = "";
      repassword.value = "";
      router.push("/");
    }
  } catch (error) {
    console.log("desde loginComponents: ", error);
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
</script>
<style scoped>
@import "../styles/registerStyle.css";
</style>
