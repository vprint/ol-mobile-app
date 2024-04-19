<template>
  <!-- Desktop -->
  <q-btn
    v-if="$q.platform.is.desktop"
    fab
    flat
    icon="sym_o_straighten"
    @click="addMeasure()"
  >
    <q-tooltip
      anchor="bottom middle"
      self="bottom middle"
      transition-show="scale"
      transition-hide="scale"
      :delay="500"
      style="border-radius: 0"
    >
      Measure
    </q-tooltip>
  </q-btn>

  <!-- Mobile -->
  <q-btn
    v-if="$q.platform.is.mobile"
    round
    color="secondary"
    icon="sym_o_straighten"
    text-color="primary"
    @click="addMeasure()"
  />
</template>

<script setup lang="ts">
import { Modify } from 'ol/interaction.js';
import VectorSource from 'ol/source/Vector';
import { useMapStore } from 'src/stores/map-store';

const mapStore = useMapStore();
let isActive = false;
const modify = new Modify({ source: new VectorSource() });

function addMeasure(): void {
  if (!isActive) {
    console.log("lancement de l'outil");
    mapStore.map.addInteraction(modify);
    isActive = true;
  } else {
    console.log("desactivation de l'outil");
    mapStore.map.removeInteraction(modify);
    isActive = false;
  }
}
</script>

<style></style>
