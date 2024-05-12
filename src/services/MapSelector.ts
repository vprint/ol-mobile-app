import { Platform } from 'quasar';
import { Map } from 'ol';
import BaseLayer from 'ol/layer/Base';
import VectorTileLayer from 'ol/layer/VectorTile';
import { useSiteStore } from 'src/stores/site-store';
import { Pixel } from 'ol/pixel';

const { fetchAndSetSite } = useSiteStore();

/**
 * Create a selector over the site site layer
 */
export class MapSelector {
  private map: Map;
  private siteLayer: VectorTileLayer;

  constructor(map: Map, platform: Platform) {
    this.map = map;
    this.siteLayer = this.map
      .getAllLayers()
      .find(
        (layer: BaseLayer) => layer.get('name') === 'sites'
      ) as VectorTileLayer;

    if (platform.is.mobile) {
      this.mobileSelection();
    }
    if (platform.is.desktop) {
      this.desktopSelection();
    }
  }

  /**
   * Initiate mobile selector
   */
  private async mobileSelection(): Promise<void> {
    this.map.getTargetElement().oncontextmenu = async (
      e: MouseEvent
    ): Promise<void> => {
      e.preventDefault();
      const pixel = this.map.getEventPixel(e);
      const featureId = await this.getSiteFeatureId(pixel);

      if (featureId) {
        fetchAndSetSite(featureId);
      }
    };
  }

  /**
   * Initiate desktop selector
   */
  private async desktopSelection(): Promise<void> {
    this.map.on('click', async (e) => {
      const featureId = await this.getSiteFeatureId(e.pixel);

      if (featureId) {
        fetchAndSetSite(featureId);
      }
    });
  }

  /**
   * Get site feature id at pixel
   * @param e Event
   * @returns Feature id
   */
  private getSiteFeatureId(pixel: Pixel): Promise<number | undefined> {
    const feature = this.siteLayer
      .getFeatures(pixel)
      .then(function (features): number | undefined {
        if (!features.length) {
          return;
        }

        const feature = features[0] ? features[0] : undefined;

        if (!feature) {
          return;
        }

        return feature.get('site_id');
      });
    return feature;
  }
}
