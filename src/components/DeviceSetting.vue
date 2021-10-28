<template>
  <v-container class="mycontainer">
    <v-row>
      <v-col cols="12" md="4">
        <v-select dense outlined v-model="serialId" :items="serialItems" label="串口" required ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select dense outlined v-model="BaudRate" :items="BaudRateItems" label="BaudRate" required ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select dense outlined v-model="Parity" :items="ParityItems" label="Parity" required ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field dense outlined type="number" v-model="DataBits" label="DataBits" required ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field  dense type="number" outlined v-model="StopBits" label="StopBits" required ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="secondary" block elevation="3" >连接设备串口</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="ParmamStr" dense label="设置命令"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn block rounded color="green">发送命令</v-btn>
      </v-col>
    </v-row>
    <h3>设置命令</h3>
    <sub>(点击复制命令)</sub>
    <v-chip-group column>
      <v-chip color="orange" @click="copyParamStr('[{RD-HW-VER}]')">读取硬件信息</v-chip>
      <v-chip color="orange" @click="copyParamStr('[{RD-FW-VER}]')">PC读取固件信息</v-chip>
      <v-chip @click="copyParamStr('[{WR-HW-LCD_LCD硬件版本号}]')"
        >设置LCD硬件版本号: "[{WR-HW-LCD_LCD硬件版本号}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-FW-DSP_DSP软件版本号}]')"
        >设置DSP软件版本号: "[{WR-FW-DSP_DSP软件版本号}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-FW-LCD_LCD软件版本号}]')"
        >设置LCD软件版本号: "[{WR-FW-LCD_LCD软件版本号}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-HW-DSP_DSP版本号}]')"
        >设置硬件DSP版本号: "[{WR-HW-DSP_DSP版本号}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-HW-CAP_采集板版本号}]')"
        >设置硬件采集板版本号: "[{WR-HW-CAP_采集板版本号}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-BATTERY-VER_电池型号}]')"
        >设置电池型号: "[{WR-BATTERY-VER_电池型号}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-DIST-FACTOR_K1,K2,K3,K4}]')"
        >设置距离补偿系数: "[{WR-DIST-FACTOR_K1,K2,K3,K4}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-SHIP-DATA_年-月-日}]')"
        >设置出厂日期: "[{WR-SHIP-DATA_年-月-日}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAIN50_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAIN50_增益初始值}]"//50HZ</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAIN50_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAIN50_增益初始值}]"//50HZ</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAIN512_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAIN512_增益初始值}]"//512HZ</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAIN640_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAIN640_增益初始值}]"//640HZ</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAIN8K_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAIN8K_增益初始值}]"//8KHZ</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAIN33K_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAIN33K_增益初始值}]"//33KHZ</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAIN131K_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAIN131K_增益初始值}]"//131KHZ</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-GAINCF_增益初始值}]')"
        >设置频率的增益初始值: "[{WR-GAINCF_增益初始值}]"// CF</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-SET-DATE_年-月-日}]')"
        >设置校正日期命令: "[{WR-SET-DATE_年-月-日}]"</v-chip
      >
      <v-chip @click="copyParamStr('[{WR-SET-DATE_时-分-秒}}]')"
        >设置校正日期命令: "[{WR-SET-DATE_时-分-秒}}]"</v-chip
      >
    </v-chip-group>
    <!-- <v-snackbar :timeout="1000" v-model="snackbar"> 命令复制成功 </v-snackbar> -->
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    snackbar: false,
    serialItems: ["COM1", "COM2", "COM3"],
    serialId: "",
    BaudRateItems: [9600, 19200, 38400, 115200],
    DataBits: 8,
    StopBits: 1,
    BaudRate: 115200,
    ParityItems: [
      // NoParity disable parity control (default)
      "NoParity", //Parity = iota,
      // OddParity enable odd-parity check
      "OddParity",
      // EvenParity enable even-parity check
      "EvenParity",
      // MarkParity enable mark-parity (always 1) check
      "MarkParity",
      // SpaceParity enable space-parity (always 0) check
      "SpaceParity",
    ],
    Parity: "NoParity",
    ParmamStr: "",
  }),
  methods: {
    copyParamStr(ParmamStr) {
      navigator.clipboard.writeText(ParmamStr);
      this.ParmamStr = ParmamStr;
      // this.snackbar = true;
    },
  },
};
</script>
