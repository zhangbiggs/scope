<template>
  <v-container class="mycontainer">
    <!-- <el-form :inline="true">
      <el-form-item>
        <el-button type="success" :disabled="connected" :loading="loading" @click="sendCommand" > 上传数据 </el-button>
      </el-form-item>
      <el-form-item>
        <label class="el-button el-button--primary el-button--small" for="csv_uploads" >{{ text }}</label >
        <input id="csv_uploads" type="file" name="csv_uploads" accept=".csv" @change="uploadCSV" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <div class="el-button el-button--primary el-button--small" @click="onSubmit" > 查询 </div>
      </el-form-item>
      <el-form-item>
        <div class="el-button el-button--primary el-button--small" @click="onSave" > 保存 </div>
      </el-form-item>
    </el-form> -->
    <v-row class="myrow">
          <v-btn type="secondary" color="secondary" :disabled="connected" :loading="loading" @click="sendCommand" > 设备上传 </v-btn>
          <label class="mylabel v-btn v-btn--is-elevated v-btn--has-bg theme--light elevation-3 v-size--default indigo" for="csv_uploads" >{{ text }}</label >
          <input id="csv_uploads" type="file" name="csv_uploads" accept=".csv" @change="uploadCSV" />
          <v-btn class="mylabel" type="secondary" color="pink" elevation="3" @click="onSave" >保存文件</v-btn >
          <v-text-field class="mylabel" label="开始时间" type="date" :max="end" v-model="start"  outlined dense @change="handleChange"></v-text-field>
          <v-text-field label="结束时间" type="date" :min="start" v-model="end"  outlined dense @change="handleChange"></v-text-field>
    </v-row>
    <div class="tableFixHead" id="tableFixHead">
      <table>
        <thead>
          <tr>
            <th class="headerTh">#</th>
            <th class="headerTd" v-for="(thItem, i) in tableHeadData" :key="i">
              {{ thItem }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in tableData" :key="i">
            <th class="headerTh">{{ i + 1 }}</th>
            <td v-for="(tdItem, tdi) in item" :key="tdi">{{ tdItem }}</td>
          </tr>
        </tbody>
        <!-- <tfoot class="myfoot">
          <tr>
            <th class="headerTh" scope="row">Totals</th>
            <td colspan="2">21,000</td>
            <td>21,000</td>
            <td>21,000</td>
          </tr>
        </tfoot> -->
      </table>
    </div>
  </v-container>
</template>

<script>
import { readCSV, debounce, download_csv_file } from "../utils";
import EventBus from "../eventbus";
var tableData = [];

export default {
  name: "DataAnalyze",

  data: () => ({
    connected: true,
    loading: false,
    text: "文件上传",
    fileList: [],
    tableHeight: 250,
    start:"",
    end:"",
    value1: [],
    CSVData: [],
    tableHeadData: [
      "年-月-日",
      "时-分-秒",
      "记录类型",
      "模式",
      "频率",
      "条形图",
      "灵敏度等级",
      "测量类型",
      "深度",
      "摆动警告",
      "过载",
      "B叶片标志",
      "叶片角度",
      "P叶片标志",
      "叶片角度",
      "自检",
      "纬度",
      "N/S指示器",
      "经度",
      "E/W指示器",
      "报警区深度",
      "报警区激活",
    ],
    tableData: [],
  }),
  mounted() {
    window.onresize = this.resizeHandle;
    const input = document.querySelector("input");
    input.addEventListener("change", this.upload);
    const updateDate = debounce(this.showData, 200);
    EventBus.$on("RD-RECORD", (msg) => {
      tableData.push(msg.split(","));
      updateDate();
    });
    EventBus.$on("connect", (bool) => {
      this.connected = !bool;
    });
  },

  methods: {
    onSave() {
      download_csv_file(this.tableHeadData, this.tableData);
    },
    resizeHandle() {
      var tableFixHeadel = document.getElementById("tableFixHead");
      tableFixHeadel.style.height = window.innerHeight - 145 + "px";
    },
    sendCommand() {
      this.loading = true;
      window.sendParam("[{RD-RECORD}]");
    },
    showData() {
      this.loading = false;
      this.setTableData(tableData);
    },
    setTableData(data) {
      // tableData = data
      this.tableData = Object.freeze(data);
      this.$nextTick(this.resizeHandle);
      tableData = Object.freeze(data);
    },
    uploadCSV() {
      const input = document.querySelector("input");

      const curFiles = input.files;
      if (curFiles.length === 0) {
        this.text = "文件上传";
      } else {
        for (const file of curFiles) {
          this.text = file.name;
        }
        readCSV(input, (data) => {
          // this.tableHeadData = data[0];
          this.setTableData(data.slice(1));
        });
      }
    },
    handleChange() {
      // tableData = this.tableData
      if (this.start && this.end){
        var start = new Date(this.start).getTime()
        var end = new Date(this.end).getTime()
        this.tableData = tableData.filter(item => {
          var dateTime = new Date((item[0]+ " " +item[1].replaceAll('-',":"))).getTime()
          return (dateTime <= end) && (dateTime >= start)
        })
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
    margin-left: 0;
    margin-right: 0;
    padding-top: 10px;
  }
  .table-wrap {
    flex: 1;
  }
}
#csv_uploads {
  display: none;
}
.tableFixHead {
  overflow-y: auto;
  height: 550px;
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
}
.headerTh {
  position: sticky;
  left: 0;
  z-index: 50;
}
.headerTd {
  min-width: 110px;
}
table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-size: 0.8rem;
  width: 100%;
}

td,
th {
  border: 1px solid rgb(190, 190, 190);
  padding: 5px 8px;
}

th {
  background-color: rgb(235, 235, 235);
}

td {
  text-align: center;
}

tr:nth-child(even) td {
  background-color: rgb(250, 250, 250);
}

tr:nth-child(odd) td {
  background-color: rgb(245, 245, 245);
}

caption {
  padding: 10px;
}
.mylabel{
  margin: 0 10px;
}
</style>
  