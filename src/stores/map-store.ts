import { defineStore } from 'pinia';
import { Map } from 'ol';

export const useMapStore = defineStore('map', {
  state: () => ({
    _map: new Map(),
    _isInitialized: false,
  }),

  getters: {
    map: (state) => state._map,
    isInitialized: (state) => state._isInitialized,
  },

  actions: {
    /**
     * Set the store map
     * @param map OpenLayers map
     */
    setMap(map: Map): void {
      this._map = map;
      this._isInitialized = true;
    },
  },
});
