<template>
<div>
 <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
            <!-- 搜索头部按钮 -->
            <el-row :gutter="10">
            <el-col :span="6">
                <el-date-picker
                v-model="value1"
                type="monthrange"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                align="left"
                @change="pickerChangeFn">
                </el-date-picker>
            </el-col>
            <el-col :span="6">
                <el-input v-model="queryInfo.user_name" placeholder="请输入内容" class="input-with-select" clearable >
                <el-button slot="append" icon="el-icon-search" @click="searchAttendance"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <!-- <el-button type="primary"  @click="exportAttendanceVisible = !exportAttendanceVisible">导入工资单</el-button> -->
                 <ele-import
                    :fields="fields"
                    :filepath="filepath"
                    :rules="rules"
                    :tips="tips"
                    :title="title"
                    :visible.sync="visible"
                    :requestFn="requestFn"
                    @close="handleCloseImport"
                    @finish="handleFinishImport"
                    />
                    <el-button @click="handleOpen" type="primary">导入数据</el-button>  
            </el-col>
            <el-col :span="1">
                <el-button type="primary" @click="rfid">月度总结</el-button>
            </el-col>
            
            </el-row>
             <el-table
            :data="attendanceList"
            height="250"
            :key="dataKey"
            border
            style="width: 100%">
                <el-table-column prop="id" label="编号" width="180"></el-table-column>
                <el-table-column prop="staff_name.username" label="名字" width="180"> </el-table-column>
                <el-table-column prop="flag_leave" label="请假" :formatter = "formatter_flag_leave"> </el-table-column>
                <el-table-column prop="flag_business" label="出差" :formatter = "formatter_flag_business"> </el-table-column>
                <el-table-column prop="start_time" label="上班时间"> </el-table-column>
                <el-table-column prop="end_time" label="下班时间"> </el-table-column>
                <el-table-column prop="current_time" label="日期"> </el-table-column>
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


        <!-- 导入数据-->
	 
        <!-- <el-dialog align="left" title="工资单导入" :visible.sync="exportAttendanceVisible" width="50%" > -->
            <!--主体部分 -->
            <!-- <div> -->
               
            <!-- </div> -->
            
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="exportAttendanceVisible = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
export default {
    data(){
        var validateFlagBusiness = (rule, value, callback) => {
        if (value === true) {
            if (this.fields.flag_leave === true){
                callback(new Error('请假和出差不能同时为是'));
            }
          
        } else {
          callback();
        }
      };
      var validateStartTime = (rule, value, callback) => {
        if (value === "") {
            if (this.fields.flag_leave === false){
                callback(new Error('没有请假状态状态下 上班时间必填'));
            }
          
        } else {
          if (this.fields.end_time < value) {
               callback(new Error('上班时间不能晚于下班时间'));
          }
        }
      };
      var validateEndTime = (rule, value, callback) => {
        if (value === "") {
            if (this.fields.flag_leave === false){
                callback(new Error('没有请假状态状态下 上班时间必填'));
            }
          
        } else {
          if (this.fields.start_time > value) {
               callback(new Error('下班时间不能早于上班时间'));
          }
        }
      };
        return{
          queryInfo:{
          user_name:"",
          page:1,
          page_size:10,
          start_time:"",
          end_time:""
        },
        value1:[],
        total:0,
        exportAttendanceVisible:false,
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
        // 弹窗的标题
        title: '导入考勤    单',
        // 提示信息
        tips: ['名字','日期','是必填项'],
        // 假如数据库中是`name`字段, 而Excel模板列是`名字`, 就需要写成 name: '名字'
        // ele-import 内部会抛弃非定义在fields里的列
        fields: {
          staff_name: '名字',
          flag_leave: '请假',
          flag_business: '出差',
          start_time: '上班时间',
          end_time: '下班时间',
          supplement: '额外',
          current_time: '日期',
        },
        rules: {
          staff_name: { type: 'string', required: true, message: '名字必填' },
          flag_business: [
            { validator: validateFlagBusiness, trigger: 'blur' }
          ],
          current_time: {required: true, message: '日期必填' },
        },
        // Excel模板下载地址
        // 注意, 只能是.xlsx的文件, .xls或者.cvs都会报错
        filepath:
          '../../static/attendance.xlsx',
        // 控制弹窗, 和dialog的visible一样
        // https://element.eleme.cn/#/zh-CN/component/dialog
        visible: false
        }  
    },
    
    methods: {
        get_attendance_list(){
            if(this.value1 !== null && this.value1.length > 0){
                this.queryInfo.start_time = this.value1[0]
                this.queryInfo.end_time = this.value1[1]
            }
            
            this.$axios.get("http://127.0.0.1:8000/api/attendance/list",  {params: this.queryInfo})
            .then(res=>{
                this.attendanceList = res.data.list;
                this.total = res.data.pagination.total;
                this.dataKey = !this.dataKey;
                console.log(res.data)
            })
        },
        requestFn(data) {
            console.log(data)
            this.$axios.post("http://127.0.0.1:8000/api/attendance/create",  {list:data})
            .then(res=>{
                // this.permList = res.data.list;
                // this.total = res.data.pagination.total;
                // this.permissionInfo = res.data.list;
                // this.dataKey = !this.dataKey;
                this.get_attendance_list();
            })
        // 演示代码
        // 1、如果没有针对ele-import做过接口约定, 可以采用如下形式:
        // try {
        //   const res = await axios.post('/user', data)
        //   return Promise.resolve()
        // } catch (error) {
        //     console.log(error)
        //   // error经过一系列转化, 转为
        //   const errorData = this.getErrorMessage(error)
        // //   {0:{ age: '年龄为数字', city: '城市必填'}, 2:{ age: '年龄为数字'} } // 0 和 2 分别是行号
        //   return Promise.reject(errorData)
        // }
        // // 2、如果针对ele-import做过接口约定, 当校检错误时, 后端返回的 error 就是上述错误形式, 则可直接
        // // return axios.post('/user', data)
        // 总结: 无论如何总要返回一个Promise对象

      },
      handleCloseImport() {
        console.log('弹窗关闭了~')
      },
      handleFinishImport() {
        console.log('导入完毕了~')
      },
      handleOpen() {
        this.visible = true
      },
      searchAttendance(){
          console.log("ssss")
          this.get_attendance_list();
      },
      // 每页数据条数发生改变
      sizeChange(newpagesize){
        this.queryInfo.page_size = newpagesize;
        this.get_attendance_list();
      },
        // 当前页码发生改变
      currentChange(newpage){
        this.queryInfo.page = newpage;
        this.get_attendance_list();
      },
      formatter_flag_leave(row, index) {undefined
        if (row.flag_leave == true) {undefined
            row.flag_leave = "是"
        }
        if(row.flag_leave == false) {undefined
            row.flag_leave = "否"
        }
        return row.flag_leave
        },
      formatter_flag_business(row, index) {undefined
        if (row.flag_business == true) {undefined
            row.flag_business = "是"
        }
        if(row.flag_business == false) {undefined
            row.flag_business = "否"
        }
        return row.flag_business
        },  
      pickerChangeFn(value){
          if (value === null){
               this.queryInfo.start_time="";
               this.queryInfo.end_time="";
          }
          console.log(this.queryInfo)
      },
      rfid(row, index){
            // @ts-ignore
            // @ts-ignore
            this.$router.push({path: 'month',//rooter配置的name值
            });
        }
    },
    mounted() {
      this.get_attendance_list();
	},
    
}

</script>

