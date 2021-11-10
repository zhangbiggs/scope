<template>
  <v-app-bar app :color="color" class="myheader">
    <div class="logo">
      <sub class="version">CScope tookit(v1.0.0)</sub>
      <h2 class="title">潜龙接收机</h2>
    </div>
    <div class="device">
      <p><span>硬件信息:</span>{{ rd_fw_ver }}</p>
      <p><span>固件信息:</span>{{ rd_hw_ver }}</p>
    </div>
  </v-app-bar>
</template>

<script>
import EventBus from "../eventbus";

export default {
  name: "Header",

  data: () => ({
    color: "grey",
    rd_hw_ver: "",
    rd_fw_ver: "",
  }),
  mounted() {
    EventBus.$on("connect", (bool) => {
      // this.connected = bool;
      !bool ? (this.color = "grey") : (this.color = "green");
    });
    EventBus.$on("RD-HW-VER", (msg) => {
      this.rd_hw_ver = msg;
    });
    EventBus.$on("RD-FW-VER", (msg) => {
      this.rd_fw_ver = msg;
    });
  },
  methods: {
    sendCommand() {
      window.sendParam("[{RD-RECORD}]");
    },
  },
};
</script>

<style lang="scss" scoped>
.myheader {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  .logo {
    margin: 0 16px;
  }
  .device {
    flex: 1 0 400px;
    padding: 0 16px;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    text-overflow: hidden;
    p {
      margin: 0;
      white-space: nowrap;
    }
  }
  .upload {
    padding: 0 16px;
  }
}
</style>