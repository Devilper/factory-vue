<template>
  <div>
     <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>原料列表</el-breadcrumb-item>
      </el-breadcrumb>
       <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input  v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getGoodsList">
              <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addGoodsVisible=!addGoodsVisible">添加原料</el-button>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="2" v-for="(good) in goodList" :key="good.id">  
            <el-card :body-style="{ padding: '15px' ,spacing: '10px'}">
            <div style="padding: 10px;">
                <span>{{good.good_name}}</span>
                <div class="bottom clearfix">
                <el-button type="text" class="button" @click="editGoodInfo(good)">编辑</el-button>
                </div>
            </div>
            </el-card>
        </el-col>
      </el-row>
       </el-card>
           <!-- 添加角色对话框 -->
     <el-dialog
      title="添加角色"
      :visible.sync="addGoodsVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addGoodsForm" :rules="addGoodsFormRul" ref="addGoodsFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原料名称" prop="good_name" >
          <el-input v-model="addGoodsForm.good_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGoods">确 定</el-button>
      </span>
    </el-dialog>

     <!-- 添加角色对话框 -->
     <el-dialog
      title="修改原料"
      :visible.sync="editGoodsVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="editGoodsForm" :rules="addGoodsFormRul" ref="addGoodsFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原料名称" prop="good_name" >
          <el-input v-model="editGoodsForm.good_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editGoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
      return {
          goodList:[
              {
                  id:0,
                  good_name:"1"
              },

          ],
          addGoodsVisible:false,
          editGoodsVisible:false,
          queryInfo:{
              query:""
          },
          addGoodsForm:{
              good_name:""
          },
          editGoodsForm:{
              id:"",
              good_name:""
          },
          addGoodsFormRul:{
              good_name: [
                { required: true, message: '请输入原料名称', trigger: 'blur' },
              ],
          },
          addRoleVisible: false,
      }
  },
  methods:{
      getGoodsList(){
          this.$axios.get("http://127.0.0.1:8000/api/good/list",  {params:this.queryInfo})
            .then(res=>{
                this.goodList = res.data.list;
            })
      },
      addGoods(){
          this.$axios.post("http://127.0.0.1:8000/api/good/create",  this.addGoodsForm)
            .then(res=>{
                this.getGoodsList();
            })
            this.addGoodsVisible = !this.addGoodsVisible;
      },
      editGoods(){
        this.$axios.put("http://127.0.0.1:8000/api/good/update",  this.editGoodsForm)
            .then(res=>{
                this.getGoodsList();
            })
            this.editGoodsVisible = !this.editGoodsVisible;
      },
      editGoodInfo(good){
          console.log(good);
          this.editGoodsForm = good;
          this.editGoodsVisible = !this.addGoodsVisible;
      },
  },
  mounted() {
      this.getGoodsList();
  }
}
</script>

