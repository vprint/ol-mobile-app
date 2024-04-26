import { defineStore } from 'pinia';
import { IWidgetName, Widget } from 'src/model/widget';

export const useComponentStore = defineStore('component', {
  state: () => ({
    _widget: new Widget(),
  }),
  getters: {
    widget: (state) => state._widget,
  },
  actions: {
    /**
     * Menage widget visibility
     * @param visibility Widget visibility
     * @param widgetName Name of the widget to display
     */
    setWidget(visibility: boolean, widgetName: IWidgetName): void {
      this._widget.visibility = visibility;
      this._widget.widgetName = widgetName;
    },
  },
});
