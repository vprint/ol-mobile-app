<template>
  <!-- Card -->
  <q-card square class="global-card">
    <q-bar
      class="bg-accent text-white row items-center no-wrap header-card header"
    >
      <div>Sites</div>

      <q-space />

      <!-- Close button -->
      <q-btn
        v-close-popup
        flat
        round
        icon="close"
        @click="siteStore.clearSite"
      />
    </q-bar>

    <!-- Content -->
    <q-card-section
      v-if="siteStore.site"
      id="site-manager"
      class="bg-secondary"
    >
      <!-- Form. The form is dynamically created from siteInformation list-->
      <q-form>
        <div
          v-for="siteInfo in siteInformationList"
          :key="siteInfo.key"
          class="form-element"
        >
          <q-input
            v-model="siteInfo.formattedKey"
            outlined
            square
            :label="siteInfo.value"
            stack-label
            dense
            :readonly="editionMode ? false : true"
          />
        </div>
      </q-form>

      <!-- Action buttons -->
      <div class="q-pa-md q-gutter-sm row justify-end">
        <q-btn
          v-if="!editionMode"
          class="site-button"
          square
          color="primary"
          label="Edit"
          @click="editionMode = !editionMode"
        />
        <q-btn
          v-if="editionMode"
          class="site-button"
          outline
          square
          color="primary"
          label="Cancel"
          @click="editionMode = !editionMode"
        />
        <q-btn
          v-if="editionMode"
          class="site-button"
          square
          color="primary"
          label="Save"
          @click="confirmDialogManager(true, true)"
        />
      </div>

      <!-- Dialog -->
      <ConfirmDialog
        :visible="confirmDialogVisibility"
        @update:confirm="confirmDialogManager(false, false)"
        @update:cancel="confirmDialogManager(false, true)"
      ></ConfirmDialog>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useSiteStore } from '../../stores/site-store';
import { date } from 'quasar';
import {
  ISiteTypeRefParams,
  SITE_TYPE_REFS_PARAMS,
} from '../../utils/params/typeRefsSettings';
import { onMounted, ref, Ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';

export interface ISiteInfo {
  key: string;
  formattedKey: string;
  value: string;
  type: string;
}
const siteStore = useSiteStore();
const site = siteStore.site;
const siteInformationList: Ref<ISiteInfo[]> = ref([]);
const editionMode = ref(false);
const confirmDialogVisibility = ref(false);

onMounted(() => {
  initializeSiteInformation();
});

/**
 * Initialize site information object. This object is used to dynamically create the form
 */
function initializeSiteInformation(): void {
  Object.entries(SITE_TYPE_REFS_PARAMS).forEach(([key, value]) => {
    if (site) {
      const valueType = getTypeOfValue(site[key as ISiteTypeRefParams]);
      const siteObject: ISiteInfo = {
        key: key,
        formattedKey: valueFormatter(site[key as ISiteTypeRefParams]),
        value: value,
        type: valueType,
      };
      siteInformationList.value.push(siteObject);
    }
  });
}

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

/**
 * Return the type of the object
 * @param inputValue Value to check
 */
function getTypeOfValue(inputValue: unknown): string {
  return inputValue instanceof Date ? 'date' : typeof inputValue;
}

/**
 * Manage dialog event
 * @param visibility Set the dialog visibility
 * @param edition Set form edition mode
 */
function confirmDialogManager(visibility: boolean, edition: boolean): void {
  editionMode.value = edition;
  confirmDialogVisibility.value = visibility;
}
</script>

<style lang="scss">
@import 'font-awesome/css/font-awesome.min.css';

.header {
  position: sticky;
  top: 0px;
  z-index: 1;
  padding: 30px;
}

.form-element {
  margin-bottom: 10px;
}

.site-button {
  width: 90px;
}

.q-field {
  &.q-field--readonly {
    &.q-field--outlined {
      .q-field__control {
        &:before {
          border: transparent;
        }
      }
    }
  }
}
</style>
