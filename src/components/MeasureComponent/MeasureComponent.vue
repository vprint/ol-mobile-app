<template>
  <q-btn
    :flat="$q.platform.is.desktop"
    :fab="$q.platform.is.desktop"
    :round="$q.platform.is.mobile"
    :color="$q.platform.is.mobile ? 'secondary' : undefined"
    icon="sym_s_straighten"
    class="icon-weight-thin"
    :text-color="$q.platform.is.mobile ? 'primary' : undefined"
    @click="addMeasure()"
  >
    <q-tooltip
      v-if="$q.platform.is.desktop"
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
</template>

<script setup lang="ts">
import { Draw } from 'ol/interaction.js';
import VectorSource from 'ol/source/Vector';
import { useMapStore } from 'src/stores/map-store';
import Tooltip from 'ol-ext/overlay/Tooltip';

const mapStore = useMapStore();
let isActive = false;
const drawInteraction = initializeDraw();
const tooltipInformation = initializeTooltip();

/**
 * Initialize drawer
 */
function initializeDraw(): Draw {
  const draw = new Draw({
    source: new VectorSource(),
    type: 'LineString',
  });
  draw.set('name', 'drawInteraction');
  draw.setActive(false);
  mapStore.map.addInteraction(draw);
  return draw;
}

/**
 * Initialize tooltip information
 */
function initializeTooltip(): Tooltip {
  const tooltip = new Tooltip({
    popupClass: 'measure-tooltip',
  });
  mapStore.map.addOverlay(tooltip);
  return tooltip;
}

/**
 * Manage measure tool
 */
function addMeasure(): void {
  // Enable tool
  if (!isActive) {
    drawInteraction.setActive(true);
    isActive = true;

    drawInteraction.on('drawstart', (e) => {
      tooltipInformation.setFeature(e);
    });

    drawInteraction.on(['drawend', 'drawabort'], () => {
      tooltipInformation.removeFeature();
      setTimeout(() => {
        drawInteraction.setActive(false);
      }, 50);
      isActive = false;
    });
  }

  // Disable tool
  else {
    tooltipInformation.removeFeature();
    drawInteraction.setActive(false);
    isActive = false;
  }
}
</script>

<style lang="scss">
.measure-tooltip {
  background-color: $secondary;
  color: $accent;
  margin: 25px;
  width: 100px;
  height: 50px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
