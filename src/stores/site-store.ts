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
    /**
     * Set active site and open site manager
     * @param site Site
     */
    setSite(site: Site): void {
      if (componentStore.widget.visibility) {
        componentStore.setWidget(false, '');
        setTimeout(() => {
          this._site = site;
          componentStore.setWidget(true, 'site-manager');
        }, 100);
      } else {
        this._site = site;
        componentStore.setWidget(true, 'site-manager');
      }
    },
  },
});
