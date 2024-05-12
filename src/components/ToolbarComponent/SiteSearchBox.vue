<template>
  <!-- Searchbox -->
  <q-select
    v-if="isReady"
    ref="siteSearch"
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
    @clear="clearSite"
  >
    <template #append>
      <q-icon
        name="sym_s_search"
        class="cursor-pointer icon-weight-thin"
      ></q-icon>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, Ref } from 'vue';
import ApiRequestor from '../../services/ApiRequestor';
import { useSiteStore } from 'src/stores/site-store';
import { QSelect } from 'quasar';
import { storeToRefs } from 'pinia';

interface ISearchItems {
  label: string;
  value: number;
}

let searchList: ISearchItems[] = [];

const { site } = storeToRefs(useSiteStore());
const { clearSite, fetchAndSetSite } = useSiteStore();

const options: Ref<ISearchItems[]> = ref([]);
const model: Ref<string | null> = computed(() =>
  site.value ? site.value.englishName : null
);
const isReady = ref(false);
const siteSearch: Ref<null | QSelect> = ref(null);

onMounted(async () => {
  const result = await ApiRequestor.getSiteList();

  options.value = result.map((site) => ({
    label: site.site_name,
    value: site.site_id,
  }));

  searchList = result.map((site) => ({
    label: site.site_name,
    value: site.site_id,
  }));

  isReady.value = true;
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
    nextTick(() => {
      if (siteSearch.value) {
        siteSearch.value.blur();
      }
    });

    fetchAndSetSite(site.value);
  }
}
</script>
