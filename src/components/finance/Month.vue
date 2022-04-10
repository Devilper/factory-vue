<template>
<div>
 <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>考勤列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
            <!-- 搜索头部按钮 -->
            <el-row :gutter="10">
            <el-col :span="4">
                 <el-date-picker
                    v-model="value1"
                    type="month"
                    placeholder="选择月"
                    format="yyyy 年 MM 月"
                    value-format="yyyy-MM"
                    @change="pickerChangeFn"
                    >
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-select v-model="queryInfo.user_id" clearable placeholder="请选择">
                    <el-option
                    v-for="user in userInfo"
                    :key="user.id"
                    :label="user.username"
                    :value="user.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" @click="searchMonth">搜索</el-button>
            </el-col>
            </el-row>
             <el-table
            :data="monthList"
            height="250"
            :key="dataKey"
            border
            style="width: 100%">
                <el-table-column prop="staff_name" label="名字" width="180"> </el-table-column>
                <el-table-column prop="work_day" label="工作时间(天)"> </el-table-column>
                <el-table-column prop="overtime" label="加班时长(小时)"> </el-table-column>
                <el-table-column prop="business_day" label="出差(天)"> </el-table-column>
                <el-table-column prop="leave_day" label="请假(天)"> </el-table-column>
                <el-table-column prop="current_time" label="日期"> </el-table-column>
            </el-table>
       </el-card>


        <!-- 导入数据-->
	 
        <!-- <el-dialog align="left" title="工资单导入" :visible.sync="exportSalaryVisible" width="50%" > -->
            <!--主体部分 -->
            <!-- <div> -->
               
            <!-- </div> -->
            
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="exportSalaryVisible = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
          queryInfo:{
          user_id:"",
          current_time:"",
        },
        value1:"",
        dataKey:false,
        monthList:[
            {
                work_day: 0,
                overtime: 0,
                business_day: 0,
                leave_day: 0,
			    current_time: "2022-04-06",
                staff_name: "",
            }
        ],
        userInfo:[
          {
            id:"",
            username:""
          }
        ],
        }  
    },
    methods: {
        get_month_list(){
            this.queryInfo.current_time = this.value1
            console.log(this.current_time)
            console.log(this.value1)
            this.$axios.get("http://127.0.0.1:8000/api/attendance/info",  {params: this.queryInfo})
            .then(res=>{
                this.monthList = res.data.list;
                this.dataKey = !this.dataKey;
            })
        },
      searchSalary(){
          this.get_month_list();
      },
       pickerChangeFn(value){
          if (value === null){
               this.queryInfo.current_time="";
          }
          console.log(this.queryInfo)
      },
    getUserList(){
      this.$axios.get('http://127.0.0.1:8000/api/user/list', {params:{page_size:1000000}})
        .then(res=>{
          this.userInfo = res.data.list;
      })
    },
    searchMonth(){
        console.info(this.queryInfo)
        this.get_month_list()
    }
    },
    mounted() {
      this.get_month_list();
      this.getUserList();
	},
}
</script>

