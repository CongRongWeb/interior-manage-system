<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px" size="medium">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="请输入部门名称" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入描述"
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
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" size="small" plain @click="addUser">添加部门</el-button>
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
          prop="1"
          label="部门名称"
          align="center"
          width="280">
        </el-table-column>
        <el-table-column
          prop="2"
          label="描述"
          align="center"
          show-overflow-tooltip
          >
        </el-table-column>
        <el-table-column
          prop="3"
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
import {delDepartment, insertDepartmentOrUpdate, getDepartment} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      formData: {
        name: "",
        remark:''
      },
      formData2: {
        name: ""
      },
      rules: {
        name: [{
          required: true,
          message: '请输入部门名称',
          trigger: 'blur'
        }]
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
        name:this.formData2.name
      }
      getDepartment(DATA).then(res=>{
        this.tableData=res.data
        this.tableList=res.data
        this.total=res.data.length;
        this.pageList()
      })
    },

    addFn() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        insertDepartmentOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.name=""
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
        this.formData.remark=data[2]
      })

      this.title='编辑部门'
      this.addDialog=true
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
