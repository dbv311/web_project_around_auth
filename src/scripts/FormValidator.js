export default class FormValidator {
  constructor(formElement, formConfig) {
    this._formElement = formElement;
    this._formConfig = formConfig;
  }

  _setEventListeners(form, formConfig) {
    const formInputs = Array.from(
      form.querySelectorAll(formConfig.inputSelector)
    );
    const submitButton = form.querySelector(formConfig.submitButtonSelector);

    formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        const errorNode = form.querySelector(
          `.popup__error_type_${inputElement.name}`
        );
        if (!inputElement.validity.valid) {
          inputElement.classList.add(formConfig.inputErrorClass);
          errorNode.textContent = inputElement.validationMessage;
        } else {
          inputElement.classList.remove(formConfig.inputErrorClass);
          errorNode.textContent = "";
        }
        submitButton.disabled = !this._isValidInputs(formInputs);
      });
    });

    submitButton.disabled = !this._isValidInputs(formInputs);
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._formConfig);
  }

  _isValidInputs(formInputs) {
    return formInputs.every((item) => {
      return item.validity.valid;
    });
  }
}
