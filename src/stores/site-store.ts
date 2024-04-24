import { defineStore } from 'pinia';
import { Site } from 'src/model/site';

export const useComponentStore = defineStore('sites', {
  state: () => ({
    _site: new Site({}),
  }),
  getters: {
    site: (state) => state._site,
  },
  actions: {},
});
