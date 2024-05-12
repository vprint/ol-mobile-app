import { defineStore } from 'pinia';
import { Site } from 'src/model/site';
import { useComponentStore } from './component-store';
import ApiRequestor from 'src/services/ApiRequestor';
import { nextTick, Ref, ref } from 'vue';

const { setWidget, widget } = useComponentStore();

type ISiteState = Site | undefined;

export const useSiteStore = defineStore('sites', () => {
  const site: Ref<ISiteState> = ref(undefined);

  /**
   * Set active site and open site manager
   * @param site Site
   */
  function setSite(newSite: Site): void {
    if (newSite.siteId !== site.value?.siteId) {
      site.value = newSite;
      if (widget.visibility) {
        setWidget(false, '');
        nextTick(() => {
          setWidget(true, 'site-manager');
        });
      } else {
        setWidget(true, 'site-manager');
      }
    }
  }

  /**
   * Update site values
   * @param site New site
   */
  function updateSite(newSite: Site): void {
    site.value = newSite;
  }

  /**
   * Fetch site and assign it in the store
   * @param siteId site id
   */
  async function fetchAndSetSite(siteId: number): Promise<void> {
    const fetchedSite = await ApiRequestor.getSiteById(siteId);

    if (fetchedSite) {
      setSite(fetchedSite);
    }
  }

  /**
   * Clear site in store and close widget
   */
  function clearSite(): void {
    site.value = undefined;
    setWidget(false, '');
  }

  return { site, setSite, updateSite, fetchAndSetSite, clearSite };
});
