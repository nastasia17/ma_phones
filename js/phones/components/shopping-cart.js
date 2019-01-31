import Component from "../../component.js";

export default class ShoppingCart extends Component {
  constructor({element}) {
    super({element});

    this._itemsMap = {};

    this._render();

    this.on('click', 'remove', (event) => {
      let itemElement = event.target.closest('[data-element="item"]');

      this.remove(itemElement.dataset.itemId);
    });
  }

  add(itemId) {
    if (!this._itemsMap.hasOwnProperty(itemId)) {
      this._itemsMap[itemId] = 0;
    }

    this._itemsMap[itemId]++;

    this._render();
  }

  remove(itemId) {
    if (!this._itemsMap.hasOwnProperty(itemId)) {
      return;
    }

    this._itemsMap[itemId]--;

    if (this._itemsMap[itemId] === 0) {
      delete this._itemsMap[itemId];
    }

    this._render();
  }

  _render() {
    this._element.innerHTML = `
    <p>Shopping Cart</p>
       <ul>
        ${Object.keys(this._itemsMap).map(itemId => `
          
          <li data-element="item" data-item-id="${itemId}">
              ${itemId} (${this._itemsMap[itemId]})
              <button data-element="remove">-</button>
              </li>
        
        `).join('')}

       </ul>
    `;
  }
}