import { Token } from './token';

export interface ILayer {
  name: string;
  id: string;
  attribution: string[];
  zIndex: number;
  visible: boolean;
}

export interface IBackgroundLayerType extends ILayer {
  url: string;
  img: string;
  token?: string;
}

export interface IRasterLayerType extends ILayer {
  description: string;
  editable: boolean;
  dynamic: boolean;
}

export const BACKGROUND_LAYERS_SETTINGS: IBackgroundLayerType[] = [
  {
    name: 'Basic',
    id: 'jawg-streets',
    url: 'https://tile.jawg.io/jawg-streets/{z}/{x}/{y}@2x.png?',
    img: 'https://tile.jawg.io/jawg-streets/13/6459/3787@2x.png?',
    attribution: [
      '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
    ],
    token: Token.jawgs,
    zIndex: 1,
    visible: false,
  },
  {
    name: 'Light',
    id: 'jawg-light',
    url: 'https://tile.jawg.io/jawg-light/{z}/{x}/{y}@2x.png?',
    img: 'https://tile.jawg.io/jawg-light/13/6459/3787@2x.png?',
    attribution: [
      '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
    ],
    token: Token.jawgs,
    zIndex: 1,
    visible: false,
  },
  {
    name: 'Dark',
    id: 'jawg-dark',
    url: 'https://tile.jawg.io/jawg-dark/{z}/{x}/{y}@2x.png?',
    img: 'https://tile.jawg.io/jawg-dark/13/6459/3787@2x.png?',
    attribution: [
      '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
    ],
    token: Token.jawgs,
    zIndex: 1,
    visible: false,
  },
  {
    name: 'OSM',
    id: 'osm',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png?',
    img: 'https://tile.openstreetmap.org/13/6459/3787.png?',
    attribution: [
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ],
    zIndex: 1,
    visible: false,
  },
  {
    name: 'Esri World Imagery',
    id: 'esri_world_Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    img: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/13/6459/3787',
    attribution: [
      'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
    ],
    zIndex: 1,
    visible: true,
  },
];

export const WMS_LAYERS_SETTINGS: IRasterLayerType[] = [
  {
    zIndex: 2,
    id: 'DEM',
    name: 'Elevation',
    description:
      "Couche d'élévation obtenue à partir d'une interpolation des données LiDAR",
    attribution: ['Données LiDAR | <b>EFEO</b>'],
    visible: true,
    editable: true,
    dynamic: true,
  },
  {
    zIndex: 3,
    id: 'SVF',
    name: 'Sky-View-Factor',
    description:
      'Le Sky-View-Factor est une méthode de visualisation des données altimétrique appréciée des archéologue. Elle permet de visualiser les zones enclavées dans des teintes sombres et les zones surélevées dans des teintes claires',
    attribution: ['Données LiDAR | <b>EFEO</b>'],
    visible: false,
    editable: true,
    dynamic: false,
  },
];
