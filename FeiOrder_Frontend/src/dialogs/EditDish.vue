<template>
  <q-dialog v-model="card">
    <q-card v-if="dishCopy" class="my-card">
      <q-img :src="dishCopy.image" />
      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="alarm"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="row no-wrap items-center">
          <q-input
            class="col text-h6 ellipsis"
            v-model="dishCopy.title"
          ></q-input>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            {{ dishCopy.timeToCook }}
            <q-icon name="alarm" />
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">$ {{ dishCopy.cost }}</div>
        <div class="text-caption text-grey">
          {{ dishCopy.description }}
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
import { ref, watch } from "vue";
const dishCopy = ref([]);
const props = defineProps({
  card: Boolean,
  dishEdit: [],
});
dishCopy.value = JSON.parse(JSON.stringify(props.dishEdit));
</script>
