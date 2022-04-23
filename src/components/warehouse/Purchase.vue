<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>采购列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="4">
              <el-select v-model="queryInfo.status" clearable placeholder="请选择">
                <el-option
                v-for="item in statusInfo"
                :key="item.label"
                :label="item.value"
                :value="item.label">
                </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryInfo.good_name" placeholder="请输入内容" class="input-with-select" clearable @clear="getPurchaseList">
              <el-button slot="append" icon="el-icon-search" @click="getPurchaseList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addPurchaseVisible=!addPurchaseVisible">添加采购单</el-button>
          </el-col>
        </el-row>
                 <!-- 渲染数据表格 -->
        <el-table
        :data="PurchaseList"
        :key="dataKey"
        height="100%"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="good_name.good_name" label="原料" width="180"> </el-table-column>
            <el-table-column prop="good_version" label="型号"> </el-table-column>
            <el-table-column prop="good_num" label="数量"> </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>
            <el-table-column prop="total_price" label="总价"> </el-table-column>
            <el-table-column prop="apply_date" label="申请时间"> </el-table-column>
            <el-table-column prop="apply_staff_name.username" label="申请人"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top" >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editPurchase(scope.row)" ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="审核" placement="top" v-if="scope.row.status==1?true:false">
                  <el-button type="danger" icon="el-icon-s-claim" size="mini" @click="auditPurchase(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="采购" placement="top" v-if="scope.row.status==2?true:false">
                  <el-button type="danger" icon="el-icon-s-order" size="mini" @click="purchasePurchase(scope.row)"></el-button>
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
      title="添加采购单"
      :visible.sync="addPurchaseVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addPurchaseForm" :rules="addPurchaseFormRul" ref="addPurchaseFormRef" label-width="100px" class="demo-ruleForm">
         <el-form-item label="产品" prop="good_name">
           <el-select v-model="addPurchaseForm.good_name" clearable placeholder="选择产品">
            <el-option
              v-for="product in goodInfo"
              :key="product.id"
              :label="product.good_name"
              :value="product.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="good_version">
          <el-input v-model="addPurchaseForm.good_version"></el-input>
        </el-form-item>
        <el-form-item label="采购数量" prop="good_num">
          <el-input v-model="addPurchaseForm.good_num"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="addPurchaseForm.unit"></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input v-model="addPurchaseForm.price"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="total_price">
          <el-input v-model="addPurchaseForm.total_price"></el-input>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurchaseVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPurchase">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改角色对话框 -->
     <el-dialog
      title="修改角色"
      :visible.sync="editPurchaseVisible"
      width="50%"
      align="left">
      <span slot="title" class="dialog-title">
        <el-switch
        v-model="value"
        @change="changeEdit">
        </el-switch>
      </span>
      <!-- 内容区 -->
      <el-form :model="editPurchaseForm" :rules="addPurchaseFormRul" ref="addPurchaseFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品" prop="good_name">
           <el-select v-model="editPurchaseForm.good_name" clearable placeholder="选择产品" :disabled="dialogDisable">
            <el-option
              v-for="product in goodInfo"
              :key="product.id"
              :label="product.good_name"
              :value="product.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="good_version">
          <el-input v-model="editPurchaseForm.good_version" :disabled="dialogDisable"></el-input>
        </el-form-item>
        <el-form-item label="采购数量" prop="good_num">
          <el-input v-model="editPurchaseForm.good_num" :disabled="dialogDisable"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="editPurchaseForm.unit" :disabled="dialogDisable"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editPurchaseForm.price" :disabled="dialogDisable"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="total_price">
          <el-input v-model="editPurchaseForm.total_price" :disabled="dialogDisable"></el-input>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editPurchaseVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPurchaseInfo" :disabled="dialogDisable">确 定</el-button>
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
        // 请求角色列表的参数
        queryInfo:{
          good_name:"",
          status:"",
          page:1,
          page_size:10,
        },
        statusInfo:[
             {
            value:"--",
            label:0
          },
            {
            value:"编辑",
            label:1
          },
          {
            value:"审核",
            label:2
          },
          {
            value:"采购",
            label:3
          },
        ],
        //添加弹话框
        addPurchaseVisible:false,
        // 编辑弹话框
        editPurchaseVisible:false,
        isA:true,
        isP:false,
        // 角色信息
        PurchaseList:[
          {
            id: 0,
            apply_date: "",
            apply_staff_name: {},
            buyer_date: "",
            buyer_name: {},
            good_name: {},
            good_num: "",
            good_version: "",
            price: "",
            sanction_date: "",
            sanction_staff_name: {},
            status: 0,
            total_price: "",
            unit: "",
          }
        ],
        // 当前数据总数
        total:0,
        // 添加角色数据
        addPurchaseForm:{
          id:0,
          good_name: "",
          good_version: "",
          good_num: "",
          price: "",
          total_price: "",
          unit: "",
          status:0,
        },
        // 添加角色数据
        editPurchaseForm:{
          id:0,
          good_name: "",
          good_version: "",
          good_num: "",
          price: "",
          total_price: "",
          unit: "",
          status:0,
        },
        // 用户表单校验规则
        addPurchaseFormRul:{
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
        goodInfo:[
          {
              id: 1,
              good_name: "",
          }
        ],
      }
  },
  mounted() {
      this.getPurchaseList();
      this.getGoodList();
	},
  
  // 添加行为
  methods: {
    changeEdit(){
        this.dialogDisable = !this.value;
    },
    // 产品信息
    getGoodList(){
      this.$axios.get(this.api + "/good/list")
      .then(res=>{
        this.goodInfo = res.data.list;
      })
    },
    // 信息
    getPurchaseList(){
      if (this.queryInfo.status === ""){
          this.queryInfo.status = 0;
      }
      this.$axios.get(this.api + "/purchase/list", {params:this.queryInfo})
      .then(res=>{
        this.PurchaseList = res.data.list;
        this.total = res.data.pagination.total;
        this.dataKey = !this.dataKey;
        console.log(this.PurchaseList[0].status)
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      this.getPurchaseList();
    },
    // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      this.getPurchaseList();
    },
    // 添加事件
    addPurchase(){
      //校验规则
      this.$refs.addPurchaseFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post(this.api + '/purchase/create', this.addPurchaseForm)
            .then(res=>{
            // 刷新列表
            this.getPurchaseList();
        })
      });
      //关闭对话框
      this.addPurchaseVisible = !this.addPurchaseVisible;
    },
    editPurchase(purchase){
        this.editPurchaseVisible = true;
        this.dialogDisable = true;
        this.value = false;
        this.editPurchaseForm = purchase;
        console.log(this.editPurchaseForm)
    },
    // 编辑用户信息
    editPurchaseInfo(){
      this.$axios.put(this.api + '/purchase/update', this.editPurchaseForm)
      .then(res=>{
        this.getPurchaseList()
      });
      this.editPurchaseVisible = false;
      this.dialogDisable = false;

    },
    // 审核
    auditPurchase(purchase){
        this.$axios.get(this.api + '/purchase/audit', {params:{id:purchase.id}})
        .then(res=>{
        this.getPurchaseList()
      });
    },
    //采购
    purchasePurchase(purchase){
        this.$axios.get(this.api + '/purchase/purchase', {params:{id:purchase.id}})
            .then(res=>{
            this.getPurchaseList()
      });
    },
  }
}
</script>
<style scoped="scoped">
 
</style>