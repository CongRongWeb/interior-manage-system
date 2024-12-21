<template>
  <div>
    <el-dialog
      :visible.sync="addDialog"
      :title="title"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px" size="medium">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" :disabled="disabled" :style="{width: '100%'}" clearable placeholder="请输入用户名"
                    prefix-icon='el-icon-user'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" :style="{width: '100%'}" clearable placeholder="请输入密码"
                    prefix-icon='el-icon-lock' show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" v-if="formData.role==1">
          <el-input v-model="formData.phone" :style="{width: '100%'}" clearable placeholder="请输入手机号"
                    prefix-icon='el-icon-mobile-phone'></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" v-if="formData.role==1">
          <el-input v-model="formData.name" :style="{width: '100%'}" :disabled="disabled" clearable placeholder="请输入姓名"
                    prefix-icon='el-icon-mobile-phone'></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="attno" v-if="formData.role==1">
          <el-input v-model="formData.attno" :style="{width: '100%'}" :disabled="disabled" clearable placeholder="请输入工号"
                    prefix-icon='el-icon-mobile-phone'></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" v-if="formData.role==1">
          <el-select v-model="formData.gender" placeholder="请选择" :disabled="disabled">
            <el-option
              v-for="item in genderList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="department_id" v-if="formData.role==1">
          <el-select v-model="formData.department_id" placeholder="请选择">
            <el-option
              v-for="item in departmentList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role" >
          <el-select v-model="formData.role" placeholder="请选择" :disabled="disabled">
            <el-option
              v-for="item in roleList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="remark" v-if="formData.role==1">
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
                <el-form-item label="角色" prop="role">
                  <el-select v-model="formData2.role" :style="{width: '100%'}" placeholder="请选择角色">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData2.name" :style="{width: '100%'}" clearable placeholder="请输入姓名">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="formData2.phone" :style="{width: '100%'}" clearable placeholder="请输入手机号">
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
          <el-col :span="6">
            <el-form-item size="large">
              <el-button type="primary" size="small" plain @click="addUser">添加用户</el-button>
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
          label="用户名"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="5"
          label="姓名"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="9"
          label="部门"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="6"
          label="工号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="7"
          label="性别"
          align="center"
          width="80">
          <template slot-scope="scope">
            {{scope.row[7]==0?'女':'男'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="4"
          label="手机号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="角色">
          <template slot-scope="scope">
            {{scope.row[3]==0?'管理员':'用户'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="11"
          align="center"
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
  </div>
</template>

<script>
import {delUser, getUserList, insertUserOrUpdate,getDepartment} from "../../api/index"
export default {
  name: "index",
  data() {
    return {
      addDialog: false,
      title:'',
      departmentList:[],
      genderList:[['0','女'],['1','男']],
      roleList:[['0','管理员'],['1','用户']],
      formData: {
        username: "",
        password: "",
        phone: "",
        role: '0',
        name:'',
        attno:'',
        gender:'',
        department_id:'',
        department_name:'',
        remark:'',
        uuid:null,
      },
      formData2: {
        phone: "",
        name: "",
        role: ""
      },
      options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '用户'
        },{
        value: '0',
        label: '超级管理员'
      }],
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: '角色不能为空',
          trigger: 'change'
        }],
      },
      roleOptions: [{
        "label": "用户",
        "value": '1'
      }, {
        "label": "超级管理员",
        "value": '0'
      }],
      tableData: [],
      disabled:false,
    }
  },
  mounted() {
    getDepartment({name:''}).then(res=>{
      this.departmentList=res.data
    })
    this.refreshView()
  },
  methods: {
    refreshView(){
      const DATA={
        name:this.formData2.name,
        phone:this.formData2.phone,
        role:this.formData2.role
      }
      getUserList(DATA).then(res=>{
        this.tableData=res.data
      })
    },

    addFn() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        if(this.formData.role=='0'){
          this.formData.phone="/"
          this.formData.attno="/"
          this.formData.gender='0'
          this.formData.department_id="/"
          this.formData.department_name="/"
          this.formData.name="/"
          this.formData.remark="/"
        }else{
          this.departmentList.forEach(item=>{
            if (this.formData.department_id==item[0]){
              this.formData.department_name=item[1]
            }
          })
        }
        insertUserOrUpdate(this.formData).then(res=>{
          if(res.flag){
            this.$nextTick(()=>{
              this.formData.uuid=null
              this.formData.username=""
              this.formData.password=""
              this.formData.role='0'
              this.formData.phone=""
              this.formData.name=""
              this.formData.attno=""
              this.formData.gender='0'
              this.formData.department_id=""
              this.formData.department_name=""
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
      this.formData2.role=''
      this.refreshView()

    },
    search() {
        this.refreshView()
    },
    handleEdit(data) {
      this.$nextTick(()=>{
        this.formData.uuid=data[0]
        this.formData.username=data[1]
        this.formData.password=data[2]
        this.formData.role=data[3]
        this.formData.phone=data[4]
        this.formData.name=data[5]
        this.formData.attno=data[6]
        this.formData.gender=data[7]
        this.formData.department_id=Number(data[8])
        this.formData.department_name=data[9]
        this.formData.remark=data[10]

      })

      this.title='编辑用户'
      this.addDialog=true
      this.disabled=true
    },
    handleDelete(data){
      delUser({uuid:data[0]}).then(res=>{
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
      this.title='添加用户'
      this.$nextTick(()=>{
        this.formData.uuid=null
        this.formData.username=""
        this.formData.password=""
        this.formData.role='0'
        this.formData.phone=""
        this.formData.name=""
        this.formData.attno=""
        this.formData.gender='0'
        this.formData.department_id=""
        this.formData.department_name=""
        this.formData.remark=""
      })
      this.addDialog=true
    }
  }
}
</script>

<style scoped>

</style>
