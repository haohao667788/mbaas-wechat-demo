Component({
  properties: {
    text: String,
    onClickMe: null,
  },

  methods: {
    onClickMe() {
      this.triggerEvent("onAdd");
    },
  },
});
