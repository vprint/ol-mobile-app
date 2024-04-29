import wretch from 'wretch';
import { Site } from 'src/model/site';
import { APP_SETTINGS } from 'src/utils/params/app';
import { ISite, ISiteList } from 'src/interface/ISite';

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
 * Get full site information by id
 * @param siteId SiteId
 * @returns
 */
async function getSiteById(siteId: number): Promise<Site | undefined> {
  let site: Site | undefined = undefined;

  const result = await getJSON<ISite[]>(
    `${APP_SETTINGS.featureServer}/functions/public.get_site_by_id/items.json?id=${siteId}`
  );

  if (result) {
    site = new Site(result[0]);
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
