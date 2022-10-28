<template>
  <q-dialog v-model="card" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">Confirma tu pedido</div>
        <div class="text-caption">
          Tiempo estimado: {{ shoppingStore.time }} minutos
        </div>
        <div class="text-caption">
          Costo total: $
          {{ shoppingStore.cost }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label class="form-label">Comentarios:</label>
        <q-input dense v-model="comment" filled type="textarea" autofocus />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn @click="cancel" label="Cancel" v-close-popup />
        <q-btn
          @click="confirmOrder"
          flat
          label="Confirmar pedido"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useShoppingStore } from "src/stores/use-store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useNotify } from "../composables/notifyHook";
const { showNotify } = useNotify();
const router = useRouter();
const emit = defineEmits(["close"]);
const shoppingStore = useShoppingStore();
shoppingStore.calculateCost();

const comment = ref(" ");
const cancel = () => {
  console.log("cancelando");
  emit("close");
};
const confirmOrder = async () => {
  await shoppingStore.makeOrder(comment.value);
  showNotify("Tu orden se envio a la cocina", "green");
  router.push("/");
};
defineProps({
  card: Boolean,
});
</script>
