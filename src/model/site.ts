import { GeoJsonProperties } from 'geojson';

/**
 * Site
 */
export class Site {
  public siteId: number;
  public englishName: string;
  public frenchName: string;
  public khmerName: string;
  public alternativeName: string;
  public alternativeKhmerName: string;
  public description: string;
  public ikId: number;
  public mhId: number;
  public verified: boolean;
  public verificationDate: Date;
  public locatedBy: number;
  public ceramicsDetails: string;
  public ceramics: boolean;
  public buildMaterialComments: string;
  public artefactsComments: string;
  public looted: boolean;
  public cultivated: boolean;
  public cleared: boolean;
  public threatened: boolean;
  public databasingComments: string;
  public creationDate: Date;
  public modificationDate: Date;
  public userCreation: string;
  public userModification: string;
  public featureTypeId: number;
  public studyArea: string;

  constructor(partialEntity: GeoJsonProperties) {
    if (!partialEntity) {
      throw new Error('No data provided to initialize Site');
    }

    this.siteId = Number(partialEntity.site_id);
    this.englishName = partialEntity.english_name;
    this.frenchName = partialEntity.french_name;
    this.khmerName = partialEntity.khmer_name;
    this.alternativeName = partialEntity.alternative_name;
    this.alternativeKhmerName = partialEntity.alternative_khmer_name;
    this.description = partialEntity.description;
    this.ikId = Number(partialEntity.ik_id);
    this.mhId = Number(partialEntity.mh_id);
    this.verified = Boolean(partialEntity.verified);
    this.verificationDate = new Date(partialEntity.verification_date);
    this.locatedBy = Number(partialEntity.located_by);
    this.ceramicsDetails = partialEntity.ceramics_details;
    this.ceramics = Boolean(partialEntity.ceramics);
    this.buildMaterialComments = partialEntity.build_material_comments;
    this.artefactsComments = partialEntity.artefacts_comments;
    this.looted = Boolean(partialEntity.looted);
    this.cultivated = Boolean(partialEntity.cultivated);
    this.cleared = Boolean(partialEntity.cleared);
    this.threatened = Boolean(partialEntity.threatened);
    this.databasingComments = partialEntity.databasing_comments;
    this.creationDate = new Date(partialEntity.creation_date);
    this.modificationDate = new Date(partialEntity.modification_date);
    this.userCreation = partialEntity.user_creation;
    this.userModification = partialEntity.user_modification;
    this.featureTypeId = Number(partialEntity.feature_type_id);
    this.studyArea = partialEntity.study_area;
  }
}
