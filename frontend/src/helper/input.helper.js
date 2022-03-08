/**
 * @param {Event} event
 */
function numberOnly (event) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};


/**
 * @param {Event} event
 */
function textOnly (event) {
  if (!/^[a-zA-Z]+$/.test(event.key)) {
    event.preventDefault();
  }
};

const InputHelper = {
  numberOnly,
  textOnly
}

export default InputHelper;
