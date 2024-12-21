<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="角色">
      <div>
        {{roleName}}
      </div>
    </el-form-item>
    <el-form-item label="用户名">
      <div>
        {{form.name}}
      </div>
    </el-form-item>
    <el-form-item label="院系" v-if="form.role==1">
      <div>
        {{department}}
      </div>
    </el-form-item>
    <el-form-item label="班级" v-if="form.role==1">
      <div>
        {{classes}}
      </div>
    </el-form-item>
    <el-form-item label="姓名" v-if="form.role==2">
      <div>
        {{teacherName}}
      </div>
    </el-form-item>
    <el-form-item label="手机号">
      <div>
        {{form.phone}}
      </div>
    </el-form-item>
    <el-form-item label="邮箱">
      <div>
        {{form.email}}
      </div>
    </el-form-item>


  </el-form>
</div>
</template>

<script>
import {} from "../../api"
export default {
  name: "index",
  data(){
    return{
      form: {
        name: '',
        phone: '',
        email: '',
        remark_id: '',
        role: ''
      },
      roleName:'',
      department:'',
      classes:'',
      teacherName:"",
      teacherList:[],
      departmentList:[],
      classesList:[]
    }
  },
  // mounted() {
  //   const that = this
  //   getUserInfo({uuid:this.$store.uuid}).then(res=>{
  //     this.form.name=res.data[0][1]
  //     this.form.phone=res.data[0][4]
  //     this.form.role=res.data[0][3]
  //     this.form.remark_id = res.data[0][7]
  //     this.form.email =res.data[0][5]
  //     this.roleName=this.switchRoleName(this.form.role)
  //     switch (this.form.role){
  //       case 1:
  //         getClassList({name:'',department:''}).then(ress=>{
  //           that.classesList=ress.data
  //           getDepartmentList({name:''}).then(resss=>{
  //             that.departmentList=resss.data
  //             let arr= that.form.remark_id.split(',')
  //             that.departmentList.forEach(item=>{
  //               if(item[0]==arr[0]){
  //                 that.department=item[1]
  //                 that.classesList.forEach(iitem=>{
  //                   if(iitem[0]==arr[1]){
  //                     that.classes=iitem[1]
  //                   }
  //                 })
  //               }
  //             })
  //
  //
  //
  //           })
  //         })
  //
  //
  //
  //         break;
  //       case 2:
  //         getTeacherList({name:'',title:''}).then(ress=>{
  //           that.teacherList=ress.data
  //           that.teacherList.forEach(item=>{
  //             if(item[0]==that.form.remark_id){
  //               that.teacherName=item[1]
  //             }
  //           })
  //         })
  //         break;
  //     }
  //   })
  // },
  // methods:{
  //   switchRoleName(val){
  //     switch (val) {
  //       case 2:
  //         return '教师'
  //       case 1:
  //         return '学生'
  //     }
  //   }
  //
  // }
}
</script>

<style scoped>

</style>
