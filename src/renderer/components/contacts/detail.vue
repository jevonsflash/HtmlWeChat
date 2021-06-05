<template>
  <div id="list">
    <header>
      <div class="search">
        <span class="icon-sreach"></span>
        <span>搜索</span>
      </div>
      <div class="add" @click="addChat">
        <span class="icon-add"></span>
      </div>
    </header>

    <div class="page">
      <div class="page__hd">
        <h1 class="page__title">List</h1>
        <p class="page__desc">列表</p>
      </div>
      <div class="page__bd">
        <div class="weui-cells__title">带说明的列表项</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>标题文字</p>
            </div>
            <div class="weui-cell__ft">说明文字</div>
          </div>
          <div class="weui-cell weui-cell_swiped">
            <div class="weui-cell__bd" style="transform: translateX(-68px)">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <p>标题文字</p>
                </div>
                <div class="weui-cell__ft">说明文字</div>
              </div>
            </div>
            <div class="weui-cell__ft">
              <a class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:"
                >删除</a
              >
            </div>
          </div>
        </div>

        <div class="weui-cells__title">带图标、说明的列表项</div>
        <div class="weui-cells">
          <div class="weui-cell weui-cell_example">
            <div class="weui-cell__hd">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                alt=""
                style="width: 20px; margin-right: 16px; display: block"
              />
            </div>
            <div class="weui-cell__bd">
              <p>标题文字</p>
            </div>
            <div class="weui-cell__ft">说明文字</div>
          </div>
          <div class="weui-cell weui-cell_example">
            <div class="weui-cell__hd">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                alt=""
                style="width: 20px; margin-right: 16px; display: block"
              />
            </div>
            <div class="weui-cell__bd">
              <p>标题文字</p>
            </div>
            <div class="weui-cell__ft">说明文字</div>
          </div>
        </div>

        <div class="weui-cells__title">带跳转的列表项</div>
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:">
            <div class="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:">
            <div class="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
        </div>

        <div class="weui-cells__title">带说明、跳转的列表项</div>
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:">
            <div class="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div class="weui-cell__ft">说明文字</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:">
            <div class="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div class="weui-cell__ft">说明文字</div>
          </a>
        </div>

        <div class="weui-cells__title">带图标、说明、跳转的列表项</div>
        <div class="weui-cells">
          <a
            class="weui-cell weui-cell_access weui-cell_example"
            href="javascript:"
          >
            <div class="weui-cell__hd">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                alt=""
                style="width: 20px; margin-right: 16px; display: block"
              />
            </div>
            <div class="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div class="weui-cell__ft">说明文字</div>
          </a>
          <a
            class="weui-cell weui-cell_access weui-cell_example"
            href="javascript:"
          >
            <div class="weui-cell__hd">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                alt=""
                style="width: 20px; margin-right: 16px; display: block"
              />
            </div>
            <div class="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div class="weui-cell__ft">说明文字</div>
          </a>
        </div>
      </div>
    </div>

    >
  </div>
</template>
<script lang='ts'>
import EventEmitter from "eventemitter3";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";

export default Vue.extend({
  computed: {
    ...mapGetters(["chats", "nowChat"]),
  },
  data() {
    return {
      add_chat_event: null,
      visible: false,
    };
  },
  created() {
    this.add_chat_event = new EventEmitter();
  },
  methods: {
    ...mapMutations(["changeChat"]),

    addChat() {
      this.add_chat_event.emit("open");
    },
    rowDialogClose() {
      this.visible = false;
    },

    onOpen() {
      this.visible = true;
    },
  },
});
</script>
