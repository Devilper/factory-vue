<template>
  <div>
     <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品列表</el-breadcrumb-item>
      </el-breadcrumb>
       <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input  v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getProductList">
              <el-button slot="append" icon="el-icon-search" @click="getProductList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addProductVisible=!addProductVisible">添加产品</el-button>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="2" v-for="(product) in productList" :key="product.id">  
            <el-card :body-style="{ padding: '15px' ,spacing: '10px'}">
            <div style="padding: 10px;">
                <span>{{product.product_name}}</span>
                <div class="bottom clearfix">
                <el-button type="text" class="button" @click="editGoodInfo(product)">编辑</el-button>
                </div>
            </div>
            </el-card>
        </el-col>
      </el-row>
       </el-card>
           <!-- 添加角色对话框 -->
     <el-dialog
      title="添加角色"
      :visible.sync="addProductVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addProductForm" :rules="addProductFormRul" ref="addProductFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称" prop="product_name" >
          <el-input v-model="addProductForm.product_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addProductVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProduct">确 定</el-button>
      </span>
    </el-dialog>

     <!-- 添加角色对话框 -->
     <el-dialog
      title="修改产品"
      :visible.sync="editProductVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="editProductForm" :rules="addProductFormRul" ref="addProductFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称" prop="product_name" >
          <el-input v-model="editProductForm.product_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editProductVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProduct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
      return {
          productList:[
              {
                  id:0,
                  product_name:"1"
              },

          ],
          addProductVisible:false,
          editProductVisible:false,
          queryInfo:{
              query:""
          },
          addProductForm:{
              product_name:""
          },
          editProductForm:{
              id:"",
              product_name:""
          },
          addProductFormRul:{
              product_name: [
                { required: true, message: '请输入产品名称', trigger: 'blur' },
              ],
          },
          addRoleVisible: false,
      }
  },
  methods:{
      getProductList(){
          this.$axios.get("http://127.0.0.1:8000/api/product/list",  {params:this.queryInfo})
            .then(res=>{
                this.productList = res.data.list;
            })
      },
      addProduct(){
          this.$axios.post("http://127.0.0.1:8000/api/product/create",  this.addProductForm)
            .then(res=>{
                this.getProductList();
            })
            this.addProductVisible = !this.addProductVisible;
      },
      editProduct(){
        this.$axios.put("http://127.0.0.1:8000/api/product/update",  this.editProductForm)
            .then(res=>{
                this.getProductList();
            })
            this.editProductVisible = !this.editProductVisible;
      },
      editGoodInfo(product){
          console.log(product);
          this.editProductForm = product;
          this.editProductVisible = !this.addProductVisible;
      },
  },
  mounted() {
      this.getProductList();
  }
}
</script>

