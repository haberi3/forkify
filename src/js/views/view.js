"use strict";
import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data, result = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generateMarkup();

    if (!result) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];

      //Updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markUp = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  };

  renderError(message = this._errorMessage) {
    const markUp = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
}
