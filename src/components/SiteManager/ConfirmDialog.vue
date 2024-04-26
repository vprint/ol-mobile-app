<template>
  <q-dialog v-model="confirm" persistent square>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          v-if="$q.platform.is.desktop"
          icon="save"
          color="primary"
          text-color="white"
        />
        <span class="q-ml-sm"
          >This action is definitive. Confirm modification ?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          outline
          square
          class="site-button"
          label="Cancel"
          color="primary"
          @click="cancel"
        />
        <q-btn
          v-close-popup
          square
          class="site-button"
          label="Save"
          color="primary"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['update:confirm', 'update:cancel']);

const props = defineProps<{
  visible: boolean;
}>();

const confirm = ref(props.visible ? true : false);

watch(
  () => props.visible,
  (newVal) => {
    confirm.value = newVal;
  }
);

function save(): void {
  emit('update:confirm');
}

function cancel(): void {
  emit('update:cancel');
}
</script>
