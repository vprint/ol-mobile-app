<template>
  <!-- Toolbar -->
  <q-toolbar class="bg-secondary text-primary shadow-2">
    <!-- Logo -->
    <q-avatar square>
      <q-img :src="'icons/efeo_logo.png'"></q-img>
    </q-avatar>

    <!-- Title (desktop display only) -->
    <q-toolbar-title v-if="$q.platform.is.desktop">
      {{ APP_SETTINGS.name }}
    </q-toolbar-title>

    <!-- Space -->
    <q-space></q-space>

    <!-- Measure button -->
    <q-btn v-if="$q.platform.is.desktop" fab flat icon="sym_o_straighten">
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

    <!-- Coordinates -->
    <q-btn v-if="$q.platform.is.desktop" fab flat icon="mdi-map-marker-check">
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
    <q-btn
      v-if="$q.platform.is.desktop"
      fab
      flat
      icon="mdi-layers"
      @click="componentStore.changeVisibility()"
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

    <!-- Searchbox -->
    <q-select
      v-model="model"
      hide-selected
      use-input
      fill-input
      label-color="grey-8"
      color="primary"
      bg-color="white"
      popup-content-class="text-grey-8"
      class="searchbox"
      input-debounce="0"
      outlined
      hide-dropdown-icon
      :options="options"
      @filter="filterFn"
    >
      <template #append>
        <q-icon name="search" class="cursor-pointer"></q-icon>
      </template>
    </q-select>
  </q-toolbar>
</template>

<script setup lang="ts">
import { APP_SETTINGS } from '../../utils/params/app';
import { ref } from 'vue';
import { useComponentStore } from 'src/stores/component-store';

const componentStore = useComponentStore();
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const options = ref(stringOptions);
const model = ref(null);

/**
 * Filters entries according to the text entered by the user
 * @param val value entered by user
 * @param update update
 */
function filterFn(val: string, update: (fn: () => void) => void): void {
  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter((v) =>
      v.toLowerCase().includes(needle)
    );
  });
}
</script>

<style scoped>
.searchbox {
  width: 250px;
  padding: 4px;
}
</style>
