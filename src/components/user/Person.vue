<template>
  <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <!-- 个人信息 -->
          <div>
              <el-descriptions title="用户信息">
                <el-descriptions-item label="姓名">{{userInfo.username}}</el-descriptions-item>
                <el-descriptions-item label="工号">{{userInfo.staff_code}}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{userInfo.staff_phone}}</el-descriptions-item>
                <el-descriptions-item label="籍贯">{{userInfo.staff_home}}</el-descriptions-item>
                <el-descriptions-item label="民族">{{userInfo.staff_nationality}}</el-descriptions-item>
                <el-descriptions-item label="居住地">{{userInfo.address}}</el-descriptions-item>
                <el-descriptions-item label="入职时间">{{userInfo.date_joined}}</el-descriptions-item>
              </el-descriptions>
          </div>
      </el-card>
    
      <el-card>
          <!-- 考勤 -->
          <div>
         <el-table
            :data="attendanceList"
            height="100%"
            :key="dataKey"
            border
            style="width: 100%">
                <el-table-column prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="staff_name.username" label="名字" width="180"> </el-table-column>
                <el-table-column prop="flag_leave" label="请假"> </el-table-column>
                <el-table-column prop="flag_business" label="出差"> </el-table-column>
                <el-table-column prop="start_time" label="上班时间">
                    <span slot-scope="scope">
                      {{scope.row.start_time| format}}
                    </span>
                </el-table-column>
                <el-table-column prop="end_time" label="下班时间">
                    <span slot-scope="scope">
                      {{scope.row.end_time| format}}
                    </span>
                </el-table-column>
                <el-table-column prop="current_time" label="日期"> </el-table-column>
            </el-table>
          </div>
      </el-card>
      <el-card>
          <!-- 工资条 -->
          <div class="">
               <el-table
                :data="salaryList"
                height="100%"
                :key="dataKey"
                border
                style="width: 100%">
                    <el-table-column prop="id" label="编号" width="180"></el-table-column>
                    <el-table-column prop="staff_name.username" label="名字" width="180"> </el-table-column>
                    <el-table-column prop="attend_days" label="出勤"> </el-table-column>
                    <el-table-column prop="leave_days" label="请假"> </el-table-column>
                    <el-table-column prop="overtime" label="加班时长"> </el-table-column>
                    <el-table-column prop="base_salary" label="基础工资"> </el-table-column>
                    <el-table-column prop="overtime_salary" label="加班工资"> </el-table-column>
                    <el-table-column prop="kouchu" label="应扣"> </el-table-column>
                    <el-table-column prop="allowance" label="补贴"> </el-table-column>
                    <el-table-column prop="should_pay" label="应发"> </el-table-column>
                    <el-table-column prop="tax" label="个人所得税"> </el-table-column>
                    <el-table-column prop="actual_pay" label="实发"> </el-table-column>
                    <el-table-column prop="current_time" label="日期"> </el-table-column>
                </el-table>
          </div>
      </el-card>
  </div>
</template>

<script>
export default {
  data(){
      return{
          dataKey:false,
          attendanceList:[
              {
                current_time: "",
                flag_leave: false,
                flag_business: false,
                start_time: "",
                end_time: "",
                supplement: "",
                id: 1,
                staff_name: {
                    username: "",
                },
            }
          ],
          salaryList:[
            {
                attend_days: 0,
                leave_days: 0,
                overtime: 0,
                base_salary: 0,
                overtime_salary: 0,
                kouchu: 0,
                allowance: 0,
                should_pay: 0,
                tax: 0,
                actual_pay: 0,
                id: 0,
			    current_time: "",
                staff_name: {
                    username: "",
                },
            }
        ],
        userInfo:{
          id: "",
          username: "",
          staff_code: "",
          date_joined: "",
          address:"",
          id_card:"",
          staff_home:"",
          staff_nationality:"",
          staff_phone:""
        }
      }  
  },
  methods: {
        get_user_info(){
            this.$axios.get(this.api + "/user/person")
            .then(res=>{
                this.userInfo = res.data.data;
                this.dataKey = !this.dataKey;
                console.log(this.userInfo)
            })
        },
        get_attendance_list(){
            this.$axios.get(this.api + "/attendance/person")
            .then(res=>{
                this.attendanceList = res.data.list;
                this.dataKey = !this.dataKey;
                console.log(res.data)
            })
        },
        get_salary_list(){
            this.$axios.get(this.api + "/finance/person")
            .then(res=>{
                this.salaryList = res.data.list;
                this.dataKey = !this.dataKey;
                console.log(res.data)
            })
        },
      },
      mounted() {
      this.get_attendance_list();
      this.get_salary_list();
      this.get_user_info();
	},
}
</script>

