import { Map } from 'ol';
import { BACKGROUND_LAYERS_SETTINGS } from './params/layersSettings';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';

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
