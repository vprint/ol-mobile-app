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
        <fieldset style="margin-top: 0px">
          <legend>Names</legend>
          <!-- Alternative name -->
          <q-input
            v-model="site.alternativeName"
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
            v-model="site.frenchName"
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
            v-model="site.khmerName"
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
            v-model="site.alternativeKhmerName"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.alternativeKhmerName"
            stack-label
            dense
            :readonly="editionMode ? false : true"
          />
        </fieldset>

        <fieldset>
          <legend>Informations</legend>
          <!-- description -->
          <q-input
            v-model="site.description"
            class="form-element"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.description"
            stack-label
            dense
            :readonly="editionMode ? false : true"
          />

          <!-- Implémenter les options -->
          <q-select
            v-model="site.featureType"
            class="form-element"
            :options="['Temple', 'Mound']"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.featureType"
            dense
            :readonly="editionMode ? false : true"
          />

          <q-select
            v-model="site.studyArea"
            class="form-element"
            :options="['Angkor', 'Phnom Penh']"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.studyArea"
            dense
            :readonly="editionMode ? false : true"
          />

          <!-- ikId -->
          <q-input
            v-model="site.ikId"
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
            v-model="site.mhId"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.mhId"
            stack-label
            dense
            :readonly="editionMode ? false : true"
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
          <q-input
            v-model="verificationDate"
            style="padding-bottom: 0px"
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
                  <q-date v-model="verificationDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
          <q-input
            v-model="site.ceramicsDetails"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.ceramicsDetails"
            stack-label
            dense
            :readonly="editionMode ? false : true"
            autogrow
          />
        </fieldset>

        <fieldset>
          <legend>Build Materials</legend>
        </fieldset>

        <fieldset>
          <legend>State</legend>
          <div class="row">
            <q-checkbox
              v-model="site.looted"
              class="col"
              :label="SITE_TYPE_REFS_PARAMS.looted"
              :disable="editionMode ? false : true"
            />

            <q-checkbox
              v-model="site.cleared"
              class="col"
              :label="SITE_TYPE_REFS_PARAMS.cleared"
              :disable="editionMode ? false : true"
            />
          </div>
          <div class="row">
            <q-checkbox
              v-model="site.cultivated"
              class="col"
              :label="SITE_TYPE_REFS_PARAMS.cultivated"
              :disable="editionMode ? false : true"
            />
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

          <q-input
            v-model="site.databasingComments"
            class="form-element"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.databasingComments"
            stack-label
            dense
            :readonly="editionMode ? false : true"
            autogrow
          />

          <q-input
            v-model="creationDate"
            style="padding-bottom: 10px"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.creationDate"
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
                  <q-date v-model="creationDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-model="modificationDate"
            style="padding-bottom: 10px"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.modificationDate"
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
                  <q-date v-model="modificationDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-model="site.userCreation"
            class="form-element"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.userCreation"
            stack-label
            dense
            :readonly="editionMode ? false : true"
          />

          <q-input
            v-model="site.userModification"
            class="form-element"
            outlined
            square
            color="accent"
            :label="SITE_TYPE_REFS_PARAMS.userModification"
            stack-label
            dense
            :readonly="editionMode ? false : true"
          />
        </fieldset>
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
import { SITE_TYPE_REFS_PARAMS } from '../../utils/params/typeRefsSettings';
import { ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { format } from 'date-fns';

const siteStore = useSiteStore();
const site = ref(siteStore.site!);
const editionMode = ref(false);
const confirmDialogVisibility = ref(false);
const expended = ref(false);
const verificationDate = ref(dateToQuasarDate(site.value.verificationDate));
const creationDate = ref(dateToQuasarDate(site.value.creationDate));
const modificationDate = ref(dateToQuasarDate(site.value.modificationDate));

function dateToQuasarDate(date: Date): string {
  return format(date, 'yyyy/MM/dd');
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

.form-group {
  border: 1px solid black;
  margin-bottom: 5px;
  margin-top: 5px;
}

.form-element {
  margin-bottom: 10px;
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
