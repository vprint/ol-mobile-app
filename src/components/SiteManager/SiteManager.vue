<template>
  <q-card square class="global-card">
    <q-bar
      class="bg-accent text-white row items-center no-wrap header-card header"
    >
      <div>Sites</div>

      <q-space />

      <q-btn
        v-close-popup
        flat
        round
        icon="close"
        @click="siteStore.clearSite"
      />
    </q-bar>

    <!-- Content -->
    <q-card-section id="site-manager" class="bg-secondary">
      <q-list bordered separator>
        <q-item v-for="(value, key) in SITE_TYPE_REFS_PARAMS" :key="key">
          <q-item-section>
            <q-item-label>
              {{ value }}
            </q-item-label>
            <q-item-label caption>{{
              valueFormatter(siteStore.site![key])
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useSiteStore } from '../../stores/site-store';
import { date } from 'quasar';
import { SITE_TYPE_REFS_PARAMS } from '../../utils/params/typeRefsSettings';

const siteStore = useSiteStore();

/**
 * Format value to display them in the form
 * @param inputValue Value to format
 */
function valueFormatter(inputValue: string | Date | number | boolean): string {
  if (inputValue instanceof Date) {
    return formatDate(inputValue);
  } else if (typeof inputValue === 'number') {
    return inputValue.toString();
  } else if (typeof inputValue === 'boolean') {
    return inputValue ? 'Yes' : 'No';
  }

  return inputValue;
}

/**
 * Format data to remove excessive time information
 * @param inputDate Data
 */
function formatDate(inputDate: Date): string {
  return date.formatDate(inputDate, 'YYYY-MM-DD');
}
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0px;
  z-index: 1;
  padding: 30px;
}
</style>
