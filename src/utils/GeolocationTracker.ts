import { Feature, Map } from 'ol';
import Geolocation from 'ol/Geolocation.js';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

export class GeolocationTracker {
  private map: Map;
  private geolocation: Geolocation;
  private accuracyFeature: Feature;
  private positionFeature: Feature;

  constructor(map: Map) {
    this.map = map;

    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      tracking: true,
      projection: map.getView().getProjection(),
    });

    this.accuracyFeature = new Feature();
    this.positionFeature = new Feature();

    this.trackError();
    this.trackAccuracy();
    this.trackPosition();
    this.addGeometries();
  }

  /**
   * Location error tracker
   */
  private trackError(): void {
    this.geolocation.on('error', (error) => {
      console.error(`Location problem: ${error.message}`);
    });
  }

  /**
   * Track accuracy change
   */
  private trackAccuracy(): void {
    this.geolocation.on('change:accuracyGeometry', () => {
      this.accuracyFeature.setGeometry(
        this.geolocation.getAccuracyGeometry() ?? undefined
      );
    });
  }

  /**
   * Track position change
   */
  private trackPosition(): void {
    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation.getPosition();
      this.positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : undefined
      );
    });
  }

  /**
   * Add position and accuracy to the map
   */
  private addGeometries(): void {
    new VectorLayer({
      map: this.map,
      source: new VectorSource({
        features: [this.accuracyFeature, this.positionFeature],
      }),
    });

    this.positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
  }
}
