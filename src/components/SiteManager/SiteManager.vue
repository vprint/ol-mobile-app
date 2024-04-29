<template>
  <!-- Card -->
  <q-card square :class="expended ? 'global-card-expended' : 'global-card'">
    <q-bar
      class="bg-accent text-white row items-center no-wrap header-card header"
    >
      <div>{{ `${site?.englishName} - (${site?.khmerName})` }}</div>

      <q-space />

      <q-btn
        v-if="$q.platform.is.mobile"
        v-close-popup
        flat
        round
        :icon="expended ? 'expand_more' : 'expand_less'"
        @click="expended = !expended"
      />

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
      <q-form>
        <!-- Alternative name -->
        <q-input
          v-model="site!.alternativeName"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.alternativeName"
          stack-label
          dense
          :readonly="editionMode ? false : true"
        />

        <!-- French name -->
        <q-input
          v-model="site!.frenchName"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.frenchName"
          stack-label
          dense
          :readonly="editionMode ? false : true"
        />

        <!-- Khmer name -->
        <q-input
          v-model="site!.khmerName"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.khmerName"
          stack-label
          dense
          :readonly="editionMode ? false : true"
        />

        <!-- alternative khmer name -->
        <q-input
          v-model="site!.alternativeKhmerName"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.alternativeKhmerName"
          stack-label
          dense
          :readonly="editionMode ? false : true"
        />
        <q-separator class="form-separator"></q-separator>

        <!-- description -->
        <q-input
          v-model="site!.description"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.description"
          stack-label
          dense
          :readonly="editionMode ? false : true"
        />

        <!-- ikId -->
        <q-input
          v-model="site!.ikId"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.ikId"
          stack-label
          dense
          :readonly="editionMode ? false : true"
        />

        <!-- mhId -->
        <q-input
          v-model="site!.mhId"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.mhId"
          stack-label
          dense
          :readonly="editionMode ? false : true"
        />

        <!-- Verified TODO: A IMPLEMENTER-->

        <!-- Verification date -->
        <q-input
          v-model="site!.verificationDate"
          class="form-element"
          outlined
          square
          color="accent"
          :label="SITE_TYPE_REFS_PARAMS.verificationDate"
          stack-label
          dense
          :readonly="editionMode ? false : true"
          mask="date"
          :rules="['date']"
        >
          <template #append>
            <q-icon v-if="editionMode" name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="site!.verificationDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
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
import { IResearcher } from 'src/interface/IResearcher';
import { IDocument } from 'src/interface/IDocument';
import { IBuildMaterial } from 'src/interface/IBuildMaterial';
import { IArtefact } from 'src/interface/IArtefact';

export interface ISiteInfo {
  key: string;
  formattedKey:
    | string
    | IResearcher
    | IResearcher[]
    | IDocument[]
    | IArtefact[]
    | IBuildMaterial[];
  value: string;
  type: string;
}
const siteStore = useSiteStore();
const site = ref(siteStore.site);
const siteInformationList: Ref<ISiteInfo[]> = ref([]);
const editionMode = ref(false);
const confirmDialogVisibility = ref(false);
const expended = ref(false);

// onMounted(() => {
//   initializeSiteInformation();
// });

/**
 * Initialize site information object. This object is used to dynamically create the form
 */
// function initializeSiteInformation(): void {
//   Object.entries(SITE_TYPE_REFS_PARAMS).forEach(([key, value]) => {
//     if (site.value) {
//       const valueType = getTypeOfValue(site[key as ISiteTypeRefParams]);
//       const siteObject: ISiteInfo = {
//         key: key,
//         formattedKey: valueFormatter(site[key as ISiteTypeRefParams]),
//         value: value,
//         type: valueType,
//       };
//       siteInformationList.value.push(siteObject);
//     }
//   });
// }

//TODO: Améliorer le formulaire pour se passer de cette fonction inélégante

/**
 * Format value to display them in the form
 * @param inputValue Value to format
 */
function valueFormatter(
  inputValue:
    | string
    | Date
    | number
    | boolean
    | IResearcher
    | IResearcher[]
    | IDocument[]
    | IArtefact[]
    | IBuildMaterial[]
):
  | string
  | IResearcher
  | IResearcher[]
  | IDocument[]
  | IArtefact[]
  | IBuildMaterial[] {
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
.form-separator {
  margin: 20px;
}

.header {
  position: sticky;
  top: 0px;
  z-index: 1;
  padding: 30px;
}

.form-element {
  margin-bottom: 5px;
  margin-top: 5px;
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
