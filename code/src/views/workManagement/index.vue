<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      title="任务提交"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">
        <el-form-item label="工作标题" prop="title">
          <el-input v-model="formData.title" :disabled="disabled" :style="{width: '100%'}"  placeholder="" ></el-input>
        </el-form-item>
        <el-form-item label="工作内容" prop="content">
          <el-input v-model="formData.content" type="textarea" :disabled="disabled" placeholder=""
                    :autosize="{minRows: 2, maxRows: 2}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" :disabled="disabled" type="textarea" placeholder=""
                    :autosize="{minRows: 2, maxRows: 2}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" prop="yearmonth">
          <el-input v-model="formData.yearmonth" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="" ></el-input>
        </el-form-item>
        <div style="display: flex;">
          <el-form-item label="开始时间" prop="startTime">
            <el-input v-model="formData.startTime" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="" ></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-input v-model="formData.endTime" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="" ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="完成情况" prop="name">
          <el-input v-model="taskForm.content" type="textarea"  placeholder="请输入完成情况"
                    :autosize="{minRows: 2, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateTask">保 存</el-button>
  </span>
    </el-dialog>
    <el-dialog
      :visible.sync="addDialog2"
      title="计划提交"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">
        <el-form-item label="工作标题" prop="title">
          <el-input v-model="formData.title" :disabled="disabled" :style="{width: '100%'}"  placeholder="" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" :disabled="disabled" type="textarea" placeholder=""
                    :autosize="{minRows: 2, maxRows: 2}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" prop="yearmonth">
          <el-input v-model="formData.yearmonth" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="" ></el-input>
        </el-form-item>
        <div style="display: flex;">
          <el-form-item label="开始时间" prop="startTime">
            <el-input v-model="formData.startTime" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="" ></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-input v-model="formData.endTime" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="" ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="完成情况" prop="name">
          <template v-for="item in planTempArr">

            <div style="display: flex;margin-top: 20px">
              <div style="width: 180px;text-align: center;">{{item.name}}</div>
              <el-input v-model="item.content" type="textarea"  placeholder=""
                        :autosize="{minRows: 2, maxRows: 2}" :style="{width: '70%'}"></el-input>
            </div>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog2 = false">取 消</el-button>
    <el-button type="primary" @click="updatePlan">保 存</el-button>
  </span>
    </el-dialog>
    <div>
      <el-row :gutter="0">
        <el-form ref="elForm2" :model="formData2"  label-width="85px" size="small">
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="部门名称" prop="name">
                  <el-input v-model="formData2.name" :style="{width: '100%'}" clearable placeholder="请输入部门名称">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-form-item size="large">
              <el-button type="primary" size="small" @click="search">搜索</el-button>
              <el-button @click="resetForm" size="small" >重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

    </div>

    <div class="container">
      <el-table
        stripe
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="type"
          label="工作类型"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="title"
          label="工作标题"
          align="center"
          width="280">
        </el-table-column>
        <el-table-column
          prop="content"
          label="工作内容"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="yearmonth"
          label="执行时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="工作备注"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="工作状态"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.state==0?'待完成':'已完成'}}
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.state==1"
              size="mini"
              type="primary"
              @click="handleEdit( scope.row)">提交</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;flex-direction: row-reverse;padding: 40px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,20,30]"
        background
        :page-size="limit"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>

    </div>
  </div>
</template>

<script>
import {delDepartment, addTaskDetail, addPlanDetail,getWork} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      addDialog2:false,
      czId:'',
      title:'',
      formData: {
        name: "",
        remark:''
      },
      formData2: {
        name: ""
      },
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10,
      taskList:[],
      planList:[],
      taskForm:{
        taskId:'',
        userId:'',
        username:'',
        name:'',
        content:'',
        imgurl:''
      },
      planForm:{
        planId:'',
        userId:'',
        username:'',
        name:'',
        proxy_id:'',
        proxy_name:'',
        department_id:'',
        department_name:'',
        standard_id:'',
        standard_name:'',
        content:'',
        imgurl:''
      },
      planTempArr:[]
    }
  },
  mounted() {
    this.refreshView()
  },
  methods: {
    //处理切换页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.pageList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.pageList();
    },

    // 具体分页操作
    pageList() {
      this.tableData = this.tableList.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      );
      this.total = this.tableList.length;
    },
    refreshView(){
      const DATA={
        userId:this.$store.uuid
      }
      getWork(DATA).then(res=>{
        let data=[]
        this.planList=res.data
        this.taskList=res.data2
        res.data.forEach(item=>{
          data.push({
            fid:'plan_' + item[0],
            userId:item[1],
            username:item[2],
            name:item[3],
            title:item[7],
            content:item[9],
            yearmonth:item[10],
            startTime:item[11],
            endTime:item[12],
            remark:item[13],
            state:item[14],
            type:'计划'
          })
        })
        res.data2.forEach(item=>{
          data.push({
            fid:'task_' + item[0],
            userId:item[1],
            username:item[2],
            name:item[3],
            title:item[4],
            content:item[5],
            yearmonth:item[6],
            startTime:item[7],
            endTime:item[8],
            remark:item[9],
            state:item[10],
            type:'任务'
          })
        })
        this.tableData=data
        this.tableList=data
        this.total=data.length;
        this.pageList()
      })
    },
    updatePlanAPI(){
      const that = this
      addPlanDetail(that.planForm).then(res=>{
        if(res.flag){
          that.planForm.standard_id=''
          that.planForm.standard_name=''
          that.planForm.content=''
        }
      })
    },
    updatePlan(){
      const that = this
      // for(let i =0;i<this.planTempArr.length;i++){
      //   let item = this.planTempArr[i]
      //     that.planForm.standard_id=item.id
      //     that.planForm.standard_name=item.name
      //     that.planForm.content=item.content
      //     that.updatePlanAPI()
      // }
      this.planTempArr.forEach(item=>{
        const DATA={
          planId:that.planForm.planId,
          userId:that.planForm.userId,
          username:that.planForm.username,
          name:that.planForm.name,
          proxy_id:that.planForm.proxy_id,
          proxy_name:that.planForm.proxy_name,
          department_id:that.planForm.department_id,
          department_name:that.planForm.department_name,
          standard_id:item.id,
          standard_name:item.name,
          content:item.content,
          imgurl:that.planForm.imgurl
        }
        addPlanDetail(DATA)
      })


      setTimeout(function (){
        that.formData={}
        that.taskForm={}
        that.$message.success('提交成功')
        that.addDialog2=false
        that.refreshView()
      },1000)
    },


    updateTask() {
      addTaskDetail(this.taskForm).then(res=>{
        if(res.flag){
          this.$nextTick(()=>{
            this.formData={}
            this.taskForm={}
          })
          this.$message.success(res.message)
          this.addDialog=false
          this.refreshView()
        }
      })

    },

    resetForm() {
      this.$refs['elForm2'].resetFields()
      this.formData2.name=''

      this.refreshView()

    },
    search() {
      this.refreshView()
    },
    handleEdit(data) {
      this.czId=data.fid.split('_')[1]
      this.planTempArr=[]
      if(data.fid.split('_')[0]=='plan'){
        //p
        let datas=this.planList.filter(item=>{return item[0]==this.czId})
        let arr = datas[0][9].split(',')
        let arrId = datas[0][8].split(',')
        arr.forEach((item,index)=>{
          this.planTempArr.push({
            id:arrId[index],
            name:item,
            content:''
          })
        })
        this.addDialog2=true
        this.planForm.planId=this.czId
        this.planForm.userId=this.$store.uuid
        this.planForm.name=this.$store.name
        this.planForm.username=this.$store.username

        this.planForm.proxy_id=datas[0][6]
        this.planForm.proxy_name=datas[0][7]
        this.planForm.department_id=datas[0][4]
        this.planForm.department_name=datas[0][5]



        this.formData.title=data.title
        this.formData.content=data.content
        this.formData.remark=data.remark
        this.formData.yearmonth=data.yearmonth
        this.formData.startTime=data.startTime
        this.formData.endTime=data.endTime

      }else{
        //t

        this.addDialog=true
        this.taskForm.taskId=this.czId
        this.taskForm.userId=this.$store.uuid
        this.taskForm.name=this.$store.name
        this.taskForm.username=this.$store.username
        this.formData.title=data.title
        this.formData.content=data.content
        this.formData.remark=data.remark
        this.formData.yearmonth=data.yearmonth
        this.formData.startTime=data.startTime
        this.formData.endTime=data.endTime

      }

      this.disabled=true
    },
    handleDelete(data){
      delDepartment({uuid:data[0]}).then(res=>{
        if(res.flag){
          this.$message.success(res.message)
          this.refreshView()
        }
      })
    },
    //点击添加按钮
    addUser(){
      const that = this

      that.disabled=false
      this.title='添加部门'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.name=""
        this.formData.remark=""
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
