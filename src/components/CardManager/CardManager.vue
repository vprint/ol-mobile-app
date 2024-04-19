<template>
  <transition
    appear
    :enter-active-class="enterAnimation"
    :leave-active-class="exitAnimation"
  >
    <KeepAlive>
      <LayerManager v-if="displayComponent"></LayerManager>
    </KeepAlive>
  </transition>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useComponentStore } from 'src/stores/component-store';
import { ref, watch } from 'vue';
import LayerManager from '../LayerManager/LayerManager.vue';

const componentStore = useComponentStore();
const $q = useQuasar();
const displayComponent = ref(false);

// set enter animation type (depend of platform)
const enterAnimation = $q.platform.is.desktop
  ? 'animated fadeInRightBig'
  : 'animated fadeInUpBig';

// set exit animation type (depend of platform)
const exitAnimation = $q.platform.is.desktop
  ? 'animated fadeOutRightBig'
  : 'animated fadeOutDownBig';

/**
 * Watch for visibility change
 */
watch(
  () => componentStore.widget,
  (newWidget) => {
    displayComponent.value = newWidget.visibility;
  },
  { deep: true }
);
</script>

<style lang="scss">
.global-card {
  position: absolute;
  right: 0;
  width: 400px;
  height: 100%;
  overflow: auto;
  background-color: $secondary;
}

@media (max-width: 600px) {
  .global-card {
    width: 100%;
    height: 50%;
    left: 0;
    bottom: 0;
  }
}
</style>
