<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData"  label-width="100px" size="medium">


        <el-form-item label="部门" prop="department_fid">
          <el-select v-model="formData.department_fid" :disabled="disabled" placeholder="请选择部门" @change="handleChange">
            <el-option
              v-for="item in departmentList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标" prop="proxy_fid">
          <el-select v-model="formData.proxy_fid" :disabled="disabled"  placeholder="请选择部门">
            <el-option
              v-for="item in dialogProxyList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准名称" prop="name">
          <el-input v-model="formData.name"  :style="{width: '100%'}" clearable placeholder="请输入标准名称" ></el-input>
        </el-form-item>
        <el-form-item label="分值" prop="score">
          <el-input v-model="formData.score"  :style="{width: '100%'}" clearable placeholder="请输入分值" ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="formData.state" placeholder="请选择状态">
            <el-option
              v-for="item in stateList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准描述" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入标准描述"
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
                <el-form-item label="标准名称" prop="name">
                  <el-input v-model="formData2.name" :style="{width: '100%'}" clearable placeholder="请输入标准名称">
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
              <el-button type="primary" size="small" plain @click="addUser">添加标准</el-button>
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
          label="部门"
          align="center"
          width="280">
        </el-table-column>
        <el-table-column
          prop="5"
          label="指标"
          align="center"
          width="280">
        </el-table-column>
        <el-table-column
          prop="1"
          label="标准名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="7"
          label="分值"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="4"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row[4]==0?'停用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="8"
          label="描述"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="9"
          align="center"
          width="220"
          label="编辑时间">
        </el-table-column>
        <el-table-column
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
import { getDepartment,getProxy,delStandard,insertStandardOrUpdate,getStandard} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        name: "",
        department_fid:'',
        department_name:'',
        proxy_fid:'',
        proxy_name:'',
        score:'',
        remark:'',
        state:''
      },
      departmentList:[],
      proxymentList:[],
      stateList:[['0','停用'],['1','启用']],
      formData2: {
        name: ""
      },
      tableData: [],
      disabled:false,
      tableList:[],
      page:1,
      total:0,
      limit:10,
      dialogProxyList:[]
    }
  },
  mounted() {
    getDepartment({name:''}).then(res=>{
      this.departmentList=res.data
    })
    getProxy({name:''}).then(res=>{
      this.proxymentList=res.data
    })
    this.refreshView()
  },
  methods: {
    handleChange(val){
      this.formData.proxy_fid=''
      this.dialogProxyList=this.proxymentList.filter(item=>{return item[2]==val})
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
      getStandard(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.departmentList.forEach(item=>{
          if(this.formData.department_fid==item[0]){
            this.formData.department_name=item[1]
          }
        })
        this.proxymentList.forEach(item=>{
          if(this.formData.proxy_fid==item[0]){
            this.formData.proxy_name=item[1]
          }
        })
        insertStandardOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.name=""
              this.formData.department_fid=''
              this.formData.department_name=''
              this.formData.proxy_fid=''
              this.formData.proxy_name=''
              this.formData.score=''
              this.formData.state=''
              this.formData.remark=""
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
        this.formData.proxy_fid=Number(data[4])
        this.formData.proxy_name=data[5]
        this.formData.state=data[6]
        this.formData.score=data[7]
        this.formData.remark=data[8]
      })

      this.title='编辑标准'
      this.addDialog=true
      this.disabled=true
    },
    handleDelete(data){
      delStandard({uuid:data[0]}).then(res=>{
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
      this.title='添加标准'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.name=""
        this.formData.department_fid=''
        this.formData.department_name=''
        this.formData.proxy_fid=''
        this.formData.proxy_name=''
        this.formData.score=''
        this.formData.state=''
        this.formData.remark=""
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
