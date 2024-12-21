<template>
<div>
  <el-card class="box-card" style="margin: 30px;padding: 50px 0">
    <el-row :gutter="20">
      <el-col :span="12">
        <div style="display: flex;align-items: center;justify-content: center">
          <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
            <div style="font-size: 14pt">总计划数</div>
            <div style="font-size: 20pt">{{taskList.length}}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="display: flex;align-items: center;justify-content: center">
          <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
            <div style="font-size: 14pt">总计划数</div>
            <div style="font-size: 20pt">{{planList.length}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <div style="display: flex;margin: 30px;justify-content: space-between">
    <el-card class="box-card" style="margin-left: 0px;flex: 2">
      <chart-first :chart-data="echartsData"></chart-first>
    </el-card>
    <el-card class="box-card" style="margin-left: 30px;flex: 2">
      <chart-second :chart-data="echartsData2"></chart-second>
    </el-card>
<!--    <el-card class="box-card" style="margin-left: 30px;flex: 2">-->
<!--      <chart-third :chart-data="echartsData3"></chart-third>-->
<!--    </el-card>-->
  </div>
</div>
</template>

<script>
import chartFirst from "./components/chartFirst.vue";
import chartSecond from "./components/chartSecond.vue";
import chartThird from "./components/chartThird.vue";
import {getPlan,getTask} from "../../api"
export default {
  name: "index",
  data(){
    return{
      echartsData:[],
      echartsData2:[],
      echartsData3:[],
      planList:[],
      taskList:[]
    }
  },
  components:{
    chartFirst,chartSecond,chartThird
  },
  created() {
    getPlan({standard_name:""}).then(res=>{
      this.planList=res.data
      let successArr=res.data.filter(item=>{return item[14]==1})
      this.echartsData=[successArr.length,this.planList.length- successArr.length]

    })
    getTask({name:''}).then(res=>{
      this.taskList=res.data
      let successArr=res.data.filter(item=>{return item[10]==1})
      this.echartsData2=[successArr.length,this.taskList.length- successArr.length]
    })
  }
}
</script>

<style scoped>

</style>
