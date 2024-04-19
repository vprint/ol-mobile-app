export class Widget {
  private _visibility: boolean;
  private _element: string;

  constructor() {
    this._visibility = false;
    this._element = '';
  }

  get visibility(): boolean {
    return this._visibility;
  }

  set visibility(value: boolean) {
    this._visibility = value;
  }

  get element(): string {
    return this._element;
  }

  set element(value: string) {
    this._element = value;
  }
}
