export default function validator(props, emit, dValue) {

  //value ebsent
  const isRequired = function () {
    if (props.required) {
      return "Required field.";
    }
    return "";
  }; //isRequired

  //value present
  const isTooShort = function () {
    if (props.minlength > dValue.value.length) {
      return (
        "Invalid Input: Allowed minlength for input is " +
        props.minlength +
        " characters."
      );
    }
    return "";
  }; //isTooShort

  const isTooLong = () => {
    if (props.maxlength < dValue.value.length) {
      return (
        "Invalid Input: Allowed maxlength for input exceeded by " +
        (props.maxlength.length - dValue.value.length) +
        " characters."
      );
    }
    return "";
  }; //isTooLong

  //pattern matching
  const followsPattern = () => {
    if (!props.pattern.test(dValue.value)) {
      return "Wrong email format: Please follow the pattern " + props.pattern;
    }
    return "";
  }; //followsPattern

  const validate = function () {
    //if value for val(temp) exists check for warning triggers
    if (dValue.value) {
      //if a patters for acceptable value exists, then trigger warning and set warning message if val (temp) does not follow the patter
      if (props.pattern && followsPattern()) {
        emit("notify", 'warning', followsPattern());
      } else if (props.minlength && isTooShort()) {
        emit("notify", 'warning', isTooShort());
      } else if (props.maxlength && isTooLong()) {
        emit("notify", 'warning', isTooLong());
      } else {
        //emit/send new values to parent component v-model attribute
        console.log("value", dValue.value, isRequired());
        emit("notify", 'danger', "");
        emit("notify", 'warning', "");
        emit("value", dValue.value);
      }
    }
    //if a value for val(temp) does not exists  and is required, thentrigger error and set error message
    else {
      emit("notify", 'danger', isRequired());
    }
  }; //validator
  return { validate };
};
