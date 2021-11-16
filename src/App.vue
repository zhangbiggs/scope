<template>
  <v-app>
    <my-header />
    <v-main>
      <v-navigation-drawer
        class="deep-purple accent-4"
        dark
        permanent
        app
        width="150px"
      >
        <v-list active-class="active">
          <v-list-item-group>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="goPage(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
    <v-snackbar :timeout="1000" v-model="snackbar">
      {{ snackbar_text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import EventBus from "./eventbus";

export default {
  name: "APP",
  components: {
    MyHeader,
  },
  data: () => ({
    connected: false,
    snackbar: false,
    snackbar_text: "",
    items: [
      { title: "设备设置", icon: "mdi-devices", name: "DeviceSetting" },
      { title: "数据分析", icon: "mdi-dna", name: "DataAnalyze" },
      // { title: "软件支持", icon: "mdi-vector-square", name: "SoftSupport", },
    ],
  }),
  mounted() {
    EventBus.$on("connect", (bool) => {
      this.connected = bool;
      if (!bool) {
        EventBus.$emit("RD-HW-VER", null);
        EventBus.$emit("RD-FW-VER", null);
      }
    });
    EventBus.$on("message", (msg) => {
      this.snackbar = true;
      this.snackbar_text = msg;
    });
  },
  methods: {
    goPage(item) {
      this.$router.push({ name: item.name });
    },
  },
};
</script>

