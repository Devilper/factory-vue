<template>
    <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
                  <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getOrderList">
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addOrderVisible=!addOrderVisible">添加订单</el-button>
          </el-col>
        </el-row>
         <!-- 渲染数据表格 -->
        <el-table
        :data="OrderList"
        :key="dataKey"
        height="100%"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="order_name.product_name" label="产品" width="180"> </el-table-column>
            <el-table-column prop="order_client" label="客户"> </el-table-column>
            <el-table-column prop="order_number" label="数量"> </el-table-column>
            <el-table-column prop="order_price" label="单价"> </el-table-column>
            <el-table-column prop="order_total_price" label="总价"> </el-table-column>
            <el-table-column prop="order_time" label="订货时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrder(scope.row)" ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="确认" placement="top" v-if="scope.row.status==1?true:false">
                  <el-button type="danger" icon="el-icon-s-claim" size="mini" @click="auditOrder(scope.row)"></el-button>
                </el-tooltip>
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
      title="添加生产单"
      :visible.sync="addOrderVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->

      <el-form :model="addOrderForm" :rules="addOrderFormRul" ref="addOrderFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户" prop="order_client" >
          <el-input v-model="addOrderForm.order_client"></el-input>
        </el-form-item>
         <el-form-item label="产品" prop="order_name">
           <el-select v-model="addOrderForm.order_name" clearable placeholder="选择产品">
            <el-option
              v-for="product in productInfo"
              :key="product.id"
              :label="product.product_name"
              :value="product.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="order_number" >
          <el-input v-model="addOrderForm.order_number"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="order_price">
          <el-input v-model="addOrderForm.order_price"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="order_total_price">
          <el-input v-model="addOrderForm.order_total_price"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrder">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色对话框 -->
     <el-dialog
      title="修改生产单"
      :visible.sync="editOrderVisible"
      width="50%"
      align="left">
      <span slot="title" class="dialog-title">
        <el-switch
        v-model="value"
        @change="changeEdit"
        :disabled="switchDisable">
        </el-switch>
      </span>
      <!-- 内容区 -->
      <el-form :model="editOrderForm" :rules="addOrderFormRul" ref="addOrderFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户" prop="order_client" >
          <el-input v-model="editOrderForm.order_client" :disabled="true"></el-input>
        </el-form-item>
         <el-form-item label="产品" prop="order_name">
           <el-select v-model="editOrderForm.order_name" clearable placeholder="选择产品" :disabled="true">
            <el-option
              v-for="product in productInfo"
              :key="product.id"
              :label="product.product_name"
              :value="product.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="order_number" >
          <el-input v-model="editOrderForm.order_number" ></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="order_price">
          <el-input v-model="editOrderForm.order_price"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="order_total_price">
          <el-input v-model="editOrderForm.order_total_price"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrderInfo" :disabled="dialogDisable">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
              return{
        dialogDisable: false,
        value: false,
        dataKey: false,
        switchDisable: false,
        // 请求角色列表的参数
        queryInfo:{
          query:"",
          page:1,
          page_size:10,
        },
         userInfo:[
          {
            id:0,
            username:""
          }
        ],
        //添加弹话框
        addOrderVisible:false,
        // 编辑弹话框
        editOrderVisible:false,
        isA:true,
        isP:false,
        // 角色信息
        OrderList:[
          {
            id: 0,
            order_name: {
                product_name:"产品一号"
            },
            order_client: "1号客户",
            order_number: 100,
            order_price: 10,
            order_total_price: 1000,
            order_time: "2022-04-01",
            status: "下单",
          }
        ],
        // 当前数据总数
        total:0,
        // 添加角色数据
        addOrderForm:{
          id:0,
          order_client: "",
          order_name: 0,
          order_number: 0,
          order_price: 0,
          order_total_price: "",
        },
        // 添加角色数据
        editOrderForm:{
          id:0,
          order_client: "",
          order_name: 0,
          order_number: 0,
          order_price: 0,
          order_total_price: "",
        },
        // 用户表单校验规则
        addOrderFormRul:{
            order_client: [
                { required: true, message: '请输入用户名称', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
              ],
            order_name: [
                { required: true, message: '请选择产品', trigger: 'blur' },
              ]
        },
        //权限信息
        productInfo:[
          {
              id: 1,
              product_name: "",
          }
        ],
      }
    },
    mounted() {
    //   this.getOrderList();
    //   this.getProductList();
      this.getOrderList();
	},
    methods:{
        changeEdit(){
          this.dialogDisable = !this.value;
    },
        getProductList(){
      this.$axios.get(this.api + "/order/list")
      .then(res=>{
        this.productInfo = res.data.list;
      })
    },
        getOrderList(){
      this.$axios.get(this.api + "/order/list", {params:this.queryInfo})
      .then(res=>{
        this.OrderList = res.data.list;
        this.total = res.data.pagination.total;
        this.dataKey = !this.dataKey;
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      this.getOrderList();
    },
        // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      this.getOrderList();
    },
    // 添加事件
    addOrder(){
      //校验规则
      this.$refs.addOrderFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post(this.api + '/order/create', this.addOrderForm)
            .then(res=>{
            // 刷新列表
            this.getOrderList();
        })
      });
      //关闭对话框
      this.addOrderVisible = !this.addOrderVisible;
    },
     editOrder(produce){
        this.editOrderVisible = true;
        this.dialogDisable = true;
        this.value = false;
        this.editOrderForm = produce;
        console.log(this.editOrderForm.status)
        if (this.editOrderForm.status == 2){
          this.switchDisable = true;
        }else{
          console.log("sss")
          this.switchDisable = false;
        }
    },
    // 编辑用户信息
    editOrderInfo(){
      this.$axios.put(this.api + '/order/update', this.editOrderForm)
      .then(res=>{
        this.getOrderList()
      });
      this.editOrderVisible = false;
      this.dialogDisable = false;
    },
        // 审核
    auditOrder(produce){
        this.$axios.get(this.api + '/order/confirm', {params:{id:produce.id}})
        .then(res=>{
        this.getOrderList()
      });
    }
    }
}
</script>
<style scoped="scoped">
 
</style>
