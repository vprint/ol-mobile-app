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
    <q-card-section id="site-manager" class="bg-secondary">
      <q-form @submit="openDialog" @reset="cancel">
        <fieldset style="margin-top: 0px">
          <legend>Names</legend>

          <!-- Alternative name -->
          <FormInput
            v-model="site.alternativeName"
            :label="SITE_TYPE_REFS_PARAMS.alternativeName"
            :edition-mode="editionMode"
          />

          <!-- French name -->
          <FormInput
            v-model="site.frenchName"
            :label="SITE_TYPE_REFS_PARAMS.frenchName"
            :edition-mode="editionMode"
          />

          <!-- Khmer name -->
          <FormInput
            v-model="site.khmerName"
            :label="SITE_TYPE_REFS_PARAMS.khmerName"
            :edition-mode="editionMode"
          />

          <!-- alternative khmer name -->
          <FormInput
            v-model="site.alternativeKhmerName"
            :label="SITE_TYPE_REFS_PARAMS.alternativeKhmerName"
            :edition-mode="editionMode"
            no-padding
          />
        </fieldset>

        <fieldset>
          <legend>Informations</legend>
          <!-- description -->
          <FormInput
            v-model="site.description"
            :label="SITE_TYPE_REFS_PARAMS.description"
            :edition-mode="editionMode"
          />

          <!-- Feature type -->
          <FormSelect
            v-model="site.featureType"
            :label="SITE_TYPE_REFS_PARAMS.featureType"
            :options="featureTypeList"
            :edition-mode="editionMode"
          />

          <!-- Study area -->
          <FormSelect
            v-model="site.studyArea"
            :label="SITE_TYPE_REFS_PARAMS.studyArea"
            :options="studyArea"
            :edition-mode="editionMode"
          />

          <!-- ikId -->
          <FormInput
            v-model="site.ikId"
            :label="SITE_TYPE_REFS_PARAMS.ikId"
            :edition-mode="editionMode"
          />

          <!-- mhId -->
          <FormInput
            v-model="site.mhId"
            :label="SITE_TYPE_REFS_PARAMS.mhId"
            :edition-mode="editionMode"
          />

          <!-- Researchers -->
          <FormSelect
            v-model="site.researchers"
            :label="SITE_TYPE_REFS_PARAMS.researchers"
            :options="researchers"
            option-value="researcherId"
            option-label="fullName"
            :edition-mode="editionMode"
            multiple
          />

          <!-- Located by -->
          <FormSelect
            v-model="site.locatedBy"
            :label="SITE_TYPE_REFS_PARAMS.locatedBy"
            :options="researchers"
            option-value="researcherId"
            option-label="fullName"
            :edition-mode="editionMode"
            no-padding
          />
        </fieldset>

        <fieldset>
          <legend>Verification</legend>

          <!-- verified -->
          <q-checkbox
            v-model="site.verified"
            :label="SITE_TYPE_REFS_PARAMS.verified"
            :disable="editionMode ? false : true"
          />

          <!-- Verification date -->
          <FormInput
            v-model="site.verificationDate"
            :label="SITE_TYPE_REFS_PARAMS.verificationDate"
            :edition-mode="editionMode"
            date
            no-padding
          />
        </fieldset>

        <fieldset>
          <legend>Ceramics</legend>

          <!-- Ceramics -->
          <q-checkbox
            v-model="site.ceramics"
            :label="SITE_TYPE_REFS_PARAMS.ceramics"
            :disable="editionMode ? false : true"
          />

          <!-- Ceramic details-->
          <FormInput
            v-model="site.ceramicsDetails"
            :label="SITE_TYPE_REFS_PARAMS.ceramicsDetails"
            :edition-mode="editionMode"
            autogrow
            no-padding
          />
        </fieldset>

        <fieldset>
          <legend>Artefacts</legend>

          <!-- Artefacts -->
          <FormSelect
            v-model="site.artefacts"
            :label="SITE_TYPE_REFS_PARAMS.artefacts"
            :options="artefacts"
            option-value="artefactId"
            option-label="artefactName"
            :edition-mode="editionMode"
            multiple
          />

          <!-- artefact comment -->
          <FormInput
            v-model="site.artefactsComments"
            :label="SITE_TYPE_REFS_PARAMS.artefactComments"
            :edition-mode="editionMode"
            autogrow
            no-padding
          />
        </fieldset>

        <fieldset>
          <legend>Build Materials</legend>

          <!-- build materials-->
          <FormSelect
            v-model="site.buildMaterials"
            :label="SITE_TYPE_REFS_PARAMS.buildMaterials"
            :options="buildMaterials"
            option-value="buildMaterialId"
            option-label="buildMaterialName"
            :edition-mode="editionMode"
            multiple
          />

          <!-- build material details-->
          <FormInput
            v-model="site.buildMaterialComments"
            :label="SITE_TYPE_REFS_PARAMS.buildMaterialComments"
            :edition-mode="editionMode"
            autogrow
            no-padding
          />
        </fieldset>

        <fieldset>
          <legend>State</legend>

          <div class="row">
            <!-- Looted -->
            <q-checkbox
              v-model="site.looted"
              class="col"
              :label="SITE_TYPE_REFS_PARAMS.looted"
              :disable="editionMode ? false : true"
            />

            <!-- Cleared -->
            <q-checkbox
              v-model="site.cleared"
              class="col"
              :label="SITE_TYPE_REFS_PARAMS.cleared"
              :disable="editionMode ? false : true"
            />
          </div>

          <div class="row">
            <!-- cultivated -->
            <q-checkbox
              v-model="site.cultivated"
              class="col"
              :label="SITE_TYPE_REFS_PARAMS.cultivated"
              :disable="editionMode ? false : true"
            />
            <!-- threatened -->
            <q-checkbox
              v-model="site.threatened"
              class="col"
              :label="SITE_TYPE_REFS_PARAMS.threatened"
              :disable="editionMode ? false : true"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Database information</legend>
          <!-- databasing comments -->
          <FormInput
            v-model="site.databasingComments"
            :label="SITE_TYPE_REFS_PARAMS.databasingComments"
            :edition-mode="editionMode"
            autogrow
          />

          <!-- Creation date -->
          <FormInput
            v-model="site.creationDate"
            :label="SITE_TYPE_REFS_PARAMS.creationDate"
            :edition-mode="editionMode"
            date
          />

          <!-- Modificiation date-->
          <FormInput
            v-model="site.modificationDate"
            :label="SITE_TYPE_REFS_PARAMS.modificationDate"
            :edition-mode="editionMode"
            date
          />

          <!-- user creation -->
          <FormInput
            v-model="site.userCreation"
            :label="SITE_TYPE_REFS_PARAMS.userCreation"
            :edition-mode="editionMode"
          />

          <!-- user modification -->
          <FormInput
            v-model="site.userModification"
            :label="SITE_TYPE_REFS_PARAMS.userModification"
            :edition-mode="editionMode"
            no-padding
          />
        </fieldset>
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
            type="reset"
            class="site-button"
            outline
            square
            color="primary"
            label="Cancel"
          />
          <q-btn
            v-if="editionMode"
            type="submit"
            class="site-button"
            square
            color="primary"
            label="Save"
          />
        </div>
      </q-form>

      <!-- Dialog -->
      <ConfirmDialog
        :visible="confirmDialogVisibility"
        @update:confirm="saveData()"
        @update:cancel="menageDialog(false, true)"
      ></ConfirmDialog>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useSiteStore } from '../../stores/site-store';
import { SITE_TYPE_REFS_PARAMS } from '../../utils/params/typeRefsSettings';
import { ref, toRaw } from 'vue';
import { Site } from '../../model/site';
import ConfirmDialog from './ConfirmDialog.vue';
import ApiRequestor from '../../services/ApiRequestor';
import FormSelect from './FormSelect.vue';
import FormInput from './FormInput.vue';

const siteStore = useSiteStore();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const site = ref(siteStore.site! as Site);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
let originalSite = structuredClone(toRaw(siteStore.site!) as Site);

const editionMode = ref(false);
const confirmDialogVisibility = ref(false);
const expended = ref(false);

const researchers = await ApiRequestor.getResearcherList();
const buildMaterials = await ApiRequestor.getBuildMaterialList();
const documents = await ApiRequestor.getDocumentList();
const artefacts = await ApiRequestor.getArtefactList();
const featureTypeList = await ApiRequestor.getFeatureTypeList();
const studyArea = await ApiRequestor.getStudyAreaList();

function saveData(): void {
  menageDialog(false, false);
  siteStore.updateSite(cloneSite(site.value as Site, true));
  originalSite = cloneSite(site.value as Site, true);
  editionMode.value = false;
}

function openDialog(): void {
  menageDialog(true, true);
}

function cancel(): void {
  siteStore.updateSite(cloneSite(originalSite));
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  site.value = siteStore.site! as Site;
  editionMode.value = false;
}

/**
 * Manage dialog event
 * @param visibility Set the dialog visibility
 * @param edition Set form edition mode
 */
function menageDialog(visibility: boolean, edition: boolean): void {
  editionMode.value = edition;
  confirmDialogVisibility.value = visibility;
}

function cloneSite(site: Site, isRef?: boolean): Site {
  if (isRef) {
    return structuredClone(toRaw(site) as Site);
  } else {
    return structuredClone(site);
  }
}
</script>

<style lang="scss">
fieldset {
  border: 1px solid $primary;
  border-radius: 2px;
  margin-top: 20px;
}

legend {
  font-size: 15px;
  padding: 0 10px;
  color: $primary;
}

.header {
  position: sticky;
  top: 0px;
  z-index: 1;
  padding: 30px;
}

.site-button {
  width: 90px;
}
</style>
