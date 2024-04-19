import { defineStore } from 'pinia';
import { Widget } from 'src/model/widget';

export const useComponentStore = defineStore('component', {
  state: () => ({
    _widget: new Widget(),
  }),
  getters: {
    widget: (state) => state._widget,
  },
  actions: {
    /**
     * set widget visibility
     */
    changeVisibility(): void {
      this._widget.visibility = !this._widget.visibility;
    },
  },
});
