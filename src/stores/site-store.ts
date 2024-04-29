import { defineStore } from 'pinia';
import { Site } from 'src/model/site';
import { useComponentStore } from './component-store';
import ApiRequestor from 'src/services/ApiRequestor';

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
      if (this._site?.siteId !== site.siteId) {
        this._site = site;
        if (componentStore.widget.visibility) {
          componentStore.setWidget(false, '');
          setTimeout(() => {
            componentStore.setWidget(true, 'site-manager');
          }, 10);
        } else {
          componentStore.setWidget(true, 'site-manager');
        }
      }
    },

    /**
     * Fetch site and assign it in the store
     * @param siteId site id
     */
    async fetchAndSetSite(siteId: number): Promise<void> {
      const site = await ApiRequestor.getSiteById(siteId);

      if (site) {
        this.setSite(site);
      }
    },

    /**
     * Clear site in store and close widget
     */
    clearSite(): void {
      this._site = undefined;
      componentStore.setWidget(false, '');
    },
  },
});
