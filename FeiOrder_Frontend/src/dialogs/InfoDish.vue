<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-img :src="dish.image" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="alarm"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ dish.title }}</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            {{ dish.timeToCook }}
            <q-icon name="alarm" />
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">$ {{ dish.cost }}</div>
        <div class="text-caption text-grey">
          {{ dish.description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          color="primary"
          icon="shopping_cart"
          label="Comprar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
defineProps({
  card: Boolean,
  dish: [],
});
</script>
