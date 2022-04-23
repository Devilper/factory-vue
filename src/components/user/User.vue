<template>
  <div>
    <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addUserVisible=!addUserVisible">添加员工</el-button>
          </el-col>
        </el-row>
         <!-- 渲染数据表格 -->
        <el-table
        :data="userList"
        height="100%"
        :key="dataKey"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="username" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="staff_code" label="工号"> </el-table-column>
            <el-table-column prop="staff_gender" label="性别"> </el-table-column>
            <el-table-column label="角色">
              <span slot-scope="scope">
                    <p v-for="item in scope.row.roles" :key="item.id">{{ item.title }}</p>
                </span>
            </el-table-column>
            <el-table-column prop="date_joined" label="入职时间"> </el-table-column>
            <el-table-column prop="last_login" label="最后登录时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑信息" placement="top" >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row)" ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除员工" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                  <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                </el-tooltip> -->
              </template>
            </el-table-column>
        </el-table>

        <el-pagination
          align="left"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page.sync="queryInfo.page"
          :page-sizes="[1,10,20,50]"
          :page-size="queryInfo.page_size"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </el-card>
     
     <!-- 添加用户对话框 -->
     <el-dialog
      title="添加员工"
      :visible.sync="addUserVisible"
      :key="dataKey"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addUserForm" :rules="addUserFormRul" ref="addUserFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="staff_code">
          <el-input v-model="addUserForm.staff_code"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="staff_phone">
          <el-input v-model="addUserForm.staff_phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="id_card">
          <el-input v-model="addUserForm.id_card"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="staff_age">
          <el-input v-model="addUserForm.staff_age"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="staff_home">
          <el-input v-model="addUserForm.staff_home"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="staff_gender">
           <el-radio v-model="addUserForm.staff_gender" label="male">男</el-radio>
          <el-radio v-model="addUserForm.staff_gender" label="female">女</el-radio>
        </el-form-item>
        <el-form-item label="民族" prop="staff_nationality">
          <el-input v-model="addUserForm.staff_nationality"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addUserForm.address"></el-input>
        </el-form-item>
         <el-form-item label="时薪" prop="salary_pre_hour">
          <el-input v-model="addUserForm.salary_pre_hour"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
           <el-select v-model="addUserForm.role" multiple placeholder="选择角色">
            <el-option
              v-for="role in rolesInfo"
              :key="role.id"
              :label="role.title"
              :value="role.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改用户对话框 -->
     <el-dialog
      title="修改员工信息"
      :visible.sync="editUserVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="editUserForm" :rules="addUserFormRul" ref="addUserFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="staff_code">
          <el-input v-model="editUserForm.staff_code" :disabled="true"></el-input>
        </el-form-item>
         <el-form-item label="身份证" prop="id_card">
          <el-input v-model="editUserForm.id_card" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="staff_phone">
          <el-input v-model="editUserForm.staff_phone"></el-input>
        </el-form-item>
        <el-form-item label="时薪" prop="salary_pre_hour">
          <el-input v-model="editUserForm.salary_pre_hour"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="staff_age">
          <el-input v-model="editUserForm.staff_age"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="staff_home">
          <el-input v-model="editUserForm.staff_home"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="staff_gender">
           <el-radio v-model="editUserForm.staff_gender" label="male">男</el-radio>
          <el-radio v-model="editUserForm.staff_gender" label="female">女</el-radio>
        </el-form-item>
        <el-form-item label="民族" prop="staff_nationality">
          <el-input v-model="editUserForm.staff_nationality"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editUserForm.address"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
           <el-select v-model="editUserForm.role" multiple placeholder="选择角色">
            <el-option
              v-for="role in rolesInfo"
              :key="role.id"
              :label="role.title"
              :value="role.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">更新</el-button>
      </span>
    </el-dialog>



    <!-- 修改用户diaolog对话框 -->
	 
	 <!-- <el-dialog align="left" title="修改用户" :visible.sync="editRoleVisible" width="50%" > -->
	 	<!--主体部分 -->
	 	<!-- <div>
			<p>当前的用户:<strong>{{currentname}}</strong></p>
			<p>当前的角色:<strong>{{currentRol}}</strong></p>
			<span>分配新角色:</span> <el-select v-model="selectVal" slot="prepend" placeholder="请选择">
								  <el-option label="王者" value="王者"></el-option>
								  <el-option label="黄铜" value="黄铜"></el-option>
								  <el-option label="钻石" value="钻石"></el-option>
								</el-select>
		</div>
		
	 	<span slot="footer" class="dialog-footer">
	 		<el-button @click="editRoleVisible = false">取 消</el-button>
	 		<el-button type="primary" @click="editRollist">确 定</el-button>
	 	</span>
	 </el-dialog> -->

   
  </div>
</template>

<script>
export default {
  data(){
      return{
        dataKey: false,
        // 请求用户列表的参数
        queryInfo:{
          query:"",
          page:1,
          page_size:10,
        },
        userList:[{
          id: "",
          username: "",
          staff_code: "",
          staff_gender: "",
          roles: {},
          date_joined: "",
          last_login: "",
        }
      ],
      // 当前数据总数
      total:0,
      // 添加用户显示或隐藏
      addUserVisible:false,
      // 修改用户信息显示或隐藏
      editUserVisible:false,
      // 添加用户数据
      addUserForm:{
        username: "",
        password: "",
        staff_code: "",
        staff_phone: "",
        staff_age: "",
        staff_home: "",
        staff_gender: "",
        staff_nationality: "",
        id_card: "",
        address: "",
        salary_pre_hour: "",
        role: [],
      },
      // 修改用户数据
      editUserForm:{
        u_id: "",
        username: "",
        staff_code: "",
        staff_phone: "",
        staff_age: "",
        staff_home: "",
        staff_gender: "",
        staff_nationality: "",
        id_card: "",
        address: "",
        salary_pre_hour: "",
        role: [],
      },
    // 用户表单校验规则
    addUserFormRul:{
        username: [
            { required: true, message: '请输入员工名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入初始密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ],
        staff_code: [
            { required: true, message: '请输入员工编号', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ],
        staff_phone: [
            { required: true, message: '请输入员工手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
          ],
        id_card: [
            { required: true, message: '请输入员工身份证编号', trigger: 'blur' },
            { min: 16, max: 16, message: '长度在16个字符', trigger: 'blur' }
          ]
    },
    //角色信息
    rolesInfo:[
      {
        "id": 1,
        "title": "管理员",
        "desc": "管理员",
        "permissions": []
        }
    ]
    }
  },
  mounted() {
  this.getRoleList();
  this.getUserList();
	},
  // 添加行为
  methods: {
    // 处理角色列表
    get_role_id(roles){
      const arr = roles.map((item,index) => {
            return item.id}); 
      console.log(arr)
      return arr;
    },
    //请求角色列表
    getRoleList(){
      this.$axios.get(this.api + '/role/list', {params:{page_size: 100000}})
        .then(res=>{
          this.rolesInfo = res.data.list;
      })
    },
    //请求用户列表数据
    getUserList(){
      this.$axios.get(this.api + '/user/list', {params:this.queryInfo})
        .then(res=>{
          this.userList = res.data.list;
          this.total = res.data.pagination.total;
          this.dataKey = !this.dataKey;
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      console.log(this.queryInfo)
      console.log("page")
      this.getUserList();
    },
    // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      console.log(this.queryInfo)
      console.log("page_sie")
      this.getUserList();
    },
    // 添加员工事件
    addUser(){
      //校验规则
      this.$refs.addUserFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post(this.api + '/user/create', this.addUserForm)
            .then(res=>{
            // todo
            this.getUserList();
        })
      })
      //关闭对话框
      this.addUserVisible = !this.addUserVisible;
      // 刷新列表
      this.getUserList();
      
    },
    // 编辑用户
    editUser(user){
        
        this.$axios.get(this.api + '/user/info', {params:{u_id:user.id}})
            .then(res=>{
              console.log(res)
            this.editUserForm.u_id = res.data.data.id;
            this.editUserForm.username = res.data.data.username;
            this.editUserForm.staff_code = res.data.data.staff_code;
            this.editUserForm.staff_phone = res.data.data.staff_phone;
            this.editUserForm.staff_age = res.data.data.staff_age;
            this.editUserForm.staff_home = res.data.data.staff_home;
            this.editUserForm.staff_gender = res.data.data.staff_gender;
            this.editUserForm.staff_nationality = res.data.data.staff_nationality;
            this.editUserForm.id_card = res.data.data.id_card;
            this.editUserForm.address = res.data.data.address;
            this.editUserForm.salary_pre_hour = res.data.data.salary_pre_hour;
            this.editUserForm.role = this.get_role_id(res.data.data.roles);
            console.log(this.editUserForm)
        });
        this.editUserVisible = true;
        this.getUserList();
    },
    // 编辑信息
    editUserInfo(){
        console.log(this.editUserForm)
        this.$refs.addUserFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.put(this.api + '/user/update', this.editUserForm)
            .then(res=>{
            // todo
            console.log(res)
        })
      })
      //关闭对话框
      this.editUserVisible = !this.editUserVisible;
      // 刷新列表
      this.getUserList();
    },
    // 删除用户
    deleteUser(user){
      this.$axios.delete(this.api + '/user/delete', {params:{u_id:user.id}})
            .then(res=>{
              console.log(res)
              this.getUserList();
        });
    },
    
  }
}
</script>
<style scoped="scoped">
 
</style>