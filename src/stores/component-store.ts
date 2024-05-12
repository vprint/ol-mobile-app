import { defineStore } from 'pinia';
import { IWidgetName, Widget } from 'src/model/widget';
import { ref } from 'vue';

export const useComponentStore = defineStore('component', () => {
  const widget = ref(new Widget());

  /**
   * Menage widget visibility
   * @param visibility Widget visibility
   * @param widgetName Name of the widget to display
   */
  function setWidget(visibility: boolean, widgetName: IWidgetName): void {
    widget.value.visibility = visibility;
    widget.value.widgetName = widgetName;
  }

  return { widget, setWidget };
});
