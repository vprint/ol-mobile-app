<template>
  <div id="map" class="map"></div>
  <!-- Mobile display -->

  <div v-if="$q.platform.is.mobile">
    <q-page-sticky position="top-right">
      <!-- Manage layers -->
      <div class="q-px-md q-py-md">
        <q-btn
          round
          color="secondary"
          icon="mdi-layers"
          text-color="primary"
          @click="componentStore.changeVisibility()"
        />
      </div>

      <!-- Copy coordinates -->
      <div class="q-px-md q-py-md">
        <q-btn
          round
          color="secondary"
          icon="mdi-map-marker-check"
          text-color="primary"
        />
      </div>

      <!-- Measure -->
      <div class="q-px-md q-py-md">
        <q-btn
          round
          color="secondary"
          icon="sym_o_straighten"
          text-color="primary"
        />
      </div>
    </q-page-sticky>
  </div>
  <!-- Tools -->
  <CardManager></CardManager>
</template>

<script setup lang="ts">
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { onMounted } from 'vue';
import { MapSetting } from '../../utils/params/mapSettings';
import { fromLonLat } from 'ol/proj';
import { addBackgroundLayers } from '../../utils/mapLayers';
import { addControlers } from '../../utils/mapControlers';
import { useMapStore } from '../../stores/map-store';
import { useComponentStore } from 'src/stores/component-store';
import CardManager from '../CardManager/CardManager.vue';

let map: Map;

const mapStore = useMapStore();
const componentStore = useComponentStore();

onMounted(() => {
  // Map initialization
  map = new Map({
    controls: [],
    target: 'map',
    view: new View({
      center: fromLonLat([MapSetting.long, MapSetting.lat]),
      zoom: MapSetting.zoom,
      maxZoom: MapSetting.maxzoom,
      minZoom: MapSetting.minzoom,
    }),
  });

  addBackgroundLayers(map);
  addControlers(map);
  mapStore.setMap(map);
});
</script>

<style lang="scss">
@import 'ol/ol.css';

#map {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
