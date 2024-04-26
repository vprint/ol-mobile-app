<template>
  <!-- Searchbox -->
  <q-select
    v-if="isReady"
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
    clearable
    @filter="filterFn"
    @update:model-value="selectSite"
    @clear="siteStore.clearSite"
  >
    <template #append>
      <q-icon name="search" class="cursor-pointer"></q-icon>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue';
import ApiRequestor from '../../services/ApiRequestor';
import { useSiteStore } from 'src/stores/site-store';

export interface ISiteList {
  site_id: number;
  site_name: string;
}

interface ISearchItems {
  label: string;
  value: number;
}

let searchList: ISearchItems[] = [];
const siteStore = useSiteStore();
const options: Ref<ISearchItems[]> = ref([]);
const model: Ref<string | null> = ref(null);
const isReady = ref(false);

/**
 * Listen for site change
 */
watch(
  () => siteStore.site,
  (newSite) => {
    model.value = newSite?.englishName ?? null;
  },
  {
    deep: true,
  }
);

onMounted(async () => {
  const result = await ApiRequestor.getSiteList();

  if (result) {
    options.value = result.map((site) => ({
      label: site.site_name,
      value: site.site_id,
    }));

    searchList = result.map((site) => ({
      label: site.site_name,
      value: site.site_id,
    }));

    isReady.value = true;
  }
});

/**
 * Filters entries according to the text entered by the user
 * @param val value entered by user
 * @param update update
 */
function filterFn(val: string, update: (fn: () => void) => void): void {
  update(() => {
    const needle = val.toLowerCase();
    options.value = searchList
      .filter((v) => v.label.toLowerCase().includes(needle))
      .slice(0, 5);
  });
}

/**
 * Fetch and set site after selecting it in the list
 * @param site
 */
function selectSite(site: ISearchItems | undefined): void {
  if (site) {
    siteStore.fetchAndSetSite(site.value);
  }
}
</script>
