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
              <!-- <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content> -->
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              <!-- </v-list-item-content> -->
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
// import { throttle } from "./utils";

export default {
  name: "HelloWorld",
  components: {
    MyHeader,
  },
  data: () => ({
    items: [
      { title: "Device Setting", icon: "mdi-devices", name: "DeviceSetting" },
      { title: "Data Analyze ", icon: "mdi-dna", name: "DataAnalyze" },
      {
        title: "Soft Support ",
        icon: "mdi-vector-square",
        name: "SoftSupport",
      },
    ],
  }),
  mounted() {
    this.$router.push({ name: "DeviceSetting" });
  },
  methods: {
    goPage(item) {
      this.$router.push({ name: item.name });
    },
  },
};
</script>

<style scoped>
/* .mycontainer {
  display: flex;
  flex-direction: row;
} */
.active {
}
</style>