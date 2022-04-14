<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>生产列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索头部按钮 -->
        <el-row :gutter="14">
          <el-col :span="3">
              <el-select v-model="queryInfo.staff_name" clearable placeholder="请选择员工">
                <el-option
                v-for="item in userInfo"
                :key="item.id"
                :label="item.username"
                :value="item.username">
                </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
             <el-select v-model="queryInfo.product_name" clearable placeholder="请选择产品">
                <el-option
                v-for="item in productInfo"
                :key="item.id"
                :label="item.product_name"
                :value="item.product_name">
                </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
              <el-button type="primary" @click="getProduceList">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addProduceVisible=!addProduceVisible">添加生产单</el-button>
          </el-col>
        </el-row>
                 <!-- 渲染数据表格 -->
        <el-table
        :data="ProduceList"
        :key="dataKey"
        height="250"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="product_name.product_name" label="产品" width="180"> </el-table-column>
            <el-table-column prop="today_done_num" label="产量"> </el-table-column>
            <el-table-column prop="qualified_num" label="合格量"> </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>
            <el-table-column prop="staff_name.username" label="员工"> </el-table-column>
            <el-table-column prop="current_time" label="日期"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editProduce(scope.row)" ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="确认" placement="top" v-if="scope.row.status==1?true:false">
                  <el-button type="danger" icon="el-icon-s-claim" size="mini" @click="auditProduce(scope.row)"></el-button>
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
      :visible.sync="addProduceVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addProduceForm" :rules="addProduceFormRul" ref="addProduceFormRef" label-width="100px" class="demo-ruleForm">
         <el-form-item label="产品" prop="product_name">
           <el-select v-model="addProduceForm.product_name" clearable placeholder="选择产品">
            <el-option
              v-for="product in productInfo"
              :key="product.id"
              :label="product.product_name"
              :value="product.product_name">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="今日产量" prop="today_done_num" >
          <el-input v-model="addProduceForm.today_done_num"></el-input>
        </el-form-item>
        <el-form-item label="合格量" prop="qualified_num">
          <el-input v-model="addProduceForm.qualified_num"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="addProduceForm.unit"></el-input>
        </el-form-item>

        <el-form-item label="员工" prop="staff_name">
           <el-select v-model="addProduceForm.staff_name" clearable placeholder="选择员工">
            <el-option
                v-for="item in userInfo"
                :key="item.id"
                :label="item.username"
                :value="item.username">
            </el-option>
           </el-select>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addProduceVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProduce">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改角色对话框 -->
     <el-dialog
      title="修改生产单"
      :visible.sync="editProduceVisible"
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
      <el-form :model="editProduceForm" :rules="addProduceFormRul" ref="addProduceFormRef" label-width="100px" class="demo-ruleForm">
         <el-form-item label="产品" prop="product_name">
           <el-select v-model="editProduceForm.product_name" clearable placeholder="选择产品" :disabled="dialogDisable">
            <el-option
              v-for="product in productInfo"
              :key="product.id"
              :label="product.product_name"
              :value="product.product_name">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="今日产量" prop="today_done_num">
          <el-input v-model="editProduceForm.today_done_num" :disabled="dialogDisable"></el-input>
        </el-form-item>
        <el-form-item label="合格量" prop="qualified_num">
          <el-input v-model="editProduceForm.qualified_num" :disabled="dialogDisable"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="editProduceForm.unit" :disabled="dialogDisable"></el-input>
        </el-form-item>

        <el-form-item label="员工" prop="staff_name">
           <el-select v-model="editProduceForm.staff_name" clearable placeholder="选择员工" :disabled="dialogDisable">
            <el-option
                v-for="item in userInfo"
                :key="item.id"
                :label="item.username"
                :value="item.username">
            </el-option>
           </el-select>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editProduceVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProduceInfo" :disabled="dialogDisable">确 定</el-button>
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
          staff_name:"",
          product_name:"",
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
        addProduceVisible:false,
        // 编辑弹话框
        editProduceVisible:false,
        isA:true,
        isP:false,
        // 角色信息
        ProduceList:[
          {
            id: 0,
            current_time: "",
            product_name: {},
            qualified_num: 0,
            staff_name: {},
            status: 0,
            today_done_num: 0,
            unit: "",
          }
        ],
        // 当前数据总数
        total:0,
        // 添加角色数据
        addProduceForm:{
          id:0,
          staff_name: "",
          product_name: "",
          today_done_num: 0,
          qualified_num: 0,
          unit: "",
        },
        // 添加角色数据
        editProduceForm:{
          id:0,
          staff_name: "",
          product_name: "",
          today_done_num: "",
          qualified_num: "",
          unit: "",
          status:0,
        },
        // 用户表单校验规则
        addProduceFormRul:{
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
        productInfo:[
          {
              id: 1,
              product_name: "",
          }
        ],
      }
  },
  mounted() {
      this.getProduceList();
      this.getProductList();
      this.getUserList();
	},
  
  // 添加行为
  methods: {
     getUserList(){
      this.$axios.get('http://127.0.0.1:8000/api/user/list', {params:{page_size:1000000}})
        .then(res=>{
          this.userInfo = res.data.list;
      })
    },
    changeEdit(){
          this.dialogDisable = !this.value;
    },
    // 产品信息
    getProductList(){
      this.$axios.get("http://127.0.0.1:8000/api/product/list")
      .then(res=>{
        this.productInfo = res.data.list;
      })
    },
    // 信息
    getProduceList(){
      this.$axios.get("http://127.0.0.1:8000/api/produce/list", {params:this.queryInfo})
      .then(res=>{
        this.ProduceList = res.data.list;
        this.total = res.data.pagination.total;
        this.dataKey = !this.dataKey;
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      this.getProduceList();
    },
    // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      this.getProduceList();
    },
    // 添加事件
    addProduce(){
      //校验规则
      this.$refs.addProduceFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post('http://127.0.0.1:8000/api/produce/create', this.addProduceForm)
            .then(res=>{
            // 刷新列表
            this.getProduceList();
        })
      });
      //关闭对话框
      this.addProduceVisible = !this.addProduceVisible;
    },
    editProduce(produce){
        this.editProduceVisible = true;
        this.dialogDisable = true;
        this.value = false;
        this.editProduceForm = produce;
        console.log(this.editProduceForm.status)
        if (this.editProduceForm.status == 2){
          this.switchDisable = true;
        }else{
          console.log("sss")
          this.switchDisable = false;
        }
    },
    // 编辑用户信息
    editProduceInfo(){
      this.$axios.put('http://127.0.0.1:8000/api/produce/update', this.editProduceForm)
      .then(res=>{
        this.getProduceList()
      });
      this.editProduceVisible = false;
      this.dialogDisable = false;

    },
    // 审核
    auditProduce(produce){
        this.$axios.get('http://127.0.0.1:8000/api/produce/confirm', {params:{id:produce.id}})
        .then(res=>{
        this.getProduceList()
      });
    },
    //生产
    produceProduce(produce){
        this.$axios.get('http://127.0.0.1:8000/api/produce/produce', {params:{id:produce.id}})
            .then(res=>{
            this.getProduceList()
      });
    },
  }
}
</script>
<style scoped="scoped">
 
</style>