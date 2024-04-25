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
        @click="componentStore.setWidget(false, '')"
      />
    </q-bar>

    <!-- Content -->
    <q-card-section id="site-manager" class="bg-secondary">
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label>English name</q-item-label>

            <!-- <q-item-label caption>{{
              siteStore.site!.english_name
            }}</q-item-label> -->
            <q-input v-model="siteStore.site!.english_name" outlined dense />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>French name</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.french_name
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Khmer name</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.khmer_name
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Alternative name</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.alternative_name
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Alternative Khmer name</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.alternative_khmer_name
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Description</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.description
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>IK ID</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.ik_id
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>MH ID</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.mh_id
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Verified</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.verified ? 'Yes' : 'No'
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Verification date</q-item-label>
            <q-item-label caption>{{
              formatDate(siteStore.site!.verification_date)
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Located by</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.located_by
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Ceramics details</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.ceramics_details
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Ceramics</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.ceramics ? 'Yes' : 'No'
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Build material comment</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.build_material_comments
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Artefacts comment</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.artefacts_comments
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Looted</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.looted ? 'Yes' : 'No'
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Cultivated</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.cultivated ? 'Yes' : 'No'
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Cleared</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.cleared ? 'Yes' : 'No'
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Threatened</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.threatened ? 'Yes' : 'No'
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Databasing comments</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.databasing_comments
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Creation date</q-item-label>
            <q-item-label caption>{{
              formatDate(siteStore.site!.creation_date)
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Modification date</q-item-label>
            <q-item-label caption>{{
              formatDate(siteStore.site!.modification_date)
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>User creation</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.user_creation
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>User modification</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.user_modification
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Feature type</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.feature_type_id
            }}</q-item-label></q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section
            ><q-item-label>Study area</q-item-label>
            <q-item-label caption>{{
              siteStore.site!.study_area
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useComponentStore } from '../../stores/component-store';
import { useSiteStore } from '../../stores/site-store';
import { date } from 'quasar';

const componentStore = useComponentStore();
const siteStore = useSiteStore();

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
