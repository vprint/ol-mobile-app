export type IWidgetName = 'layer-manager' | 'site-manager' | '';

export class Widget {
  private _visibility: boolean;
  private _widgetName: IWidgetName;

  constructor() {
    this._visibility = false;
    this._widgetName = '';
  }

  get visibility(): boolean {
    return this._visibility;
  }

  set visibility(value: boolean) {
    this._visibility = value;
  }

  get widgetName(): IWidgetName {
    return this._widgetName;
  }

  set widgetName(value: IWidgetName) {
    this._widgetName = value;
  }
}
