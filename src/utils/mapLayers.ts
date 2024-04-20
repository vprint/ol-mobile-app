import { Map } from 'ol';
import {
  BACKGROUND_LAYERS_SETTINGS,
  WMS_LAYERS_SETTINGS,
} from './params/layersSettings';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';
import ImageLayer from 'ol/layer/Image';
import { ImageWMS } from 'ol/source';
import { APP_SETTINGS } from './params/app';

/**
 * Add background layers to the map
 * @param map OpenLayers map
 */
export function addBackgroundLayers(map: Map): void {
  const backgroundLayers: TileLayer<XYZ>[] = [];

  BACKGROUND_LAYERS_SETTINGS.forEach((layer) => {
    backgroundLayers.push(
      new TileLayer({
        source: new XYZ({
          url: layer.token
            ? `${layer.url}access-token=${layer.token}`
            : `${layer.url}`,
          tilePixelRatio: 2,
          attributions: layer.attribution,
        }),
        zIndex: layer.zIndex,
        properties: {
          name: layer.name,
          id: layer.id,
          baseLayer: true,
        },
        visible: layer.visible,
      })
    );
  });

  map.addLayer(
    new LayerGroup({
      layers: backgroundLayers,
      properties: {
        title: 'Background',
      },
    })
  );
}

/**
 * Add WMS layers to the map
 * @param map OpenLayers map
 */
export function addWMSLayers(map: Map): void {
  const WMSLayers: ImageLayer<ImageWMS>[] = [];

  WMS_LAYERS_SETTINGS.forEach((layer) => {
    WMSLayers.push(
      new ImageLayer({
        source: new ImageWMS({
          url: `${APP_SETTINGS.qgis_server}/wms?`,
          params: {
            LAYERS: `${layer.id}`,
          },
          attributions: layer.attribution,
        }),
        properties: {
          id: `${layer.id}_wms`,
          name: layer.name,
          description: layer.description,
          editable: layer.editable,
          dynamic: layer.dynamic,
        },
        zIndex: layer.zIndex,
        visible: layer.visible,
      })
    );
  });

  map.addLayer(
    new LayerGroup({
      layers: WMSLayers,
      properties: {
        title: 'Raster',
      },
    })
  );
}
