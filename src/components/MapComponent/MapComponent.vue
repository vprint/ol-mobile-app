<template>
  <div id="map" class="map"></div>

  <!-- Mobile display -->
  <div v-if="$q.platform.is.mobile">
    <q-page-sticky position="top-right">
      <!-- Manage layers -->
      <div class="q-px-md q-py-md">
        <LayerManagerButton></LayerManagerButton>
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
        <MeasureComponent></MeasureComponent>
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
import { addBackgroundLayers, addWMSLayers } from '../../utils/mapLayers';
import { addControlers } from '../../utils/mapControlers';
import { useMapStore } from '../../stores/map-store';
import CardManager from '../CardManager/CardManager.vue';
import MeasureComponent from '../MeasureComponent/MeasureComponent.vue';
import LayerManagerButton from '../LayerManager/LayerManagerButton.vue';
import { GeolocationTracker } from '../../utils/GeolocationTracker';

let map: Map;

const mapStore = useMapStore();

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
  addWMSLayers(map);
  addControlers(map);

  // Add geolocation tracker
  new GeolocationTracker(map);

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
