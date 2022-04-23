webpackJsonp([15],{"7vSX":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l={data:function(){return{queryInfo:{user_name:"",page:1,page_size:10,start_time:"",end_time:""},value1:[],total:0,exportSalaryVisible:!1,dataKey:!1,salaryList:[{attend_days:22.5,leave_days:10.5,overtime:10,base_salary:1e3,overtime_salary:1e5,kouchu:119.9,allowance:20.01,should_pay:200.1,tax:110,actual_pay:20,id:1,current_time:"2022-04-06",staff_name:{username:""}}],title:"导入工资单",tips:["都是必填项"],fields:{staff_name:"名字",attend_days:"出勤",leave_days:"请假",overtime:"加班时长",base_salary:"基础工资",overtime_salary:"加班工资",kouchu:"应扣",allowance:"补贴",should_pay:"应发",tax:"个人所得税",actual_pay:"实发",current_time:"日期"},rules:{staff_name:{type:"string",required:!0,message:"名字必填"},attend_days:[{required:!0,message:"出勤必填"},{type:"number",message:"出勤天数必须为数字"}],leave_days:[{required:!0,message:"请假必填"},{type:"number",message:"请假天数必须为数字"}],overtime:[{required:!0,message:"加班时长必填"},{type:"number",message:"加班时长必须为数字"}],base_salary:[{required:!0,message:"基础工资必填"},{type:"number",message:"基础工资必须为数字"}],overtime_salary:[{required:!0,message:"加班工资必填"},{type:"number",message:"加班工资必须为数字"}],kouchu:[{required:!0,message:"应扣必填"},{type:"number",message:"应扣必须为数字"}],allowance:[{required:!0,message:"补贴必填"},{type:"number",message:"补贴必须为数字"}],should_pay:[{required:!0,message:"应发必填"},{type:"number",message:"应发必须为数字"}],tax:[{required:!0,message:"个人所得税必填"},{type:"number",message:"个人所得税必须为数字"}],actual_pay:[{required:!0,message:"实发必填"},{type:"number",message:"实发必须为数字"}],current_time:{required:!0,message:"日期必填"}},filepath:"../../static/salary.xlsx",visible:!1}},methods:{get_salary_list:function(){var e=this;null!==this.value1&&this.value1.length>0&&(this.queryInfo.start_time=this.value1[0],this.queryInfo.end_time=this.value1[1]),this.$axios.get(this.api+"/finance/list",{params:this.queryInfo}).then(function(a){e.salaryList=a.data.list,e.total=a.data.pagination.total,e.dataKey=!e.dataKey,console.log(a.data)})},requestFn:function(e){var a=this;console.log(e),this.$axios.post(this.api+"/finance/create",{list:e}).then(function(e){a.get_salary_list()})},handleCloseImport:function(){console.log("弹窗关闭了~")},handleFinishImport:function(){console.log("导入完毕了~")},handleOpen:function(){this.visible=!0},searchSalary:function(){this.get_salary_list()},sizeChange:function(e){this.queryInfo.page_size=e,this.get_salary_list()},currentChange:function(e){this.queryInfo.page=e,this.get_salary_list()},pickerChangeFn:function(e){null===e&&(this.queryInfo.start_time="",this.queryInfo.end_time=""),console.log(this.queryInfo)}},mounted:function(){this.get_salary_list()}},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),t("el-breadcrumb-item",[e._v("财务管理")]),e._v(" "),t("el-breadcrumb-item",[e._v("工资列表")])],1),e._v(" "),t("el-card",[t("el-row",{attrs:{gutter:10}},[t("el-col",{attrs:{span:6}},[t("el-date-picker",{attrs:{type:"monthrange","start-placeholder":"开始月份","end-placeholder":"结束月份",format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd",align:"left"},on:{change:e.pickerChangeFn},model:{value:e.value1,callback:function(a){e.value1=a},expression:"value1"}})],1),e._v(" "),t("el-col",{attrs:{span:6}},[t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.queryInfo.user_name,callback:function(a){e.$set(e.queryInfo,"user_name",a)},expression:"queryInfo.user_name"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.searchSalary},slot:"append"})],1)],1),e._v(" "),t("el-col",{attrs:{span:4}},[t("ele-import",{attrs:{fields:e.fields,filepath:e.filepath,rules:e.rules,tips:e.tips,title:e.title,visible:e.visible,requestFn:e.requestFn},on:{"update:visible":function(a){e.visible=a},close:e.handleCloseImport,finish:e.handleFinishImport}}),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.handleOpen}},[e._v("导入数据")])],1)],1),e._v(" "),t("el-table",{key:e.dataKey,staticStyle:{width:"100%"},attrs:{data:e.salaryList,height:"100%",border:""}},[t("el-table-column",{attrs:{prop:"id",label:"编号",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"staff_name.username",label:"名字",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"attend_days",label:"出勤"}}),e._v(" "),t("el-table-column",{attrs:{prop:"leave_days",label:"请假"}}),e._v(" "),t("el-table-column",{attrs:{prop:"overtime",label:"加班时长"}}),e._v(" "),t("el-table-column",{attrs:{prop:"base_salary",label:"基础工资"}}),e._v(" "),t("el-table-column",{attrs:{prop:"overtime_salary",label:"加班工资"}}),e._v(" "),t("el-table-column",{attrs:{prop:"kouchu",label:"应扣"}}),e._v(" "),t("el-table-column",{attrs:{prop:"allowance",label:"补贴"}}),e._v(" "),t("el-table-column",{attrs:{prop:"should_pay",label:"应发"}}),e._v(" "),t("el-table-column",{attrs:{prop:"tax",label:"个人所得税"}}),e._v(" "),t("el-table-column",{attrs:{prop:"actual_pay",label:"实发"}}),e._v(" "),t("el-table-column",{attrs:{prop:"current_time",label:"日期"}})],1),e._v(" "),t("el-pagination",{attrs:{"current-page":e.queryInfo.page,"page-sizes":[1,10,20,50],"page-size":e.queryInfo.page_size,layout:"prev, pager, next, sizes, total",total:e.total},on:{"size-change":e.sizeChange,"current-change":e.currentChange,"update:currentPage":function(a){return e.$set(e.queryInfo,"page",a)},"update:current-page":function(a){return e.$set(e.queryInfo,"page",a)}}})],1)],1)},staticRenderFns:[]},r=t("VU/8")(l,s,!1,null,null,null);a.default=r.exports}});
//# sourceMappingURL=15.1d9e1bf88328cef72e41.js.map