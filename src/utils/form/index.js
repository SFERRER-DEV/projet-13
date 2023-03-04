/**
 * Marquer un champ en erreur et afficher son message d'erreur de validation
 * @param {HTMLInputElement} field
 * @param {string} message
 */
export const updateMessageValidation = (field, message) => {
  /** @type {HTMLDivElement} */
  const formData = field.parentNode;
  if (formData.classList.contains('formData')) {
    formData.setAttribute('data-error', message);
    formData.setAttribute('data-error-visible', true);
  }
};
/**
 * Remise à blanc des erreurs de validation d'un champ
 * @param {HTMLInputElement} field
 */
const resetValidation = (field) => {
  /** @type {HTMLDivElement} */
  const formData = field.parentNode;
  if (formData.classList.contains('formData')) {
    formData.setAttribute('data-error', '');
    formData.setAttribute('data-error-visible', false);
    field.setCustomValidity('');
  }
};
/**
 * Tester si un champ de formulaire a des erreurs de validation
 * @param {HTMLInputElement} field
 * @returns {boolean} Ce champ est-il validé ?
 */
const validateField = (field) => {
  /**
   * @type {Object}
   * @description Les états de validité de toutes les contraintes d'un champ de formulaire
   */
  const validityState = field.validity;
  resetValidation(field);
  if (!validityState.valid) {
    updateMessageValidation(field, field.validationMessage);
  }
  return validityState.valid;
};
/**
 * Tester tous les champs du formulaire à valider
 */
const checkValidity = () => {
  /**
   * @type {boolean}
   * @description Est-ce que le formulaire et tous ses champs sont valides ?
   */
  let ok = true;
  /**
   * @type {NodeListOf<HTMLInputElement>}
   * @description Tous les champs de formulaire qui sont à valider
   */
  const fields = document.querySelectorAll(
    '.formData input[type="email"], .formData input[type="password"], .formData input[type="checkbox"],  .formData input[type="text"]'
  );
  // parcourir les élements du formulaire à valider
  for (let input of fields) {
    ok &= validateField(input);
  }
  return ok;
};

export default checkValidity;
