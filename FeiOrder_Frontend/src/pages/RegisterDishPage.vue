<template>
    <div class="doc-container register">
    <div class="row items-start">
        <div class="col col-display">
        <q-img class="img-background" src="../assets/registerDish.png"></q-img>
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
          <q-input class="form-input" dark outlined v-model="cost" type="text" label="Ingrese el costo del platillo">
          </q-input>
          <label class="form-label-dish">Descripción del platillo:</label>
          <q-input class="form-input" dark outlined v-model="description" type="text" label="Ingrese la descripción del platillo"></q-input>
          <label class="form-label-dish">Tiempo de preparación aproximado:</label>
          <q-input class="form-input" dark outlined v-model="timeToCook" type="text" label="Ingrese el tiempo de preparación del platillo"></q-input>     
          <q-btn class="form-submit-register" label="Registrar platillo" type="submit" color="primary"></q-btn>
        </q-form>
        </q-scroll-area>
      </div>
    </div>
  </div>
  </template>
  
  <style>
    @import "../styles/registerDishStyle.css";

  </style>

  <script>
</script>
  