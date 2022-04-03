<template>
  <div>
            <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资产管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
           <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getUnitList">
              <el-button slot="append" icon="el-icon-search" @click="getUnitList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addUnitVisible=!addUnitVisible">添加设备</el-button>
          </el-col>
        </el-row>
         <!-- 渲染数据表格 -->
        <el-table
        :data="unitList"
        height="250"
        :key="dataKey"
        border
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="version" label="型号" width="180"> </el-table-column>
            <el-table-column prop="facility_name" label="名称"> </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column prop="buyer.username" label="购买人"> </el-table-column>
            <el-table-column prop="buy_time" label="购买时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑信息" placement="top" >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUnit(scope.row)" ></el-button>
                </el-tooltip>
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
    <!-- 添加对话框 -->
     <el-dialog
      title="修改员工信息"
      :visible.sync="addUnitVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addUnitForm" :rules="addUnitFormRul" ref="addUnitFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="型号" prop="version">
          <el-input v-model="addUnitForm.version" ></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="facility_name">
          <el-input v-model="addUnitForm.facility_name" ></el-input>
        </el-form-item>
         <el-form-item label="价格" prop="price">
          <el-input v-model="addUnitForm.price" ></el-input>
        </el-form-item>
        <el-form-item label="购买人" prop="buyer">
           <el-select v-model="addUnitForm.buyer" placeholder="选择用户">
            <el-option
              v-for="user in userInfo"
              :key="user.id"
              :label="user.username"
              :value="user.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addUnitVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUnitInfo">更新</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
     <el-dialog
      title="修改员工信息"
      :visible.sync="editUnitVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="editUnitForm" :rules="addUnitFormRul" ref="addUnitFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="型号" prop="version">
          <el-input v-model="editUnitForm.version" ></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="facility_name">
          <el-input v-model="editUnitForm.facility_name" ></el-input>
        </el-form-item>
         <el-form-item label="价格" prop="price">
          <el-input v-model="editUnitForm.price" ></el-input>
        </el-form-item>
        <el-form-item label="购买人" prop="buyer">
           <el-select v-model="editUnitForm.buyer" placeholder="选择用户">
            <el-option
              v-for="user in userInfo"
              :key="user.id"
              :label="user.username"
              :value="user.id">
            </el-option>
           </el-select>
        </el-form-item>
       
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editUnitVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUnitInfo">更新</el-button>
      </span>
    </el-dialog>
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
        addUnitVisible:false,
         // 当前数据总数
        total:0,
        unitList:[
          {
            id: 0,
            version: "",
            facility_name: "",
            price: 0,
            buyer: 0
          }
        ],
        userInfo:[
          {
            id:0,
            username:""
          }
        ],
        addUnitForm:{
            version:"",
            facility_name:"",
            price:0,
            buyer:{
            },
        },
        editUnitForm:{
            version:"",
            facility_name:"",
            price:0,
            buyer:{
            },
        },
        addUnitFormRul:{
           version: [
            { required: true, message: '请输入设备型号', trigger: 'blur' },
          ],
           facility_name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
          ],
          buyer: [
            { required: true, message: '请输入购买人', trigger: 'blur' },
          ],
        }
      }
  },
  mounted() {
  this.getUnitList();
  this.getUserList();
  },
  methods:{
      //请求列表数据
    getUnitList(){
      this.$axios.get('http://127.0.0.1:8000/api/unit/list', {params:this.queryInfo})
        .then(res=>{
          console.log(res.data)
          this.unitList = res.data.list;
          this.total = res.data.pagination.total;
          this.dataKey = !this.dataKey;
          console.log(this.unitList[1].buyer.username)
      })
    },
       //请求用户列表数据
    getUserList(){
      this.$axios.get('http://127.0.0.1:8000/api/user/list', {params:{page_size:1000000}})
        .then(res=>{
          this.userInfo = res.data.list;
      })
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      console.log(this.queryInfo)
      console.log("page")
      this.getUnitList();
    },
    // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      console.log(this.queryInfo)
      console.log("page_sie")
      this.getUnitList();
    },
    addUnitInfo(){
      //校验规则
      this.$refs.addUnitFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post('http://127.0.0.1:8000/api/unit/create', this.addUnitForm)
            .then(res=>{
            // todo
            this.getUnitList();
        })
      })
      //关闭对话框
      this.addUnitVisible = !this.addUnitVisible;
    },
    editUnit(unit){
      this.editUnitForm = unit;
      this.editUnitForm.buyer = unit.buyer.id
      this.editUnitVisible = true;
    },
    editUnitInfo(){
        this.$refs.addUnitFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.put('http://127.0.0.1:8000/api/unit/update', this.editUnitForm)
            .then(res=>{
            // todo// 刷新列表
            this.getUnitList();
            console.log(res)
        })
      })
      
      //关闭对话框
      this.editUnitVisible = !this.editUnitVisible;
    },
  }
}
</script>

