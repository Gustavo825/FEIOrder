<template>
  <div class="doc-container register">
    <div class="row items-start">
      <div class="col col-display">
        <q-img class="img-background" alt="Registrar platillo" src="../assets/registerDish.png"></q-img>
      </div>
      <div class="col">
        <q-scroll-area class="scroll-register-dish">
          <q-form class="form-register-dish" @submit.prevent="handleSubmit" ref="form">
            <q-img class="logo" src="../assets/registerDishTitle.png" />
            <label class="form-label-dish">Título del platillo:</label>
            <q-input class="form-input" dark outlined v-model="title" type="text" label="Ingrese el título del platillo"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor escriba algo',
              ]"></q-input>
            <label class="form-label-dish">Costo del platillo:</label>
            <q-input class="form-input" dark outlined v-model="cost" type="text" label="Ingrese el costo del platillo"
              :rules="[
                (val) =>
                  /^\d{0,8}(\.\d{1,4})?$/.test(val) ||
                  'Ingrese un costo válido',
                ,
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor, ingrese valores numéricos',
              ]">
            </q-input>
            <label class="form-label-dish">Descripción del platillo:</label>
            <q-input class="form-input" dark outlined v-model="description" type="text"
              label="Ingrese la descripción del platillo" :rules="[
                (val) => (val && val.length > 0) || 'Por favor escriba algo',
              ]"></q-input>
            <label class="form-label-dish">Tiempo de preparación aproximado:</label>
            <q-input class="form-input" dark outlined v-model="timeToCook" type="text"
              label="Ingrese el tiempo de preparación del platillo en minutos" :rules="[
                (val) =>
                  /^\d{0,8}(\.\d{1,4})?$/.test(val) ||
                  'Ingrese un costo válido',
                (val) => (val && val.length > 0) || 'Por favor escriba algo',
              ]"></q-input>
            <label class="form-label-dish">Categoría:</label>
            <q-select class="form-input" dark outlined v-model="category" :options="options" label="Categoría" />
            <q-file outlined class="input-image" label-color="white" accept=".jpg, image/*" v-model="image"
              label="Ingrese imagen del platillo" @update:model-value="selectedImage()">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" color="white" @click.stop.prevent />
              </template>
            </q-file>
            <q-img class="image-from-input" :src="imageURL"></q-img>

            <q-btn class="form-submit-register" label="Registrar platillo" type="submit" color="primary">
            </q-btn>
          </q-form>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<style>
@import "../styles/registerDishStyle.css";
</style>

<script setup>
import { ref } from "vue";
import { useDishStore } from "../stores/use-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useNotify } from "../composables/notifyHook";
const { showNotify } = useNotify();
const options = ["Menú general", "Desayunos", "Bebidas", "Promoción"];
const router = useRouter();
const dishStore = useDishStore();
const $q = useQuasar();

const title = ref("");
const cost = ref("");
const description = ref("");
const timeToCook = ref("");
const form = ref(null);
const imageURL = ref("");
const image = ref("");
const category = ref("");
const selectedImage = () => {
  imageURL.value = URL.createObjectURL(image.value);
};
const handleSubmit = async () => {
  try {
    let categoryVal = "";
    switch (category.value) {
      case "Menú general":
        categoryVal = "GENERAL";
        break;
      case "Desayunos":
        categoryVal = "BREAKFAST";
        break;
      case "Bebidas":
        categoryVal = "DRINK";

        break;
      case "Promoción":
        categoryVal = "SALE";

        break;
    }
    if (await form.value.validate() && imageURL.value) {
      await dishStore.register(
        title.value,
        cost.value,
        description.value,
        timeToCook.value,
        image.value,
        categoryVal
      );
      title.value = "";
      cost.value = "";
      description.value = "";
      timeToCook.value = "";
      showNotify("Platillo registrado", "green");
      router.push("/");
    } else {
      alertError("Existen campos vacíos");
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
