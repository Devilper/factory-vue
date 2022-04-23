<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getRoleList">
              <el-button slot="append" icon="el-icon-search" @click="getRoleList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addRoleVisible=!addRoleVisible">添加角色</el-button>
          </el-col>
        </el-row>
                 <!-- 渲染数据表格 -->
        <el-table
        :data="roleList"
        :key="dataKey"
        height="100%"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="title" label="角色" width="180"> </el-table-column>
            <el-table-column prop="desc" label="描述"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑信息" placement="top" >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRole(scope.row)" ></el-button>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(scope.row)"></el-button>
                </el-tooltip> -->
                <!-- <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                  <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                </el-tooltip> -->
              </template>
            </el-table-column>
        </el-table>

        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page.sync="queryInfo.page"
          :page-sizes="[1,10,20,50]"
          :page-size="queryInfo.page_size"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </el-card>

           <!-- 添加角色对话框 -->
     <el-dialog
      title="添加角色"
      :visible.sync="addRoleVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addRoleForm" :rules="addRoleFormRul" ref="addRoleFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色" prop="title">
          <el-input v-model="addRoleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="addRoleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
           <el-select v-model="addRoleForm.p_id" multiple placeholder="选择角色">
            <el-option
              v-for="permission in permissionInfo"
              :key="permission.id"
              :label="permission.title"
              :value="permission.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改角色对话框 -->
     <el-dialog
      title="修改角色"
      :visible.sync="editRoleVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="editRoleForm" :rules="addRoleFormRul" ref="addRoleFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色" prop="title">
          <el-input v-model="editRoleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="editRoleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
           <el-select v-model="editRoleForm.p_id" multiple placeholder="选择权限">
            <el-option
              v-for="permission in permissionInfo"
              :key="permission.id"
              :label="permission.title"
              :value="permission.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
  
</template>

<script>
export default {
  data(){
      return{
        dataKey: false,
        // 请求角色列表的参数
        queryInfo:{
          query:"",
          page:1,
          page_size:10,
        },
        //添加弹话框
        addRoleVisible:false,
        // 编辑弹话框
        editRoleVisible:false,
        // 角色信息
        roleList:[
          {
            id: 0,
            desc: "",
            title: "",
            p_id: []
          }
        ],
        // 当前数据总数
        total:0,
        // 添加角色数据
        addRoleForm:{
          id:0,
          title: "",
          desc: "",
          p_id: [],
        },
        // 添加角色数据
        editRoleForm:{
          id: 0,
          title: "",
          desc: "",
          p_id: [],
        },
        // 用户表单校验规则
        addRoleFormRul:{
            title: [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
              ],
            desc: [
                { required: true, message: '请输入角色描述', trigger: 'blur' },
                { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
              ]
        },
        //权限信息
        permissionInfo:[
          {
            	id: 1,
              title: "用户列表",
              url: "/user/",
              action: 1,
              parent: null,
              menu: 1
          }
        ]
      }
  },
  mounted() {
      this.getRoleList();
      this.getPermissionList();
	},
  
  // 添加行为
  methods: {
    // 权限信息
    getPermissionList(){
      this.$axios.get(this.api + "/permission/list", {params: {page_size: 100000}})
      .then(res=>{
        this.permissionInfo = res.data.list;
      })
    },
    // 角色信息
    getRoleList(){
      this.$axios.get(this.api + "/role/list", {params:this.queryInfo})
      .then(res=>{
        this.roleList = res.data.list;
        this.total = res.data.pagination.total;
        this.dataKey = !this.dataKey;
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      this.getRoleList();
    },
    // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      this.getRoleList();
    },
    // 添加员工事件
    addRole(){
      //校验规则
      this.$refs.addRoleFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post(this.api + '/role/create', this.addRoleForm)
            .then(res=>{
            // todo
        })
      });
      //关闭对话框
      this.addRoleVisible = !this.addRoleVisible;
      // 刷新列表
      this.getRoleList();
      
    },
    editRole(role){
        this.editRoleVisible = true;
        this.editRoleForm = role;
    },
    // 删除用户
    deleteRole(role){
      this.$axios.delete(this.api + '/role/delete', {params:{r_id:role.id}})
            .then(res=>{
              this.getRoleList();
        });
    },
    // 编辑用户信息
    editRoleInfo(){
      console.log(this.editRoleForm)
      this.$axios.put(this.api + '/role/update', this.editRoleForm)
      .then(res=>{
        console.log(res)
        this.getRoleList()
      });
      this.editRoleVisible = false;

    },
  }
}
</script>
<style scoped="scoped">
 
</style>