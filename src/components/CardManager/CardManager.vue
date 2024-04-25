<template>
  <transition
    appear
    :enter-active-class="enterAnimation"
    :leave-active-class="exitAnimation"
  >
    <KeepAlive>
      <LayerManager
        v-if="widget.visibility && widget.widgetName === 'layer-manager'"
      ></LayerManager>
    </KeepAlive>
  </transition>

  <transition
    appear
    :enter-active-class="enterAnimation"
    :leave-active-class="exitAnimation"
  >
    <KeepAlive>
      <SiteManager
        v-if="widget.visibility && widget.widgetName === 'site-manager'"
      ></SiteManager>
    </KeepAlive>
  </transition>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useComponentStore } from 'src/stores/component-store';
import { ref, watch } from 'vue';
import LayerManager from '../LayerManager/LayerManager.vue';
import SiteManager from '../SiteManager/SiteManager.vue';

const componentStore = useComponentStore();
const $q = useQuasar();
const widget = ref(componentStore.widget);

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
    widget.value = newWidget;
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
    left: 0px;
    bottom: -2px;
  }
}
</style>
