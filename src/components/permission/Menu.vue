<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getMenuList">
              <el-button slot="append" icon="el-icon-search" @click="getMenuList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addMenuVisible=!addMenuVisible">添加菜单</el-button>
          </el-col>
        </el-row>
                 <!-- 渲染数据表格 -->
        <el-table
        :data="menuList"
        :key="dataKey"
        height="250"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="title" label="菜单" width="180"> </el-table-column>
            <!-- <el-table-column prop="desc" label="描述"> </el-table-column> -->
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑信息" placement="top" >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMenu(scope.row)" ></el-button>
                </el-tooltip> 
                <!-- <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteMenu(scope.row)"></el-button>
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
      title="添加菜单"
      :visible.sync="addMenuVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addMenuForm" :rules="addMenuFormRul" ref="addMenuFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单" prop="title">
          <el-input v-model="addMenuForm.title"></el-input>
        </el-form-item>
        <el-form-item label="icon" prop="icon">
          <el-input v-model="addMenuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别" prop="position">
           <el-select v-model="addMenuForm.position" placeholder="选择菜单级别">
            <el-option
              v-for="level in menuLevelInfo"
              :key="level.id"
              :label="level.title"
              :value="level.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改角色对话框 -->
     <el-dialog
      title="修改菜单"
      :visible.sync="editMenuVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="editMenuForm" :rules="addMenuFormRul" ref="addMenuFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单" prop="title">
          <el-input v-model="editMenuForm.title"></el-input>
        </el-form-item>
        <el-form-item label="icon" prop="icon">
          <el-input v-model="editMenuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别" prop="position">
           <el-select v-model="editMenuForm.position" placeholder="选择菜单级别">
            <el-option
              v-for="level in menuLevelInfo"
              :key="level.id"
              :label="level.title"
              :value="level.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMenuInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
  
</template>

<script>
export default {
  data(){
      return{
        // 重新渲染key
        dataKey: false,
        // 请求角色列表的参数
        queryInfo:{
          query:"",
          page:1,
          page_size:10,
        },
        //添加弹话框
        addMenuVisible:false,
        // 编辑弹话框
        editMenuVisible:false,
        // 角色信息
        menuList:[
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
        addMenuForm:{
          icon: "",
          id: 0,
          position: "",
          title: ""
        },
        // 添加角色数据
        editMenuForm:{
          icon: "",
          id: 0,
          position: "",
          title: ""
        },
        // 用户表单校验规则
        addMenuFormRul:{
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
        menuLevelInfo:[
          {
            	id: 1,
              title: "1级菜单",
          },
           {
            	id: 2,
              title: "2级菜单",
          },
           {
            	id: 3,
              title: "3级菜单",
          }
        ]
      }
  },
  mounted() {
      this.getMenuList();
	},
  // 添加行为
  methods: {
    getMenuList(){
      this.$axios.get("http://127.0.0.1:8000/api/menu/list", {params:this.queryInfo})
      .then(res=>{
        console.log(res.data)
        this.menuList = res.data.list;
        this.total = res.data.pagination.total;
        this.dataKey = !this.dataKey;
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      this.getMenuList();
    },
    // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      this.getMenuList();
    },
    // 添加员工事件
    addMenu(){
      //校验规则
      this.$refs.addMenuFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post('http://127.0.0.1:8000/api/menu/create', this.addMenuForm)
            .then(res=>{
            // todo
        })
      });
      //关闭对话框
      this.getMenuList();
      this.addMenuVisible = !this.addMenuVisible;
      // 刷新列表
      console.log("creare")
    },
    editMenu(menu){
        this.editMenuVisible = true;
        this.editMenuForm = menu;
    },
    // 删除用户
    deleteMenu(role){
      this.$axios.delete('http://127.0.0.1:8000/api/menu/delete', {params:{r_id:role.id}})
            .then(res=>{
              this.getMenuList();
        });
    },
    // 编辑用户信息
    editMenuInfo(){
      console.log(this.editMenuForm)
      this.$axios.put('http://127.0.0.1:8000/api/menu/update', this.editMenuForm)
      .then(res=>{
        console.log(res)
      });
      this.getMenuList();
      this.editMenuVisible = false;
    },
    create(){
      this.getMenuList();
    }
  }
}
</script>
<style scoped="scoped">
 
</style>