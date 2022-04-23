webpackJsonp([1],{oZNm:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{dataKey:!1,queryInfo:{query:"",page:1,page_size:10},userList:[{id:"",username:"",staff_code:"",staff_gender:"",roles:{},date_joined:"",last_login:""}],total:0,addUserVisible:!1,editUserVisible:!1,addUserForm:{username:"",password:"",staff_code:"",staff_phone:"",staff_age:"",staff_home:"",staff_gender:"",staff_nationality:"",id_card:"",address:"",salary_pre_hour:"",role:[]},editUserForm:{u_id:"",username:"",staff_code:"",staff_phone:"",staff_age:"",staff_home:"",staff_gender:"",staff_nationality:"",id_card:"",address:"",salary_pre_hour:"",role:[]},addUserFormRul:{username:[{required:!0,message:"请输入员工名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入初始密码",trigger:"blur"},{min:6,max:8,message:"长度在 6 到 8 个字符",trigger:"blur"}],staff_code:[{required:!0,message:"请输入员工编号",trigger:"blur"},{min:6,max:8,message:"长度在 6 到 8 个字符",trigger:"blur"}],staff_phone:[{required:!0,message:"请输入员工手机号",trigger:"blur"},{min:11,max:11,message:"长度在11个字符",trigger:"blur"}],id_card:[{required:!0,message:"请输入员工身份证编号",trigger:"blur"},{min:16,max:16,message:"长度在16个字符",trigger:"blur"}]},rolesInfo:[{id:1,title:"管理员",desc:"管理员",permissions:[]}]}},mounted:function(){this.getRoleList(),this.getUserList()},methods:{get_role_id:function(e){var t=e.map(function(e,t){return e.id});return console.log(t),t},getRoleList:function(){var e=this;this.$axios.get(this.api+"/role/list",{params:{page_size:1e5}}).then(function(t){e.rolesInfo=t.data.list})},getUserList:function(){var e=this;this.$axios.get(this.api+"/user/list",{params:this.queryInfo}).then(function(t){e.userList=t.data.list,e.total=t.data.pagination.total,e.dataKey=!e.dataKey})},sizeChange:function(e){this.queryInfo.page_size=e,console.log(this.queryInfo),console.log("page"),this.getUserList()},currentChange:function(e){this.queryInfo.page=e,console.log(this.queryInfo),console.log("page_sie"),this.getUserList()},addUser:function(){var e=this;this.$refs.addUserFormRef.validate(function(t){if(!t)return alert("请输入正确的信息");e.$axios.post(e.api+"/user/create",e.addUserForm).then(function(t){e.getUserList()})}),this.addUserVisible=!this.addUserVisible,this.getUserList()},editUser:function(e){var t=this;this.$axios.get(this.api+"/user/info",{params:{u_id:e.id}}).then(function(e){console.log(e),t.editUserForm.u_id=e.data.data.id,t.editUserForm.username=e.data.data.username,t.editUserForm.staff_code=e.data.data.staff_code,t.editUserForm.staff_phone=e.data.data.staff_phone,t.editUserForm.staff_age=e.data.data.staff_age,t.editUserForm.staff_home=e.data.data.staff_home,t.editUserForm.staff_gender=e.data.data.staff_gender,t.editUserForm.staff_nationality=e.data.data.staff_nationality,t.editUserForm.id_card=e.data.data.id_card,t.editUserForm.address=e.data.data.address,t.editUserForm.salary_pre_hour=e.data.data.salary_pre_hour,t.editUserForm.role=t.get_role_id(e.data.data.roles),console.log(t.editUserForm)}),this.editUserVisible=!0,this.getUserList()},editUserInfo:function(){var e=this;console.log(this.editUserForm),this.$refs.addUserFormRef.validate(function(t){if(!t)return alert("请输入正确的信息");e.$axios.put(e.api+"/user/update",e.editUserForm).then(function(e){console.log(e)})}),this.editUserVisible=!this.editUserVisible,this.getUserList()},deleteUser:function(e){var t=this;this.$axios.delete(this.api+"/user/delete",{params:{u_id:e.id}}).then(function(e){console.log(e),t.getUserList()})}}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),r("el-breadcrumb-item",[e._v("用户管理")]),e._v(" "),r("el-breadcrumb-item",[e._v("用户列表")])],1),e._v(" "),r("el-card",[r("el-row",{attrs:{gutter:14}},[r("el-col",{attrs:{span:6}},[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getUserList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getUserList},slot:"append"})],1)],1),e._v(" "),r("el-col",{attrs:{span:3}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addUserVisible=!e.addUserVisible}}},[e._v("添加员工")])],1)],1),e._v(" "),r("el-table",{key:e.dataKey,staticStyle:{width:"100%"},attrs:{data:e.userList,height:"100%",border:""}},[r("el-table-column",{attrs:{type:"index",label:"编号",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"username",label:"姓名",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"staff_code",label:"工号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"staff_gender",label:"性别"}}),e._v(" "),r("el-table-column",{attrs:{label:"角色"},scopedSlots:e._u([{key:"default",fn:function(t){return r("span",{},e._l(t.row.roles,function(t){return r("p",{key:t.id},[e._v(e._s(t.title))])}),0)}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"date_joined",label:"入职时间"}}),e._v(" "),r("el-table-column",{attrs:{prop:"last_login",label:"最后登录时间"}}),e._v(" "),r("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑信息",placement:"top"}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(r){return e.editUser(t.row)}}})],1),e._v(" "),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除员工",placement:"top"}},[r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(r){return e.deleteUser(t.row)}}})],1)]}}])})],1),e._v(" "),r("el-pagination",{attrs:{align:"left","current-page":e.queryInfo.page,"page-sizes":[1,10,20,50],"page-size":e.queryInfo.page_size,layout:"prev, pager, next, sizes, total",total:e.total},on:{"size-change":e.sizeChange,"current-change":e.currentChange,"update:currentPage":function(t){return e.$set(e.queryInfo,"page",t)},"update:current-page":function(t){return e.$set(e.queryInfo,"page",t)}}})],1),e._v(" "),r("el-dialog",{key:e.dataKey,attrs:{title:"添加员工",visible:e.addUserVisible,width:"50%",align:"left"},on:{"update:visible":function(t){e.addUserVisible=t}}},[r("el-form",{ref:"addUserFormRef",staticClass:"demo-ruleForm",attrs:{model:e.addUserForm,rules:e.addUserFormRul,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{model:{value:e.addUserForm.username,callback:function(t){e.$set(e.addUserForm,"username",t)},expression:"addUserForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{model:{value:e.addUserForm.password,callback:function(t){e.$set(e.addUserForm,"password",t)},expression:"addUserForm.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"工号",prop:"staff_code"}},[r("el-input",{model:{value:e.addUserForm.staff_code,callback:function(t){e.$set(e.addUserForm,"staff_code",t)},expression:"addUserForm.staff_code"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"staff_phone"}},[r("el-input",{model:{value:e.addUserForm.staff_phone,callback:function(t){e.$set(e.addUserForm,"staff_phone",t)},expression:"addUserForm.staff_phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"身份证",prop:"id_card"}},[r("el-input",{model:{value:e.addUserForm.id_card,callback:function(t){e.$set(e.addUserForm,"id_card",t)},expression:"addUserForm.id_card"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"年龄",prop:"staff_age"}},[r("el-input",{model:{value:e.addUserForm.staff_age,callback:function(t){e.$set(e.addUserForm,"staff_age",t)},expression:"addUserForm.staff_age"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"住址",prop:"staff_home"}},[r("el-input",{model:{value:e.addUserForm.staff_home,callback:function(t){e.$set(e.addUserForm,"staff_home",t)},expression:"addUserForm.staff_home"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"性别",prop:"staff_gender"}},[r("el-radio",{attrs:{label:"male"},model:{value:e.addUserForm.staff_gender,callback:function(t){e.$set(e.addUserForm,"staff_gender",t)},expression:"addUserForm.staff_gender"}},[e._v("男")]),e._v(" "),r("el-radio",{attrs:{label:"female"},model:{value:e.addUserForm.staff_gender,callback:function(t){e.$set(e.addUserForm,"staff_gender",t)},expression:"addUserForm.staff_gender"}},[e._v("女")])],1),e._v(" "),r("el-form-item",{attrs:{label:"民族",prop:"staff_nationality"}},[r("el-input",{model:{value:e.addUserForm.staff_nationality,callback:function(t){e.$set(e.addUserForm,"staff_nationality",t)},expression:"addUserForm.staff_nationality"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"地址",prop:"address"}},[r("el-input",{model:{value:e.addUserForm.address,callback:function(t){e.$set(e.addUserForm,"address",t)},expression:"addUserForm.address"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"时薪",prop:"salary_pre_hour"}},[r("el-input",{model:{value:e.addUserForm.salary_pre_hour,callback:function(t){e.$set(e.addUserForm,"salary_pre_hour",t)},expression:"addUserForm.salary_pre_hour"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"角色",prop:"role"}},[r("el-select",{attrs:{multiple:"",placeholder:"选择角色"},model:{value:e.addUserForm.role,callback:function(t){e.$set(e.addUserForm,"role",t)},expression:"addUserForm.role"}},e._l(e.rolesInfo,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addUserVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"修改员工信息",visible:e.editUserVisible,width:"50%",align:"left"},on:{"update:visible":function(t){e.editUserVisible=t}}},[r("el-form",{ref:"addUserFormRef",staticClass:"demo-ruleForm",attrs:{model:e.editUserForm,rules:e.addUserFormRul,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.editUserForm.username,callback:function(t){e.$set(e.editUserForm,"username",t)},expression:"editUserForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"工号",prop:"staff_code"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.editUserForm.staff_code,callback:function(t){e.$set(e.editUserForm,"staff_code",t)},expression:"editUserForm.staff_code"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"身份证",prop:"id_card"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.editUserForm.id_card,callback:function(t){e.$set(e.editUserForm,"id_card",t)},expression:"editUserForm.id_card"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"staff_phone"}},[r("el-input",{model:{value:e.editUserForm.staff_phone,callback:function(t){e.$set(e.editUserForm,"staff_phone",t)},expression:"editUserForm.staff_phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"时薪",prop:"salary_pre_hour"}},[r("el-input",{model:{value:e.editUserForm.salary_pre_hour,callback:function(t){e.$set(e.editUserForm,"salary_pre_hour",t)},expression:"editUserForm.salary_pre_hour"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"年龄",prop:"staff_age"}},[r("el-input",{model:{value:e.editUserForm.staff_age,callback:function(t){e.$set(e.editUserForm,"staff_age",t)},expression:"editUserForm.staff_age"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"住址",prop:"staff_home"}},[r("el-input",{model:{value:e.editUserForm.staff_home,callback:function(t){e.$set(e.editUserForm,"staff_home",t)},expression:"editUserForm.staff_home"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"性别",prop:"staff_gender"}},[r("el-radio",{attrs:{label:"male"},model:{value:e.editUserForm.staff_gender,callback:function(t){e.$set(e.editUserForm,"staff_gender",t)},expression:"editUserForm.staff_gender"}},[e._v("男")]),e._v(" "),r("el-radio",{attrs:{label:"female"},model:{value:e.editUserForm.staff_gender,callback:function(t){e.$set(e.editUserForm,"staff_gender",t)},expression:"editUserForm.staff_gender"}},[e._v("女")])],1),e._v(" "),r("el-form-item",{attrs:{label:"民族",prop:"staff_nationality"}},[r("el-input",{model:{value:e.editUserForm.staff_nationality,callback:function(t){e.$set(e.editUserForm,"staff_nationality",t)},expression:"editUserForm.staff_nationality"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"地址",prop:"address"}},[r("el-input",{model:{value:e.editUserForm.address,callback:function(t){e.$set(e.editUserForm,"address",t)},expression:"editUserForm.address"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"角色",prop:"role"}},[r("el-select",{attrs:{multiple:"",placeholder:"选择角色"},model:{value:e.editUserForm.role,callback:function(t){e.$set(e.editUserForm,"role",t)},expression:"editUserForm.role"}},e._l(e.rolesInfo,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editUserVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.editUserInfo}},[e._v("更新")])],1)],1)],1)},staticRenderFns:[]};var o=r("VU/8")(a,s,!1,function(e){r("uDEz")},"data-v-f74329b0",null);t.default=o.exports},uDEz:function(e,t){}});
//# sourceMappingURL=1.17c72f0b9fdcf36ca6f4.js.map