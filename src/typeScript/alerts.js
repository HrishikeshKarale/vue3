export const alerts = {
  data() {
    const warning = "";
    const danger = "";
    return {
      warning,
      danger
    };
  }, //data

  emits: ["notify"], //emits

  computed: {
    alertObject: function() {
      return { error: this.danger, warning: this.warning };
    }
  }, //computed

  methods: {
    //use by form elements sent via slot
    alerts: function(type, message) {
      // console.log(message);
      if (type == "warning") {
        this.warning = message;
        this.$emit("notify", "warning", message);
      } else if (type == "error") {
        this.danger = message;
        this.$emit("notify", "error", message);
      } else {
        alert("error in input alert module");
      }
    } //alerts
  } //methods
};
