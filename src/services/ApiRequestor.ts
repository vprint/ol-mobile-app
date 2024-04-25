import wretch from 'wretch';
import { Feature } from 'geojson';
import { Site } from 'src/model/site';
import { APP_SETTINGS } from 'src/utils/params/app';
import { ISiteList } from 'src/components/ToolbarComponent/SiteSearchBox.vue';

/**
 * Json getter
 * @param url Url to request
 * @returns Data
 */
async function getJSON<T>(url: string): Promise<T | undefined> {
  const response = wretch(url)
    .get()
    .json<T>()
    .catch((error) => {
      console.error(`${error.status}: ${error.message}`);
      return undefined;
    });
  return response;
}

/**
 * Get site by id
 * @param site_id site_id to request
 * @returns Site
 */
async function getSiteById(site_id: number): Promise<Site | undefined> {
  let site: Site | undefined = undefined;

  const result = await getJSON<Feature>(
    `${APP_SETTINGS.featureServer}/collections/public.sites/items/${site_id}.json`
  );

  if (result?.properties) {
    site = new Site(result.properties);
  }

  return site;
}

/**
 * Get list of sites
 * @returns
 */
async function getSiteList(): Promise<ISiteList[] | undefined> {
  const result = await getJSON<ISiteList[]>(
    `${APP_SETTINGS.featureServer}/functions/public.get_site_list/items.json`
  );

  if (result) {
    return result;
  }

  return undefined;
}

const ApiRequestor = {
  getSiteById,
  getSiteList,
};

export default ApiRequestor;
