<template>
  <v-container class="mycontainer">
    <el-form :inline="true">
      <el-form-item>
        <label
          class="el-button el-button--primary el-button--small"
          for="image_uploads"
          >{{ text }}</label
        >
        <input
          id="image_uploads"
          type="file"
          name="image_uploads"
          accept=".csv"
          @change="uploadCSV"
        />
      </el-form-item>
      <el-form-item label="时间范围选择">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
        <div
          class="el-button el-button--primary el-button--small"
          @click="onSubmit"
        >
          查询
        </div>
      </el-form-item>
    </el-form>
    <div class="tableFixHead">
      <table>
        <thead>
          <tr>
            <th class="headerTh">#</th>
            <th v-for="(thItem, i) in tableHeadData" :key="i">{{ thItem }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in tableData" :key="i">
            <th class="headerTh">{{ i }}</th>
            <td v-for="(tdItem, tdi) in item" :key="tdi">{{ tdItem }}</td>
          </tr>
        </tbody>
        <tfoot class="myfoot">
          <tr>
            <th scope="row">Totals</th>
            <td>21,000</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </v-container>
</template>

<script>
import { readCSV } from "../utils";
export default {
  name: "DataAnalyze",

  data: () => ({
    text: "请选择数据文件(csv)",
    fileList: [],
    tableHeight: 250,
    value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    CSVData: [],
    tableHeadData: [
      "day",
      "time",
      "WorkMode",
      "Bargraph",
      "GenModeFrequency",
      "SensitivityLevel",
      "MeasurementType",
      "Depth",
      "SwingWarning",
      "Overload",
      "BladeAngleSign",
      "BladeAngle",
      "PaddleAngleSign",
      "PaddleAngle",
      "SelfTest",
      "CurLat",
      "N_SIndicator",
      "CurLong",
      "E_W_Indicator",
      "AlarmZoneDepth",
      "AlarmZoneActive",
    ],
    tableData: [
      {
        day: "2020-13-32",
        time: "20-13-32",
        WorkMode: 1, // 模式(0-40)
        Bargraph: 1, // 条形图(0-40)
        GenModeFrequency: 1, // 模式频率(1/2/3/4/5)
        SensitivityLevel: 1, // 灵敏度等级(增益)
        MeasurementType: 1, // 测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, // 摆动警告(暂无)
        Overload: 1, // 过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
      {
        day: "2020-13-32",
        time: "20-13-32",
        mode: 1, //条形图(0-40)
        Bargraph: 1, //条形图(0-40)
        SensitivityLevel: 1, //灵敏度等级(增益)
        MeasurementType: 1, //测量类型(待定)
        Depth: 1, //深度
        SwingWarning: 1, //摆动警告(暂无)
        Overload: 1, //过载(暂无)
        BladeAngleSign: 1, //B叶片角度 标志(待定)
        BladeAngle: 1, //叶片角度
        PaddleAngleSign: 1, //P叶片角度 标志
        PaddleAngle: 1, //叶片角度
        SelfTest: 1, //自检(P/G？待定)
        CurLat: 1, //纬度
        N_SIndicator: 1, //n/s指示器
        CurLong: 1, //经度
        E_W_Indicator: 1, //e/w指示器
        AlarmZoneDepth: 1, //报警区深度(待定)
        AlarmZoneActive: 1, //报警区激活(待定)
      },
    ],
  }),
  mounted() {
    const input = document.querySelector("input");
    input.addEventListener("change", this.upload);
  },

  methods: {
    uploadCSV() {
      const input = document.querySelector("input");

      const curFiles = input.files;
      if (curFiles.length === 0) {
        this.text = "请选择数据文件(csv)";
      } else {
        for (const file of curFiles) {
          this.text = file.name;
        }
        readCSV(input, (data) => {
          this.tableHeadData = data[0];
          this.tableData = Object.freeze(data);
        });
      }
    },
    onSubmit() {
      console.log("onSubmit");
    },
  },
};
</script>

<style lang="scss" scoped>
.mycontainer {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  .myrow {
    flex: 0;
  }
  .table-wrap {
    flex: 1;
  }
}
#image_uploads {
  display: none;
}
.tableFixHead {
  overflow-y: auto;
  height: 500px;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 51;
}
.myfoot {
  position: sticky;
  bottom: 0;
  z-index: 51;
  background: #eee;
}
.headerTh {
  left: 0;
  position: sticky;
  z-index: 50;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px 16px;
  border: 1px solid #ccc;
}
th {
  background: #eee;
}
</style>
  