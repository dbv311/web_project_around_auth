export default class Section {
  constructor({ items, renderer }, templateSelector) {
    this._items = items;
    this._renderer = renderer;
    this._templateSelector = document.querySelector(templateSelector);
  }
  renderer() {
    this._items.forEach((item) => {
      const node = this._renderer(item);

      this.addItem(node);
    });
  }
  addItem(element) {
    this._templateSelector.append(element);
  }
}
