/**
 * @param {event.target.value} props.event
 * @param {str} props.type
 * Validate input
 */

const numberOnly = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

const textOnly = (event) => {
  if (!/^[a-zA-Z]+$/.test(event.key)) {
    event.preventDefault();
  }
};

const InputValidatorHelper = {
  numberOnly,
  textOnly
}

export default InputValidatorHelper;

