<template>
  <q-dialog class="dialog" v-model="card" persistent >
    <q-card v-if="dishCopy" class="my-card">
      <q-img :src="dishEdit.image" />
      <q-form class="form-register-dish" @submit.prevent="clickSaveEdit" ref="form">
        <q-card-section>
          <div class="row no-wrap items-center card-section">
            <q-input class="col text-h6 ellipsis" v-model="dishCopy.title" label="Título del platillo" :rules="[
              (val) => (val && val.length > 0) || 'Por favor escriba algo',
            ]"></q-input>

          </div>
          <div class="row no-wrap items-center card-section">
            <q-input class="col text-h6 ellipsis " v-model="dishCopy.timeToCook"
              label="Tiempo de preparación en minutos" :rules="[
            (val) =>
              /^\d{0,8}(\.\d{1,4})?$/.test(val) ||
              'Por favor, ingrese valores numéricos'
            ,
            (val) =>
              (val && val.length > 0) ||
              'Ingrese un tiempo válido',
              ,
          ]"></q-input>
          </div>
          <q-input v-model="dishCopy.cost" class="col text-h6 ellipsis card-section" label="Costo del platillo" :rules="[
            (val) =>
              /^\d{0,8}(\.\d{1,4})?$/.test(val) ||
              'Ingrese un costo válido',
            ,
            (val) =>
              (val && val.length > 0) ||
              'Por favor, ingrese valores numéricos',
          ]"></q-input>
          <q-input v-model="dishCopy.description" class="col text-h6 ellipsis card-section"
            label="Descripción del platillo" :rules="[
              (val) => (val && val.length > 0) || 'Por favor escriba algo',
            ]"></q-input>
          <q-select class="form-input card-section" outlined v-model="category" :options="options" label="Categoría" />
          <q-img class="image-from-input card-section" :src="imageURL"></q-img>
          <q-file outlined class="input-image card-section" accept=".jpg, image/*" v-model="image"
            label="Ingrese la imagen del platillo" @update:model-value="selectedImage()">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" color="white" @click.stop.prevent />
            </template>
          </q-file>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" icon="cancel" label="Cancelar" @click="clickCancelEdit" />
          <q-btn v-close-popup flat color="primary" icon="save" label="Guardar cambios" type="submit" />
        </q-card-actions>
      </q-form>

      <q-separator />



    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { useDishStore } from "../stores/use-store";
import { useRouter } from "vue-router";
const router = useRouter();
const dishStore = useDishStore();
const dishCopy = ref([]);
const category = ref("");
const form = ref("")
const imageURL = ref("");
const image = ref("");
const emit = defineEmits("close");
const options = ["Menú general", "Desayunos", "Bebidas", "Promoción"];
const props = defineProps({
  card: Boolean,
  dishEdit: [],
});
dishCopy.value = JSON.parse(JSON.stringify(props.dishEdit));
switch (dishCopy.value.type) {
  case "GENERAL":
    category.value = "Menú general";
    break;
  case "BREAKFAST":
    category.value = "Desayunos";
    break;
  case "DRINK":
    category.value = "Bebidas";
    break;
  case "SALE":
    category.value = "Promoción";
    break;
}

const clickCancelEdit = () => {
  dishCopy.value = JSON.parse(JSON.stringify(props.dishEdit));
  emit("close");
}

const clickSaveEdit = async () => {
  if (await form.value.validate()) {
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
      if (imageURL.value) {
        dishStore.updateImage(image, props.dishEdit._id);
      }
      imageURL.value = ""
      await dishStore.updateDish(props.dishEdit._id, dishCopy.value.title, dishCopy.value.cost, dishCopy.value.description, dishCopy.value.timeToCook, categoryVal);
      dishStore.getDishes();
      emit("close");
    } catch (error) {
      console.log(error);
    }
  }
}

const selectedImage = () => {
  imageURL.value = URL.createObjectURL(image.value);
};
</script>

<style>
@import "../styles/editDishStyle.css";
</style>
