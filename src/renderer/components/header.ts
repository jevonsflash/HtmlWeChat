const ipcRenderer = require("electron").ipcRenderer;

import Vue from "vue";

export default Vue.extend({
  watch: {
    showMore: function (newshowMore, oldshowMore) {
      if (newshowMore) {
        ipcRenderer.send("expand_main_window");
      } else {
        ipcRenderer.send("shrink_main_window");
      }
    },
  },
  data() {
    return {
      showMore: false,
    };
  },

  methods: {
   
    minus() {
      ipcRenderer.send("window-min");
    },
    cross() {
      this.$store.commit("close");
    },
    
  },
});
