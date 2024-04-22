export class Site {
  private site_id!: number;
  public english_name!: string;
  public french_name!: string;
  public khmer_name!: string;
  public alternative_name!: string;
  public alternative_khmer_name!: string;
  public description!: string;
  public ik_id!: number;
  public mh_id!: number;
  public verified!: boolean;
  public verification_date!: Date;
  public located_by!: number;
  public ceramics_details!: string;
  public ceramics!: boolean;
  public build_material_comments!: string;
  public artefacts_comments!: string;
  public looted!: boolean;
  public cultivated!: boolean;
  public cleared!: boolean;
  public threatened!: boolean;
  public databasing_comments!: string;
  public creation_date!: Date;
  public modification_date!: Date;
  public user_creation!: string;
  public user_modification!: string;
  public feature_type_id!: number;
  public study_area!: string;

  constructor(partialEntity: Partial<Site>) {
    Object.assign(this, partialEntity);
  }
}
