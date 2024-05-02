import wretch from 'wretch';
import { Site } from 'src/model/site';
import { APP_SETTINGS } from 'src/utils/params/app';
import { ISite, ISiteList } from 'src/interface/ISite';
import { IResearcher } from 'src/interface/IResearcher';
import { Researcher } from 'src/model/researcher';
import { BuildMaterial } from 'src/model/buildMaterial';
import { IBuildMaterial } from 'src/interface/IBuildMaterial';
import { IDocument } from 'src/interface/IDocument';
import { AssociatedDocument } from 'src/model/associatedDocument';
import { IArtefact } from 'src/interface/IArtefact';
import { Artefact } from 'src/model/artefact';

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
 * Get simplified list of sites
 * @returns
 */
async function getSiteList(): Promise<ISiteList[]> {
  const result = await getJSON<ISiteList[]>(
    `${APP_SETTINGS.featureServer}/functions/public.get_site_list/items.json`
  );

  if (result) {
    return result;
  }

  return [];
}

/**
 * Get list of researchers
 * @returns
 */
async function getResearcherList(): Promise<Researcher[]> {
  const result = await getJSON<IResearcher[]>(
    `${APP_SETTINGS.featureServer}/functions/public.get_researcher_list/items.json`
  );

  if (result) {
    return result.map((researcher) => new Researcher(researcher));
  }

  return [];
}

/**
 * Get list of material builds
 * @returns
 */
async function getBuildMaterialList(): Promise<BuildMaterial[]> {
  const result = await getJSON<IBuildMaterial[]>(
    `${APP_SETTINGS.featureServer}/functions/public.get_build_material_list/items.json`
  );

  if (result) {
    return result.map((buildMaterial) => new BuildMaterial(buildMaterial));
  }

  return [];
}

/**
 * Get document list
 */
async function getDocumentList(): Promise<AssociatedDocument[]> {
  const result = await getJSON<IDocument[]>(
    `${APP_SETTINGS.featureServer}/functions/public.get_document_list/items.json`
  );

  if (result) {
    return result.map((document) => new AssociatedDocument(document));
  }

  return [];
}

/**
 * Get artefact list
 */
async function getArtefactList(): Promise<Artefact[]> {
  const result = await getJSON<IArtefact[]>(
    `${APP_SETTINGS.featureServer}/functions/public.get_artefact_list/items.json`
  );

  if (result) {
    return result.map((artefact) => new Artefact(artefact));
  }

  return [];
}

const ApiRequestor = {
  getSiteById,
  getSiteList,
  getResearcherList,
  getBuildMaterialList,
  getDocumentList,
  getArtefactList,
};

export default ApiRequestor;
