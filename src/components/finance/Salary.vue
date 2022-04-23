<template>
<div>
 <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>工资列表</el-breadcrumb-item>
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
                <el-button slot="append" icon="el-icon-search" @click="searchSalary"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <!-- <el-button type="primary"  @click="exportSalaryVisible = !exportSalaryVisible">导入工资单</el-button> -->
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
            
            </el-row>
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
          user_name:"",
          page:1,
          page_size:10,
          start_time:"",
          end_time:""
        },
        value1:[],
        total:0,
        exportSalaryVisible:false,
        dataKey:false,
        salaryList:[
            {
                attend_days: 22.5,
                leave_days: 10.5,
                overtime: 10,
                base_salary: 1000,
                overtime_salary: 100000,
                kouchu: 119.9,
                allowance: 20.01,
                should_pay: 200.1,
                tax: 110,
                actual_pay: 20,
                id: 1,
			    current_time: "2022-04-06",
                staff_name: {
                    username: "",
                },
            }
        ],
        // 弹窗的标题
        title: '导入工资单',
        // 提示信息
        tips: ['都是必填项'],
        // 假如数据库中是`name`字段, 而Excel模板列是`名字`, 就需要写成 name: '名字'
        // ele-import 内部会抛弃非定义在fields里的列
        fields: {
          staff_name: '名字',
          attend_days: '出勤',
          leave_days: '请假',
          overtime: '加班时长',
          base_salary: '基础工资',
          overtime_salary: '加班工资',
          kouchu: '应扣',
          allowance: '补贴',
          should_pay: '应发',
          tax: '个人所得税',
          actual_pay: '实发',
          current_time: '日期',
        },
        // formatter起到替换数据的作用
        // formatter: {
        //   // 可以是对象, 在发送请求时, '深圳' 将被替换成 1, '广州' 被替换成 2
        //   city: {
        //     1: '深圳',
        //     2: '广州'
        //   },
          // 可以是函数, 在发送请求时, `age` 将加1, 例如 原数据是 19 -> 20
        //   age: function(value, row) {
        //     return value + 1
        //   }
        // },
        // // 附加数据, 在每条记录上都会加这两个字段和值
        // append: {
        //   company: '腾讯',
        //   leader: '小马哥'
        // },
        // 参数校检, 和 element-ui 中 form表单中传递的rules一样, 都是使用的 async-validator 库
        // https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
        rules: {
          staff_name: { type: 'string', required: true, message: '名字必填' },
          attend_days: [
            {  required: true, message: '出勤必填' },
            { type: 'number', message: '出勤天数必须为数字' },
          ],
          leave_days: [
            {  required: true, message: '请假必填' },
            { type: 'number', message: '请假天数必须为数字' },
          ],
          overtime: [
            {  required: true, message: '加班时长必填' },
            { type: 'number', message: '加班时长必须为数字' },
          ],
          base_salary: [
            {  required: true, message: '基础工资必填' },
            { type: 'number', message: '基础工资必须为数字' },
          ],
          overtime_salary: [
            {  required: true, message: '加班工资必填' },
            { type: 'number', message: '加班工资必须为数字' },
          ],
          kouchu: [
            {  required: true, message: '应扣必填' },
            { type: 'number', message: '应扣必须为数字' },
          ],
          allowance: [
            { required: true, message: '补贴必填' },
            { type: 'number', message: '补贴必须为数字' },
          ],
          should_pay: [
            {  required: true, message: '应发必填' },
            { type: 'number', message: '应发必须为数字' },
          ],
          tax: [
            {  required: true, message: '个人所得税必填' },
            { type: 'number', message: '个人所得税必须为数字' },
          ],
          actual_pay: [
            { required: true, message: '实发必填' },
            { type: 'number', message: '实发必须为数字' },
          ],
          current_time: {required: true, message: '日期必填' },
        },
        // Excel模板下载地址
        // 注意, 只能是.xlsx的文件, .xls或者.cvs都会报错
        filepath:
          '../../static/salary.xlsx',
        // 控制弹窗, 和dialog的visible一样
        // https://element.eleme.cn/#/zh-CN/component/dialog
        visible: false
        }  
    },
    methods: {
        get_salary_list(){
          if(this.value1 !== null && this.value1.length > 0){
                this.queryInfo.start_time = this.value1[0]
                this.queryInfo.end_time = this.value1[1]
            }
            this.$axios.get(this.api + "/finance/list",  {params: this.queryInfo})
            .then(res=>{
                this.salaryList = res.data.list;
                this.total = res.data.pagination.total;
                this.dataKey = !this.dataKey;
                console.log(res.data)
            })
        },
        requestFn(data) {
            console.log(data)
            this.$axios.post(this.api + "/finance/create",  {list:data})
            .then(res=>{
                // this.permList = res.data.list;
                // this.total = res.data.pagination.total;
                // this.permissionInfo = res.data.list;
                // this.dataKey = !this.dataKey;
                this.get_salary_list();
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
      searchSalary(){
          this.get_salary_list();
      },
      // 每页数据条数发生改变
      sizeChange(newpagesize){
        this.queryInfo.page_size = newpagesize;
        this.get_salary_list();
      },
        // 当前页码发生改变
      currentChange(newpage){
        this.queryInfo.page = newpage;
        this.get_salary_list();
      },
       pickerChangeFn(value){
          if (value === null){
               this.queryInfo.start_time="";
               this.queryInfo.end_time="";
          }
          console.log(this.queryInfo)
      },
    },
    mounted() {
      this.get_salary_list();
	},
}
</script>

