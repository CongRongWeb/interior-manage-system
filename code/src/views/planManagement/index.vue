<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">
        <el-form-item label="指标" prop="proxy_fid">
          <el-select v-model="formData.proxy_fid" :disabled="disabled" placeholder="请选择指标" @change="handleChange">
            <el-option
              v-for="item in proxyList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准" prop="standard_fid">
          <el-select v-model="formData.standard_fid" :disabled="disabled" placeholder="请选择指标" multiple>
            <el-option
              v-for="item in dialogProxyList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划执行日期" prop="yearmonth">
          <el-date-picker
            v-model="formData.yearmonth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择计划执行日期">
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
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
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
                <el-form-item label="标准" prop="standard_name">
                  <el-input v-model="formData2.standard_name" :style="{width: '100%'}" clearable placeholder="请输入标准名">
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
              <el-button type="primary" size="small" plain @click="addUser">添加计划</el-button>
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
          prop="7"
          label="指标"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="9"
          label="标准"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="10"
          label="计划执行日期"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="11"
          label="开始时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="12"
          align="center"
          width="220"
          label="结束时间">
        </el-table-column>
        <el-table-column
          prop="13"
          align="center"
          width="220"
          show-overflow-tooltip
          label="备注">
        </el-table-column>
        <el-table-column
          prop="13"
          align="center"
          width="120"
          label="状态">
          <template  slot-scope="scope">
            {{getState(scope.row[14])}}
          </template>
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
import { getUserList,getProxy,getStandard,addPlan,getPlan} from "../../api/index"
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
        department_id:'',
        department_name:'',
        proxy_fid:'',
        proxy_name:'',
        standard_fid:'',
        standard_name:'',
        yearmonth:'',
        startTime:'',
        endTime:'',
        remark:'',
        state:'0'
      },
      proxyList:[],
      standardList:[],
      stateList:[['0','停用'],['1','启用']],
      formData2: {
        standard_name: ""
      },
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10,
      userList:[],
      dialogProxyList:[]
    }
  },
  mounted() {
    getUserList({name:'',phone:'',role:'1'}).then(res=>{
      this.userList=res.data
      this.userList.forEach(item=>{
        if(this.$store.uuid){
          this.formData.username=item[1]
          this.formData.name=item[5]
          this.formData.userId=item[0]
          this.formData.department_id=item[8]
          this.formData.department_name=item[9]
          getProxy({name:''}).then(ress=>{
            this.proxyList=ress.data.filter(u=>{return u[2]==this.formData.department_id})
          })
        }
      })
    })

    getStandard({name:''}).then(res=>{
      this.standardList=res.data
    })
    this.refreshView()
  },
  methods: {
    getState(val){
      switch (val){
        case '0':
          return'待确认'
        case '1':
          return'已确认'
        case '2':
          return'已完成'
        case '3':
          return'已否认'
      }
    },
    handleChange(val){
      this.formData.standard_fid=[]
      this.dialogProxyList=this.proxyList.filter(item=>{return item[2]==val})
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
        standard_name:this.formData2.standard_name
      }
      getPlan(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.standardList.forEach(item=>{
          this.formData.standard_fid.forEach(i=>{
            if(item[0]==i){
              this.formData.standard_name+=item[1] + ','
            }
          })
        })
        this.formData.standard_name=this.formData.standard_name.substring(0,this.formData.standard_name.length - 1)
        this.formData.standard_fid=this.formData.standard_fid.join(',')
        this.dialogProxyList.forEach(item=>{
          if (this.formData.proxy_fid==item[0]){
            this.formData.proxy_name=item[1]
          }
        })
        addPlan(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.userId=''
              this.formData.username=''
              this.formData.name=''
              this.formData.department_id=''
              this.formData.department_name=''
              this.formData.proxy_fid=''
              this.formData.proxy_name=''
              this.formData.standard_fid=''
              this.formData.standard_name=''
              this.formData.yearmonth=''
              this.formData.startTime=''
              this.formData.endTime=''
              this.formData.remark=''
              this.formData.state='0'
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
      delProxy({uuid:data[0]}).then(res=>{
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
      this.title='添加计划'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.proxy_fid=''
        this.formData.proxy_name=''
        this.formData.standard_fid=''
        this.formData.standard_name=''
        this.formData.yearmonth=''
        this.formData.startTime=''
        this.formData.endTime=''
        this.formData.remark=''
        this.formData.state='0'
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
