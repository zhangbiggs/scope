<template>
  <v-container class="mycontainer">
    <v-select :items="items" label="语言选择"></v-select>
    <v-text-field label="保存路径" filled v-model="savePath"></v-text-field>
    <v-btn block >版本日志</v-btn>
    <v-divider></v-divider>
    <v-btn block>检查更新</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "SoftSupport",

  data: () => ({
    items: ["简体中文", "English", "繁體中文"],
    savePath:"./savePath",
  }),
};
</script>
