<template>
  <div id="detail" v-if="msg != null">
    <contacts-header class="header" style="-webkit-app-region: drag">
    </contacts-header>
    <div class="main-frame">
      <span>
        <a class="weui-btn weui-btn_primary" @click="addContact">添加联系人</a>
      </span>
    </div>
    <dialog-add-contact :event="add_contact_event"></dialog-add-contact>
  </div>
</template>
<script lang='ts'>
import ContactsHeader from "@/components/contacts/contacts_header.vue";
import EventEmitter from "eventemitter3";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import DialogAddContact from "@/components/dialogs/add_contact.vue";

export default Vue.extend({
  components: {
    ContactsHeader,
    DialogAddContact,
  },
  props: ["msg"],
  created() {
    this.add_contact_event = new EventEmitter();
  },

  methods: {
    addContact() {
      this.add_contact_event.emit("open");
    },
  },
  data() {
    return {
      add_contact_event: null,

      size: 60,
    };
  },
});
</script>
<style lang="scss" scoped>
#detail {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  .header-title {
    text-align: left;
    font-size: 20px;
  }
  .header-desc {
    text-align: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
  .avatar {
    float: right;
  }
  .main-frame {
    width: 350px;
    margin: 30px auto 0 auto;
    background-color: #f5f5f5;
  }

  .header {
    height: 60px;
  }
  .title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
  }
}
</style>