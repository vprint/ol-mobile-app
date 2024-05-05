<template>
  <!-- Toolbar -->
  <q-toolbar
    v-if="mapStore.isInitialized"
    class="bg-secondary text-primary shadow-2"
  >
    <!-- Logo -->
    <q-avatar square>
      <q-img :src="'icons/efeo_logo.png'"></q-img>
    </q-avatar>

    <!-- Title (desktop display only) -->
    <q-toolbar-title v-if="$q.platform.is.desktop">
      {{ APP_SETTINGS.applicationName }}
    </q-toolbar-title>

    <!-- Space -->
    <q-space></q-space>

    <!-- Measure button -->
    <MeasureComponent v-if="$q.platform.is.desktop"></MeasureComponent>

    <q-separator
      v-if="$q.platform.is.desktop"
      vertical
      style="margin: 2px"
    ></q-separator>

    <!-- Coordinates -->
    <q-btn
      v-if="$q.platform.is.desktop"
      fab
      flat
      icon="sym_s_location_on"
      class="icon-weight-thin"
    >
      <q-tooltip
        anchor="bottom middle"
        self="bottom middle"
        transition-show="scale"
        transition-hide="scale"
        :delay="500"
        style="border-radius: 0"
      >
        Copy coordinates
      </q-tooltip>
    </q-btn>

    <!-- Layer button -->
    <LayerManagerButton v-if="$q.platform.is.desktop"></LayerManagerButton>

    <SiteSearchBox></SiteSearchBox>
  </q-toolbar>
</template>

<script setup lang="ts">
import { APP_SETTINGS } from '../../utils/params/app';
import MeasureComponent from '../MeasureComponent/MeasureComponent.vue';
import LayerManagerButton from '../LayerManager/LayerManagerButton.vue';
import { useMapStore } from 'src/stores/map-store';
import SiteSearchBox from './SiteSearchBox.vue';

const mapStore = useMapStore();
</script>

<style scoped>
.searchbox {
  width: 250px;
  padding: 4px;
}
</style>
