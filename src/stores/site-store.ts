import { defineStore } from 'pinia';
import { Site } from 'src/model/site';
import { useComponentStore } from './component-store';

const componentStore = useComponentStore();

interface ISiteState {
  _site: Site | undefined;
}

export const useSiteStore = defineStore('sites', {
  state: (): ISiteState => ({
    _site: undefined,
  }),

  getters: {
    site: (state) => state._site,
  },

  actions: {
    setSite(site: Site): void {
      this._site = site;
      componentStore.setWidget(true, 'site-manager');
    },
  },
});
