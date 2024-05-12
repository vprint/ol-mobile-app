import { defineStore } from 'pinia';
import { IWidgetName, Widget } from 'src/model/widget';
import { computed, ref } from 'vue';

// export const useComponentStore = defineStore('component', {
//   state: () => ({
//     _widget: new Widget(),
//   }),
//   getters: {
//     widget: (state) => state._widget,
//   },
//   actions: {
//     /**
//      * Menage widget visibility
//      * @param visibility Widget visibility
//      * @param widgetName Name of the widget to display
//      */
//     setWidget(visibility: boolean, widgetName: IWidgetName): void {
//       this._widget.visibility = visibility;
//       this._widget.widgetName = widgetName;
//     },
//   },
// });

export const useComponentStore = defineStore('component', () => {
  const _widget = ref(new Widget());
  const widget = computed(() => _widget.value);

  /**
   * Menage widget visibility
   * @param visibility Widget visibility
   * @param widgetName Name of the widget to display
   */
  function setWidget(visibility: boolean, widgetName: IWidgetName): void {
    _widget.value.visibility = visibility;
    _widget.value.widgetName = widgetName;
  }

  return { widget, setWidget };
});
