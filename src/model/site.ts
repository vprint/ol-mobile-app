import { Geometry } from 'ol/geom';
import { IResearcher } from 'src/interface/IResearcher';
import { ISite } from 'src/interface/ISite';

/**
 * Site
 */
export class Site {
  private _siteId: number;
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
  public locatedBy: IResearcher;
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
  public featureType: string;
  public studyArea: string;
  public geom?: Geometry;

  constructor(partialEntity: ISite) {
    this._siteId = Number(partialEntity.siteId);
    this.englishName = partialEntity.englishName;
    this.frenchName = partialEntity.frenchName;
    this.khmerName = partialEntity.khmerName;
    this.alternativeName = partialEntity.alternativeName;
    this.alternativeKhmerName = partialEntity.alternativeKhmerName;
    this.description = partialEntity.description;
    this.ikId = Number(partialEntity.ikId);
    this.mhId = Number(partialEntity.mhId);
    this.verified = Boolean(partialEntity.verified);
    this.verificationDate = new Date(partialEntity.verificationDate);
    this.locatedBy = partialEntity.locatedBy;
    this.ceramicsDetails = partialEntity.ceramicsDetails;
    this.ceramics = Boolean(partialEntity.ceramics);
    this.buildMaterialComments = partialEntity.buildMaterialComments;
    this.artefactsComments = partialEntity.artefactsComments;
    this.looted = Boolean(partialEntity.looted);
    this.cultivated = Boolean(partialEntity.cultivated);
    this.cleared = Boolean(partialEntity.cleared);
    this.threatened = Boolean(partialEntity.threatened);
    this.databasingComments = partialEntity.databasingComments;
    this.creationDate = new Date(partialEntity.creationDate);
    this.modificationDate = new Date(partialEntity.modificationDate);
    this.userCreation = partialEntity.userCreation;
    this.userModification = partialEntity.userModification;
    this.featureType = partialEntity.featureType;
    this.studyArea = partialEntity.studyArea;
  }

  get siteId(): number {
    return this._siteId;
  }
}
