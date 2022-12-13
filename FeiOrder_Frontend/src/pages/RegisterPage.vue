<template>
  <div class="doc-container register">
    <div class="row items-start">
      <div class="col col-display">
        <q-img role="presentation" class="img-background" src="../assets/registerUserBackground.png"></q-img>
      </div>
      <div class="col">
        <q-scroll-area class="scroll-register">
          <q-form id=" form" class="form-register" @submit.prevent="handleSubmit" ref="form">
            <q-img class="logo" src="../assets/registerUserTitle.png" />
            <label class="form-label">Correo:</label>
            <q-input class="form-input" dark outlined v-model="email" type="text" label="Ingrese correo electrónico"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor escriba algo',
                (val) =>
                  /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) ||
                  'Formato Email incorrecto',
              ]"></q-input>
            <label class="form-label">Username:</label>
            <q-input class="form-input" dark outlined v-model="username" type="text" label="Ingrese un username" :rules="[
              (val) => (val && val.length > 0) || 'Por favor escriba algo',
            ]"></q-input>
            <label class="form-label">Nombre:</label>
            <q-input class="form-input" dark outlined v-model="name" type="text" label="Ingrese un nombre" :rules="[
              (val) => (val && val.length > 0) || 'Por favor escriba algo',
            ]"></q-input>
            <label class="form-label">Contraseña:</label>
            <q-input class="form-input" dark outlined v-model="password" type="password" label="Ingrese contraseña"
              :rules="[
                (val) =>
                  (val && val.length > 5) || 'Contraseña mayor a 6 carácteres',
              ]"></q-input>
            <label class="form-label">Confirma tu contraseña:</label>

            <q-input class="form-input" dark outlined v-model="repassword" type="password" label="Ingrese contraseña"
              :rules="[
                (val) =>
                  (val && val === password) || 'No coinciden las contraseñas',
              ]"></q-input>

            <q-btn class="form-submit-register" label="Registrarse" type="submit" color="primary"></q-btn>
          </q-form>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/use-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
function onMounted() {
  setBrand("negative", "black", document.getElementById("form"));
}
const router = useRouter();
const userStore = useUserStore();
const $q = useQuasar();

const email = ref("");
const password = ref("");
const username = ref("");
const repassword = ref("");
const name = ref("");
const imageURL = ref("");
const image = ref("");
const form = ref(null);
const handleSubmit = async () => {
  try {
    if (await form.value.validate()) {
      await userStore.register(
        email.value,
        name.value,
        username.value,
        password.value,
        repassword.value,
        imageURL.value
      );
      email.value = "";
      password.value = "";
      repassword.value = "";
      name.value = "";
      username.value = "";
      repassword.value = "";
      router.push("/login");
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
</script>
<style scoped>
@import "../styles/registerStyle.css";

.text-negative {
  color: green !important;
}

.q-input {
  color: green !important;
}
</style>
