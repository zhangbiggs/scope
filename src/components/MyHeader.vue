<template>
  <v-app-bar app class="myheader">
    <div class="logo">
      <sub class="version">CScope tookit(v1.0.0)</sub>
      <h2 class="title">潜龙接收机</h2>
    </div>
    <div class="device">
      <p><span>硬件信息:</span>硬件DSP版本号,采集板版本号,LCD版本,电池版本号</p>
      <p><span>固件信息:</span>软件DSP版本号,LCD版本</p>
    </div>
    <div class="upload">
      <v-btn color="secondary" elevation="2" @click="sendCommand"
        >上传设备数据</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script>
// import EventBus from "../eventbus";

export default {
  name: "Header",

  data: () => ({}),
  // mounted() {
  //   EventBus.$on("message", (msg) => {
  //     // A发送来的消息
  //     console.log("EventBus message");
  //     console.log(msg);
  //     // this.msg = msg;
  //   });
  // },
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