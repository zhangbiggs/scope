<template>
  <v-container class="mycontainer">
    <el-form :inline="true">
      <el-form-item>
        <label
          class="el-button el-button--primary el-button--small"
          for="image_uploads"
          >请选择数据文件(csv)</label
        >
        <input
          type="file"
          id="image_uploads"
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
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-wrap" id="tablewrap">
      <el-table
        ref="Table"
        :data="tableData"
        highlight-current-row
        stripe
        :height="tableHeight"
      >
        <el-table-column type="index" width="50" fixed> </el-table-column>
        <el-table-column prop="WorkMode" fixed width="150" label="时间">
          <template slot-scope="scope">
            {{ scope.row.day + scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column prop="WorkMode" label="模式"></el-table-column>
        <el-table-column
          prop="GenModeFrequency"
          label="模式频率"
        ></el-table-column>
        <el-table-column prop="Bargraph" label="条形图"></el-table-column>
        <el-table-column
          prop="SensitivityLevel"
          label="灵敏度等级"
        ></el-table-column>
        <el-table-column
          prop="SensitivityLevel"
          label="灵敏度等级"
        ></el-table-column>
        <el-table-column
          prop="MeasurementType"
          label="测量类型"
        ></el-table-column>
        <el-table-column prop="SwingWarning" label="摆动警告"></el-table-column>
        <el-table-column prop="Overload" label="过载"></el-table-column>
        <el-table-column
          prop="BladeAngleSign"
          label="B叶片角度"
        ></el-table-column>
        <el-table-column prop="BladeAngle" label="叶片角度"></el-table-column>
        <el-table-column
          prop="PaddleAngleSign"
          label="P叶片角度"
        ></el-table-column>
        <el-table-column prop="PaddleAngle" label="叶片角度"></el-table-column>
        <el-table-column prop="SelfTest" label="自检"></el-table-column>
        <el-table-column
          prop="N_SIndicator"
          label="n/s指示器"
        ></el-table-column>
        <el-table-column
          prop="E_W_Indicator"
          label="e/w指示器"
        ></el-table-column>
        <el-table-column
          prop="AlarmZoneDepth"
          label="报警区深度"
        ></el-table-column>
        <el-table-column
          prop="AlarmZoneActive"
          label="报警区激活"
        ></el-table-column>
      </el-table>
    </div>
  </v-container>
</template>

<script>
import { readCSV } from "../utils";
export default {
  name: "DataAnalyze",

  data: () => ({
    fileList: [],
    tableHeight: 250,
    value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    CSVData:[],
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
    this.$nextTick(this.resizeTableHeight);
    window.addEventListener("resize", this.resizeTableHeight);
    const input = document.querySelector("input");
    input.addEventListener("change", this.upload);
  },
  beforeRouteUpdate() {
    console.log("beforeRouteUpdate");
  },
  // beforeRouteLeave(){
  //   console.log('beforeRouteLeave')
  // },

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
        readCSV(input,(data) => {
          this.tableData = Object.freeze(data.slice(1))
          console.log(this.tableData)
        })
      }
    },
    onSubmit() {
      console.log("onSubmit");
    },
    resizeTableHeight() {
      const Table = this.$refs["Table"];
      if (Table) {
        Table.$nextTick(() => {
          const clientHeight = Table.$el.parentElement.clientHeight;
          console.log(clientHeight);
          this.tableHeight = clientHeight > 300 ? clientHeight : 300;
        });
      }
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
</style>
  