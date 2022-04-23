<template>
  <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资产管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备维修</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
           <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getRepairList">
              <el-button slot="append" icon="el-icon-search" @click="getRepairList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addRepairVisible=!addRepairVisible">维修记录</el-button>
          </el-col>
        </el-row>
         <!-- 渲染数据表格 -->
        <el-table
        :data="repairList"
        height="100%"
        border
        :key="dataKey"
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="facility_id.facility_name" label="故障设备" width="180"> </el-table-column>
            <el-table-column prop="baoxiu_complementary" label="报修描述"> </el-table-column>
            <el-table-column prop="baoxiu_staff_name.username" label="报修人"> </el-table-column>
            <el-table-column prop="baoxiu_staff_tel" label="联系方式"> </el-table-column>
            <el-table-column prop="baoxiu_time" label="报修时间"> </el-table-column>
            <el-table-column prop="repair_staff_name.username" label="维修人"> </el-table-column>
            <el-table-column prop="repair_time" label="维修时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑信息" placement="top" >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRepair(scope.row)" ></el-button>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark" content="删除员工" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
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
       <!-- 添加对话框 -->
     <el-dialog
      title="修改员工信息"
      :visible.sync="addRepairVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
      <el-form :model="addRepairForm" :rules="addRepairFormRul" ref="addRepairFormRef" label-width="100px" class="demo-ruleForm">
         <el-form-item label="故障设备" prop="facility_id">
           <el-select v-model="addRepairForm.facility_id" placeholder="选择用户">
            <el-option
              v-for="unit in unitInfo"
              :key="unit.id"
              :label="unit.facility_name"
              :value="unit.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="报修人" prop="baoxiu_staff_name">
           <el-select v-model="addRepairForm.baoxiu_staff_name" placeholder="选择用户">
            <el-option
              v-for="user in userInfo"
              :key="user.id"
              :label="user.username"
              :value="user.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="报修描述" prop="baoxiu_complementary">
          <el-input v-model="addRepairForm.baoxiu_complementary" ></el-input>
        </el-form-item>
         <el-form-item label="联系方式" prop="baoxiu_staff_tel">
          <el-input v-model="addRepairForm.baoxiu_staff_tel" ></el-input>
        </el-form-item>

         <el-form-item label="报修时间" prop="baoxiu_time">
            <el-date-picker
              v-model="addRepairForm.baoxiu_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
         <el-form-item label="维修人" prop="repair_staff_name">
           <el-select v-model="addRepairForm.repair_staff_name" placeholder="选择用户">
            <el-option
              v-for="user in userInfo"
              :key="user.id"
              :label="user.username"
              :value="user.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="维修时间" prop="repair_time">
            <el-date-picker
              v-model="addRepairForm.repair_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addRepairVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUnitInfo">更新</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
     <el-dialog
      title="修改员工信息"
      :visible.sync="editRepairVisible"
      width="50%"
      align="left">
      <!-- 内容区 -->
            <el-form :model="editRepairForm" :rules="addRepairFormRul" ref="addRepairFormRef" label-width="100px" class="demo-ruleForm">
         <el-form-item label="故障设备" prop="facility_id">
           <el-select v-model="editRepairForm.facility_id" placeholder="选择用户">
            <el-option
              v-for="unit in unitInfo"
              :key="unit.id"
              :label="unit.facility_name"
              :value="unit.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="报修人" prop="baoxiu_staff_name">
           <el-select v-model="editRepairForm.baoxiu_staff_name" placeholder="选择用户">
            <el-option
              v-for="user in userInfo"
              :key="user.id"
              :label="user.username"
              :value="user.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="报修描述" prop="baoxiu_complementary">
          <el-input v-model="editRepairForm.baoxiu_complementary" ></el-input>
        </el-form-item>
         <el-form-item label="联系方式" prop="baoxiu_staff_tel">
          <el-input v-model="editRepairForm.baoxiu_staff_tel" ></el-input>
        </el-form-item>

         <el-form-item label="报修时间" prop="baoxiu_time">
            <el-date-picker
              v-model="editRepairForm.baoxiu_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
         <el-form-item label="维修人" prop="repair_staff_name">
           <el-select v-model="editRepairForm.repair_staff_name" placeholder="选择用户">
            <el-option
              v-for="user in userInfo"
              :key="user.id"
              :label="user.username"
              :value="user.id">
            </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="维修时间" prop="repair_time">
            <el-date-picker
              v-model="editRepairForm.repair_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editRepairVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRepairInfo">更新</el-button>
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
        addRepairVisible:false,
        editRepairVisible:false,
        // 当前数据总数
        total:0,
        repairList:[{
          id:0,
          facility_id:{},
          baoxiu_staff_name:{},
          baoxiu_staff_tel:"",
          baoxiu_time:"",
          baoxiu_complementary:"",
          repair_staff_name:{},
          repair_time:""
        }],
        addRepairForm:{
          id:0,
          facility_id:0,
          baoxiu_staff_name:0,
          baoxiu_staff_tel:"",
          baoxiu_time:"",
          baoxiu_complementary:"",
          repair_staff_name:0,
          repair_time:""
        },
        editRepairForm:{
          id:0,
          facility_id:0,
          baoxiu_staff_name:0,
          baoxiu_staff_tel:"",
          baoxiu_time:"",
          baoxiu_complementary:"",
          repair_staff_name:0,
          repair_time:""
        },
        userInfo:[
          {
            id:0,
            username:""
          }
        ],
        unitInfo:[
          {
            id:0,
            username:""
          }
        ],
        addRepairFormRul:{
           facility_id: [
            { required: true, message: '请输入故障设备', trigger: 'blur' },
          ],
           baoxiu_staff_name: [
            { required: true, message: '请输入报修人', trigger: 'blur' },
          ],
          baoxiu_complementary: [
            { required: true, message: '请输入报修描述', trigger: 'blur' },
          ],
          baoxiu_staff_tel: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
          ],
          baoxiu_time: [
            { required: true, message: '请输入报修时间', trigger: 'blur' },
          ],
          repair_staff_name: [
            { required: true, message: '请输入维修人', trigger: 'blur' },
          ],
          repair_time: [
            { required: true, message: '请输入维修时间', trigger: 'blur' },
          ],
        }
      }
  },
  mounted() {
    this.getRepairList();
    this.getUserList();
    this.getUnitList();
  },
  methods:{
      //请求用户列表数据
    getRepairList(){
      this.$axios.get(this.api + '/repair/list', {params:this.queryInfo})
        .then(res=>{
          console.log(res.data)
          this.repairList = res.data.list;
          this.total = res.data.pagination.total;
          this.dataKey = !this.dataKey;
      })
    },
        //请求用户列表数据
    getUserList(){
      this.$axios.get(this.api + '/user/list', {params:{page_size:1000000}})
        .then(res=>{
          this.userInfo = res.data.list;
      })
    },
          //请求列表数据
    getUnitList(){
      this.$axios.get(this.api + '/unit/list', {params:{page_size:1000000}})
        .then(res=>{
          console.log(res.data)
          this.unitInfo = res.data.list;
      })
    },
    editRepair(repair){
        this.editRepairForm = repair;
        this.editRepairForm.facility_id = repair.facility_id.id;
        this.editRepairForm.baoxiu_staff_name = repair.baoxiu_staff_name.id;
        this.editRepairForm.repair_staff_name = repair.repair_staff_name.id;
        this.editRepairVisible = !this.editRepairVisible;
    },
    // 每页数据条数发生改变
    sizeChange(newpage){
      this.queryInfo.page_size = newpage;
      this.getRepairList();
    },
    // 当前页码发生改变
    currentChange(newpagesize){
      this.queryInfo.page = newpagesize;
      this.getRepairList();
    },
    addUnitInfo(){
      //校验规则
      this.$refs.addRepairFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.post(this.api + '/repair/create', this.addRepairForm)
            .then(res=>{
            // todo
            this.getRepairList();
        })
      })
      //关闭对话框
      this.addRepairVisible = !this.addRepairVisible;
    },
    editRepairInfo(){
      this.$refs.addRepairFormRef.validate((valid)=>{
        if(!valid) return alert("请输入正确的信息")
        this.$axios.put(this.api + '/repair/update', this.editRepairForm)
            .then(res=>{
            // todo// 刷新列表
            this.getRepairList();
            console.log(res)
        })
      })
      
      //关闭对话框
      this.editRepairVisible = !this.editRepairVisible;
    }
  }
}
</script>

