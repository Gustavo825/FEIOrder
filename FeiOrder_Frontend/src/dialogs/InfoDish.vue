<template>
  <q-dialog tabindex="2" v-model="card" persistent>
    <q-card class="my-card">
      <q-img :src="dish.image" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ dish.title }}</div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            {{ dish.timeToCook }} minutos
            <q-icon name="alarm" />
          </div>
        </div>

        <!-- <q-rating v-model="stars" :max="5" size="32px" /> -->
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">$ {{ dish.cost }}</div>
        <div class="text-caption text-grey">
          {{ dish.description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" icon="close" label="Cerrar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const emit = defineEmits("close");
defineProps({
  card: Boolean,
  dish: [],
});
</script>
