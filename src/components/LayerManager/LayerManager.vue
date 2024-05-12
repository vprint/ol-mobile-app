<template>
  <q-card square :class="expended ? 'global-card-expended' : 'global-card'">
    <!-- Title -->
    <q-bar
      class="bg-accent text-white row items-center no-wrap header-card header"
    >
      <div>Manage layers</div>

      <q-space />

      <q-btn
        v-if="$q.platform.is.mobile"
        v-close-popup
        flat
        round
        :icon="expended ? 'expand_more' : 'expand_less'"
        @click="expended = !expended"
      />

      <!-- Close button -->
      <q-btn
        v-close-popup
        flat
        round
        icon="close"
        @click="setWidget(false, '')"
      />
    </q-bar>

    <!-- Content -->
    <q-card-section id="layer-manager" class="bg-secondary"> </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useComponentStore } from 'src/stores/component-store';
import { useMapStore } from 'src/stores/map-store';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { ref, onMounted } from 'vue';

const { setWidget } = useComponentStore();
const mapStore = useMapStore();
const expended = ref(false);

// Initialize ol-ext LayerSwitcher
onMounted(() => {
  mapStore.map.addControl(
    new LayerSwitcher({
      target: document.getElementById('layer-manager') ?? undefined,
    })
  );
});
</script>

<style lang="scss">
@import 'ol-ext/dist/ol-ext.css';
@import 'font-awesome/css/font-awesome.min.css';

.header {
  position: sticky;
  top: 0px;
  z-index: 1;
  padding: 30px;
}

.ol-layerswitcher.ol-collapsed {
  min-width: unset;
}
.ol-layerswitcher,
.ol-layerswitcher.ol-forceopen {
  min-width: 20em;
}

.ol-layerswitcher > ul.panel {
  overflow-y: auto;
  box-sizing: border-box;
}

.ol-layerswitcher li .li-content {
  width: calc(100% - 3em);
}

.ol-layerswitcher li .li-content label {
  width: 60%;
  box-sizing: border-box;
  vertical-align: middle;
  margin: 0.6em 0;
}

.ol-control.ol-layerswitcher .panel-container {
  padding-right: 0;
}

.ol-layerswitcher .panel li .layerswitcher-opacity {
  width: 40%;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  vertical-align: middle;
  margin: 0;
}
.ol-layerswitcher .layerswitcher-opacity {
  border: 0;
  background: none;
  height: 1em;
  box-shadow: none;
}
.ol-layerswitcher .layerswitcher-opacity:before {
  content: '';
  width: 100%;
  height: 3px;
  background: $primary;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border: 1px solid $primary;
  box-sizing: border-box;
}
.ol-layerswitcher .layerswitcher-opacity .layerswitcher-opacity-cursor {
  width: auto;
  transform: translateY(-50%);
  height: 3px;
  right: 0;
  background: #666;
  border-radius: 0;
}
.ol-touch
  .ol-layerswitcher
  .layerswitcher-opacity
  .layerswitcher-opacity-cursor,
.ol-layerswitcher .layerswitcher-opacity .layerswitcher-opacity-cursor:before {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 16px;
  left: -1px;
  border-radius: 0;
  background: $primary;
}
.ol-layerswitcher .layerswitcher-opacity-label {
  display: block;
  right: 20%;
  bottom: 70%;
  font-size: 0.6em;
  user-select: none;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
}

.ol-layerswitcher .layerup {
  width: 2em;
  background: none;
  position: absolute;
  right: 0.5em;
}
.ol-layerswitcher .layerup:after {
  content: none;
}
.ol-layerswitcher .layerup:before {
  color: $primary;
  content: '\F0C9';
  font-family: FontAwesome;
  border: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1em;
  left: 0.5em;
}

.ol-layerswitcher [type='checkbox'] + label:before,
.ol-layerswitcher [type='radio'] + label:before {
  content: '';
  border: 2px solid #ccc;
  background-color: transparent;
}
.ol-layerswitcher [type='checkbox']:checked + label:before,
.ol-layerswitcher [type='radio']:checked + label:before {
  background: $primary;
  border-color: $primary;
}
.ol-layerswitcher [type='checkbox']:checked + label:after {
  content: '\2713';
  color: #fff;
  position: absolute;
  top: -0.15em;
  left: 0.25em;
  cursor: pointer;
  font-weight: 900;
  text-shadow: 1px 1px #fff;
  font-size: 1.2em;
  transform: none;
  border: 0;
  box-shadow: unset;
}

.ol-layerswitcher [type='radio']:checked + label:after {
  content: none;
}

.ol-control.ol-layerswitcher {
  background: $primary;
  right: 0;
  border-radius: 0;
}
.ol-layerswitcher button,
.ol-layerswitcher button:focus,
.ol-layerswitcher button:hover {
  background: $primary;
  border: 0;
  user-select: none;
  outline: none;
}
.ol-layerswitcher button:before {
  background: $primary;
  -webkit-box-shadow: 0.1em 0.1em #fff;
  box-shadow: 0.1em 0.1em #fff;
}
.ol-layerswitcher button:after {
  background: #fff;
  background-image: none;
}

.ol-layerswitcher .ol-layer-group {
  margin-top: 1em;
}
.ol-layerswitcher .ol-layer-group > .ol-layerswitcher-buttons .layerInfo {
  display: none;
}
.ol-layerswitcher .expend-layers:before,
.ol-layerswitcher .collapse-layers:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -2px;
  height: 4px;
  width: 100%;
  background: #369;
}
.ol-layerswitcher .expend-layers,
.ol-layerswitcher .collapse-layers {
  top: -1em;
}
.ol-layerswitcher .expend-layers:before,
.ol-layerswitcher .expend-layers:after,
.ol-layerswitcher .collapse-layers:before,
.ol-layerswitcher .collapse-layers:after {
  background: $primary;
}
.ol-layerswitcher .panel ul {
  overflow: visible;
}
.ol-layerswitcher .layerInfo {
  right: 0;
  background: $primary;
}

.ol-control.ol-layerswitcher .ol-switchertopdiv,
.ol-control.ol-layerswitcher .ol-switcherbottomdiv {
  display: none !important;
}
</style>
