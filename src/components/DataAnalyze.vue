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
import { readCSV,debounce } from "../utils";
import EventBus from "../eventbus";
var tableData = [];

export default {
  name: "DataAnalyze",

  data: () => ({
    text: "请选择数据文件(csv)",
    fileList: [],
    tableHeight: 250,
    value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    CSVData: [],
    tableHeadData: [ "年-月-日", "时-分-秒", "模式", "频率", "条形图", "灵敏度等级", "测量类型", "深度", "摆动警告", "过载", "B叶片角度标志", "叶片角度", "P叶片角度标志", "叶片角度", "自检", "纬度", "N/S指示器", "经度", "E/W指示器", "报警区深度", "报警区激活" ],
    tableData: [],
  }),
  mounted() {
    const input = document.querySelector("input");
    input.addEventListener("change", this.upload);
    const updateDate = debounce(this.showData,200)
    EventBus.$on("RD-RECORD", (msg) => {
      tableData.push(msg.split(","));
      updateDate()
    });
  },

  methods: {
    showData(){
      this.tableData = Object.freeze(tableData);
      tableData = []
    },
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
  padding: 2px 4px;
  border: 1px solid #ccc;
}
th {
  background: #eee;
}
</style>
  