/**
 * Validate input
 * @param {event.target.value} props.event
 * @param {str} props.type
 */

const InputValidatorHelper = (event, type) => {
  var regex = type === 'text' ? /^[a-zA-Z ]*$/ : /[0-9]|\./;
  var theEvent = event || window.event;
  var key;
  // Handle paste
  if (theEvent.type === "paste") {
    key = event.clipboardData.getData("text/plain");
  } else {
    // Handle key press
    key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};

export default InputValidatorHelper;

