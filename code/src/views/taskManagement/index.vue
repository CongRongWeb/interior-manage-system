<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">


        <el-form-item label="用户" prop="userId">
          <el-select v-model="formData.userId" :disabled="disabled" placeholder="请选择用户">
            <el-option
              v-for="item in userList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务标题" prop="title">
          <el-input v-model="formData.title"  :style="{width: '100%'}" clearable placeholder="请输入任务标题" ></el-input>
        </el-form-item>
        <el-form-item label="任务内容" prop="content">
          <el-input v-model="formData.content" type="textarea" placeholder="请输入任务内容"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="formData.remarks" type="textarea" placeholder="请输入备注"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="任务派发日期" prop="yearmonth">
          <el-date-picker
            v-model="formData.yearmonth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择任务派发日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="formData.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="startTime">
          <el-date-picker
            v-model="formData.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分值" prop="score">
          <el-input v-model="formData.score"  :style="{width: '100%'}" clearable placeholder="请输入分值" ></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addFn">保 存</el-button>
  </span>
    </el-dialog>

    <div>
      <el-row :gutter="0">
        <el-form ref="elForm2" :model="formData2"  label-width="85px" size="small">
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户姓名" prop="name">
                  <el-input v-model="formData2.name" :style="{width: '100%'}" clearable placeholder="请输入用户姓名">
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
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" size="small" plain @click="addUser">添加任务</el-button>
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
          prop="3"
          label="姓名"
          align="center"
          width="130">
        </el-table-column>
        <el-table-column
          prop="4"
          label="任务标题"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="5"
          label="任务内容"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="9"
          label="备注"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="11"
          label="分值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="6"
          label="任务派发日期"
          align="center"
        >

        </el-table-column>
        <el-table-column
          prop="7"
          label="开始时间"
          align="center"
        >

        </el-table-column>
        <el-table-column
          prop="8"
          label="结束时间"
          align="center"
        >

        </el-table-column>
        <el-table-column
          prop="4"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row[10]==0?'未完成':'已完成'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="12"
          align="center"
          width="220"
          label="添加时间">
        </el-table-column>
<!--        <el-table-column
          width="200"
          align="center"
          label="操作">
          <template slot-scope="scope">

            <el-button
              size="mini"
              @click="handleEdit( scope.row)">编辑</el-button>
            <el-popconfirm
              title="是否删除这条信息？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button
                size="mini"
                type="danger"
                slot="reference"
              >删除</el-button>

            </el-popconfirm>

          </template>
        </el-table-column>-->
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
import { getUserList,getTask,addTask} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        userId: "",
        username:'',
        name:'',
        title:'',
        content:'',
        yearmonth:'',
        startTime:'',
        endTime:'',
        remarks:'',
        state:'0',
        score:''
      },
      userList:[],
      stateList:[['0','停用'],['1','启用']],
      formData2: {
        name: ""
      },
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10
    }
  },
  mounted() {
    getUserList({name:'',phone:'','role':'1'}).then(res=>{
      this.userList=res.data
    })
    this.refreshView()
  },
  methods: {
    rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
        /\.[\d]{3}Z/, '')
    },
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
        name:this.formData2.name
      }
      getTask(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.userList.forEach(item=>{
          if(this.formData.userId==item[0]){
            this.formData.username=item[1]
            this.formData.name=item[5]
          }
        })
        addTask(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.userId=null
              this.formData.username=null
              this.formData.name=null
              this.formData.title=null
              this.formData.content=null
              this.formData.yearmonth=null
              this.formData.startTime=null
              this.formData.endTime=null
              this.formData.remarks=null
              this.formData.state='0'
              this.formData.score=null
            })
            this.$message.success(res.message)
            this.addDialog=false
            this.refreshView()
          }
        })
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
      this.$nextTick(()=>{
        this.formData.uuid=data[0]
        this.formData.name=data[1]
        this.formData.department_fid=Number(data[2])
        this.formData.department_name=data[3]
        this.formData.state=data[4]
        this.formData.remark=data[5]
      })

      this.title='编辑指标'
      this.addDialog=true
      this.disabled=true
    },
    handleDelete(data){

    },
    //点击添加按钮
    addUser(){
      const that = this

      that.disabled=false
      this.title='添加任务'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.userId=null
        this.formData.username=null
        this.formData.name=null
        this.formData.title=null
        this.formData.content=null
        this.formData.yearmonth=null
        this.formData.startTime=null
        this.formData.endTime=null
        this.formData.remarks=null
        this.formData.state='0'
        this.formData.score=null
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
