<template>
  <!-- Desktop -->
  <q-btn
    v-if="$q.platform.is.desktop"
    fab
    flat
    icon="sym_s_stacks"
    class="icon-weight-thin"
    @click="componentStore.setWidget(true, 'layer-manager')"
  >
    <q-tooltip
      anchor="bottom middle"
      self="bottom middle"
      transition-show="scale"
      transition-hide="scale"
      :delay="500"
      style="border-radius: 0"
    >
      Manage layers
    </q-tooltip>
  </q-btn>

  <!-- Mobile -->
  <q-btn
    v-if="$q.platform.is.mobile"
    round
    color="secondary"
    icon="sym_s_stacks"
    class="icon-weight-thin"
    text-color="primary"
    @click="componentStore.setWidget(true, 'layer-manager')"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { useComponentStore } from 'src/stores/component-store';

const componentStore = useComponentStore();
</script>

<style lang="scss"></style>
