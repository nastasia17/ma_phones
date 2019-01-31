import Component from "../../component.js";

export default class PhoneCatalog extends Component {
  constructor({
                element,
                phones = [],
              }) {
    super({element});

    this._phones = phones;
    this._render();

    this.on('click', 'details-link', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', 'add-button', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phone-added', phoneElement.dataset.phoneId);
    });
  }

  _render() {
    this._element.innerHTML = `
        <ul class="phones">
        ${this._phones.map(phone => `

               <li 
                class="thumbnail" 
                data-element="phone" 
                data-phone-id="${phone.id}"
                >
                    <a 
                    href="#!/phones/${phone.id}" 
                    class="thumb" 
                    data-element="details-link"
                    >
                        <img 
                        alt="${phone.name}" 
                        src="${phone.imageUrl}"
                        >
                    </a>

                    <div class="phones__btn-buy-wrapper">
                        <button 
                        data-element="add-button"
                        class="btn btn-success">
                            Add
                        </button>
                    </div>

                    <a 
                    data-element="details-link"
                    href="#!/phones/motorola-xoom-with-wi-fi" 
                    >
                       ${phone.name}
                    </a> 
                    <p>${phone.snippet}</p>
                </li>
        `).join('')}
            </ul>
        `;
  }
}