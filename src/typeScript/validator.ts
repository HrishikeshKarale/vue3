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
    if (props.minlength) {
      let msg = "";
      if (props.minlength > dValue.value.length) {
        msg = "Invalid Input: Allowed minlength for input is " +
          props.minlength +
          " characters.";
      }
      emit("notify", "warning", msg);
      return msg;
    }
    return false;
  }; //isTooShort

  const isTooLong = () => {
    if (props.maxlength) {
      let msg = "";
      if (props.maxlength < dValue.value.length) {
        msg = "Invalid Input: Allowed maxlength for input exceeded by " +
          (props.maxlength.length - dValue.value.length) +
          " characters.";
      }
      emit("notify", "warning", msg);
      return msg;
    }
    return false;
  }; //isTooLong

  //pattern matching
  const followsPattern = () => {
    if (props.pattern) {
      let msg = "";
      if (!props.pattern.test(dValue.value)) {
        msg = "Wrong email format: Please follow the pattern " + props.pattern;
      }
      emit("notify", "warning", msg);
      return msg;
    }
    return false;
  }; //followsPattern

  const validate = function () {
    //if value for val(temp) exists check for warning triggers
    if (dValue.value) {

      //if any of the check fails then an error message is emited as notify and 
      if (isTooShort()) {
        //automatically notifies the parent component/host about the error
      } else if (isTooLong()) {
        //automatically notifies the parent component/host about the error
      } else {
        //emit/send new values to parent component v-model attribute
        emit("value", dValue.value);
        emit("notify", "danger", "");
      }
    }
    //if a value for val(temp) does not exists  and is required, thentrigger error and set error message
    else {
      emit("notify", "danger", isRequired());
    }
  }; //validator
  return { validate, followsPattern };
};
