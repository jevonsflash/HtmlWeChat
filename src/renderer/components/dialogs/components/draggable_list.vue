<template>
  <div class="draggableList">
    <div :style="{ width: list2width }" class="draggableList-list">
      <div class="search">
        <i class="el-icon-search" />
        <span>搜索</span>
      </div>
      <el-scrollbar style="height: 400px">
        <draggable :list="list2" group="article" class="dragArea">
          <div
            v-for="contact in list2"
            :key="contact.name"
            class="list-complete-item"
          >
            <div
              @click="changeContact(contact, 'contact')"
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: nowContact && nowContact.name == contact.name,
                item: true,
              }"
            >
              <img :src="contact.avatar" />
              <div class="meta">
                <div class="top">
                  <span class="name">{{ contact.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </draggable></el-scrollbar
      >
    </div>
    <div :style="{ width: list1width }" class="draggableList-list">
      <h4>请拖动需要添加的联系人</h4>
      <el-scrollbar style="height: 400px">
        <draggable :list="list1" group="article" class="dragArea">
          <div
            v-for="contact in list1"
            :key="contact.name"
            class="list-complete-item"
          >
            <div
              @click="changeContact(contact, 'contact')"
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: nowContact && nowContact.name == contact.name,
                item: true,
              }"
            >
              <img :src="contact.avatar" />
              <div class="meta">
                <div class="top">
                  <span class="name">{{ contact.name }}</span>
                </div>
              </div>
            </div>
            <div style="position: absolute; right: 0px">
              <span
                style="float: right; margin-top: -20px; margin-right: 5px"
                @click="deleteEle(contact)"
              >
                <i style="color: #ff4949" class="el-icon-delete" />
              </span>
            </div>
          </div> </draggable
      ></el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Draggable from "vuedraggable";

export default Vue.extend({
  name: "DraggableList",
  components: {
    Draggable,
  },

  props: ["list1", "list2", "list1Title", "list2Title"],
  data() {
    return {
      nowContact: undefined,

      list1width: "48%",
      list2width: "48%",
    };
  },
  methods: {
    isNotInList1(v) {
      return this.list1.every((k) => v.id !== k.id);
    },

    isNotInList2(v) {
      return this.list2.every((k) => v.id !== k.id);
    },

    deleteEle(ele) {
      for (const item of this.list1) {
        if (item.id === ele.id) {
          const index = this.list1.indexOf(item);
          this.list1.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList2(ele)) {
        this.list2.unshift(ele);
      }
    },

    pushEle(ele) {
      for (const item of this.list2) {
        if (item.id === ele.id) {
          const index = this.list2.indexOf(item);
          this.list2.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList1(ele)) {
        this.list1.push(ele);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.search {
  height: 25px;
  width: 190px;
  margin-right: 10px;
  background-color: #dbd9d8;
  display: flex;
  align-items: center;
  border-radius: 5px;
  i {
    font-size: 12px;
    margin: 0 5px;
  }
  .icon-sreach {
    margin: 0 8px;
  }
  span {
    font-size: 13px;
    color: #6c6a6a;
  }
}
.draggableList {
  background: #fff;
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  .draggableList-list {
    float: left;
    padding-bottom: 30px;

    &:first-of-type {
      margin-right: 2%;
    }

    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
}

.item {
  padding: 13px;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    margin-right: 13px;
  }
  .meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .last_msg {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 4px;
      font-size: 12px;
      width: 160px;
      color: #6c6a6a;
    }
  }
}
.item:hover:not(.active) {
  background-color: #dfdcdb;
}
.active {
  background-color: #c6c5c5;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
