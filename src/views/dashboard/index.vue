<template>
  <div>
    <el-card class="box-card">
      <template #header class="clearfix">
          <span>系统统计</span>
          <el-button style="float: right; padding: 3px 0; margin-left: 20px" icon="el-icon-refresh" type="text">刷新数据</el-button>
      </template>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div id="userLoginChart" style="height: 300px; width: 100% padding:10px"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div id="userAddChart" style="height: 300px; width: 100% padding:10px"></div>
          </div>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col>
          <div id="questionChart1" style="height: 300px; width: 100% padding:10px"></div>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div id="repoQuestion1" style="height: 300px; width: 100% padding:10px"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div id="repoQuestion2" style="height: 300px; width: 100% padding:10px"></div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import * as echarts from 'echarts';

export default defineComponent({
  mounted() {
    const myChart1 = this.$echarts.init(document.getElementById("userLoginChart"));
    // 绘制图表
    myChart1.setOption({
      title: {
        text: '系统访问量（近七日）'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['2021-05-01', '2021-05-02', '2021-05-03', '2021-05-04', '2021-05-05', '2021-05-06', '2021-05-07']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }]
    });
    const myChart2 = this.$echarts.init(document.getElementById("userAddChart"));
    // 绘制图表
    myChart2.setOption({
      title: {
        text: '新增用户数（近七日）'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['2021-05-01', '2021-05-02', '2021-05-03', '2021-05-04', '2021-05-05', '2021-05-06', '2021-05-07']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }]
    });
    const questionChart1 = this.$echarts.init(document.getElementById("questionChart1"));
    // 绘制图表
    questionChart1.setOption({
      title: {
        text: '试题新增数据(近一月)'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['单选题', '多选题', '判断题', '填空题', '问答题']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
            saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01',
               '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01',
               '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01',
               '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01', '2021-05-01',
               '2021-05-01', '2021-05-01', '2021-05-01',
              ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
            name: '单选题',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 10, 230, 210,
                   120, 132, 101, 134, 90, 230, 210,
                   120, 132, 101, 134, 90, 230, 210,
                   120, 132, 101, 134, 90, 230, 210,
                   120, 132, 101
                  ]
        },
        {
            name: '多选题',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310,
            220, 182, 191, 234, 290, 330, 310,
            220, 182, 191, 234, 290, 330, 310,
            220, 182, 191, 234, 290, 330, 310,
            220, 182, 191]
        },
        {
            name: '判断题',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410,
            150, 232, 201, 154, 190, 330, 410,
            150, 232, 201, 154, 190, 330, 410,
            150, 232, 201, 154, 190, 330, 410,
            150, 232, 201]
        },
        {
            name: '填空题',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301]
        },
        {
            name: '问答题',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 210, 330, 320,
            120, 132, 101, 134, 210, 130, 120,
            10, 132, 101, 134, 110, 130, 130,
            120, 132, 101, 134, 120, 130, 130,
            120, 132, 101]
        }
      ]
    });
    const repoQuestion1 = this.$echarts.init(document.getElementById("repoQuestion1"));
    // 绘制图表
    repoQuestion1.setOption({
      title: {
        text: '题库试题数'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['题库一', '题库二', '题库三', '题库死', '题库五', '题库六', '题库七']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [1200, 343, 801, 384, 71, 169, 180],
        type: 'bar'
      }]
    });
    const repoQuestion2 = this.$echarts.init(document.getElementById("repoQuestion2"));
    // 绘制图表
    repoQuestion2.setOption({
      title: {
        text: '题库试题分布',
        subtext: '测试题库',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
            name: '试题类型',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 2500, name: '单选题'},
                {value: 735, name: '多选题'},
                {value: 580, name: '判断题'},
                {value: 484, name: '填空题'},
                {value: 200, name: '问答题'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
      ]
    });
  }
})
</script>

