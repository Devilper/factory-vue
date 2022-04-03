<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getPermList">
              <el-button slot="append" icon="el-icon-search" @click="getPermList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addPermVisible=!addPermVisible">添加权限</el-button>
          </el-col>
        </el-row>
                 <!-- 渲染数据表格 -->
        <el-table
        :data="permList"
        height="250"
        :key="dataKey"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="title" label="名称" width="180"> </el-table-column>
            <el-table-column prop="url" label="路由"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑信息" placement="top" >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editPerm(scope.row)" ></el-button>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletePerm(scope.row)"></el-button>
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
      :visible.sync="addPermVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addPermForm" :rules="addPermFormRul" ref="addPermFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="权限名称" prop="title">
          <el-input v-model="addPermForm.title"></el-input>
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="addPermForm.url"></el-input>
        </el-form-item>
        <el-form-item label="菜单" prop="menu">
           <el-select v-model="addPermForm.menu" placeholder="选择菜单">
            <el-option
              v-for="menu in menuInfo"
              :key="menu.id"
              :label="menu.title"
              :value="menu.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="父级权限" prop="parent">
           <el-select v-model="addPermForm.parent" clearable placeholder="选择权限">
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
        <el-button @click="addPermVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPerm">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改角色对话框 -->
     <el-dialog
      title="添加角色"
      :visible.sync="editPermVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="editPermForm" :rules="addPermFormRul" ref="addPermFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="权限名称" prop="title">
          <el-input v-model="editPermForm.title"></el-input>
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="editPermForm.url"></el-input>
        </el-form-item>
        <el-form-item label="菜单" prop="menu">
           <el-select v-model="editPermForm.menu" placeholder="选择菜单">
            <el-option
              v-for="menu in menuInfo"
              :key="menu.id"
              :label="menu.title"
              :value="menu.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="父级权限" prop="parent">
           <el-select v-model="editPermForm.parent" clearable placeholder="选择权限">
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
        <el-button @click="editPermVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPermInfo">确 定</el-button>
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
        addPermVisible:false,
        // 编辑弹话框
        editPermVisible:false,
        // 角色信息
        permList:[
          {
            id: 0,
            action: "",
            title: "",
            menu: "",
            parent: "",
            url: ""
          }
        ],
        // 当前数据总数
        total:0,
        // 添加角色数据
        addPermForm:{
            id: 0,
            action: undefined,
            title: "",
            menu: undefined,
            parent: undefined,
            url: ""
        },
        // 添加角色数据
        editPermForm:{
            id: 0,
            action: undefined,
            title: "",
            menu: undefined,
            parent: undefined,
            url: ""
        },
        // 用户表单校验规则
        addPermFormRul:{
            title: [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
              ],
            url: [
                { required: true, message: '请输入角色路由', trigger: 'blur' },
                { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
              ],
            menu: [
                { required: true, message: '请输入角色路由', trigger: 'blur' },
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
        ],
         menuInfo:[
           {
            id: "",
            desc: "",
            title: "",
            p_id: []
          }
        ],
      }
  },
  mounted() {
      this.getPermList();
      this.getMenuList();
	},
  // 添加行为
  methods: {
    getPermList(){
     this.$axios.get("http://127.0.0.1:8000/api/permission/list",  {params:this.queryInfo})
      .then(res=>{
        this.permList = res.data.list;
        this.total = res.data.pagination.total;
        this.permissionInfo = res.data.list;
        this.dataKey = !this.dataKey;
      })
    },
    getMenuList(){
      this.$axios.get("http://127.0.0.1:8000/api/menu/list",{params: {page_size: 100000}})
      .then(res=>{
        console.log(res.data)
        this.menuInfo = res.data.list;
        console.log("menu")
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpagesize){
      this.queryInfo.page_size = newpagesize;
      this.getPermList();
    },
    // 当前页码发生改变
    currentChange(newpage){
      this.queryInfo.page = newpage;
      this.getPermList();
    },
    // 添加权限事件
    addPerm(){
      //校验规则
      this.$refs.addPermFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        console.log("perm")
        console.log(this.addPermForm)
        this.$axios.post('http://127.0.0.1:8000/api/permission/create', this.addPermForm)
            .then(res=>{
            // todo
        })
      });
      //关闭对话框
      this.addPermVisible = !this.addPermVisible;
      // 刷新列表
      this.getPermList();
      console.log(this.permList)
      
    },
    editPerm(perm){
      console.log("pernm")
      console.log(this.menuInfo)
      this.editPermVisible = true;
      this.editPermForm = perm;
    },
    // 编辑权限信息
    editPermInfo(){
      this.$axios.put('http://127.0.0.1:8000/api/permission/update', this.editPermForm)
      .then(res=>{
        console.log(res)
        this.getPermList()
      });
      this.editPermVisible = false;
      this.getPermList();
    },
  }
}
</script>
<style scoped="scoped">
 
</style>