webpackJsonp([3],{"8eEc":function(e,t){},cJ3y:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{dataKey:!1,queryInfo:{query:"",page:1,page_size:10},addRoleVisible:!1,editRoleVisible:!1,roleList:[{id:0,desc:"",title:"",p_id:[]}],total:0,addRoleForm:{id:0,title:"",desc:"",p_id:[]},editRoleForm:{id:0,title:"",desc:"",p_id:[]},addRoleFormRul:{title:[{required:!0,message:"请输入角色名称",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}],desc:[{required:!0,message:"请输入角色描述",trigger:"blur"},{min:2,max:200,message:"长度在 2 到 200 个字符",trigger:"blur"}]},permissionInfo:[{id:1,title:"用户列表",url:"/user/",action:1,parent:null,menu:1}]}},mounted:function(){this.getRoleList(),this.getPermissionList()},methods:{getPermissionList:function(){var e=this;this.$axios.get(this.api+"/permission/list",{params:{page_size:1e5}}).then(function(t){e.permissionInfo=t.data.list})},getRoleList:function(){var e=this;this.$axios.get(this.api+"/role/list",{params:this.queryInfo}).then(function(t){e.roleList=t.data.list,e.total=t.data.pagination.total,e.dataKey=!e.dataKey})},sizeChange:function(e){this.queryInfo.page_size=e,this.getRoleList()},currentChange:function(e){this.queryInfo.page=e,this.getRoleList()},addRole:function(){var e=this;this.$refs.addRoleFormRef.validate(function(t){if(!t)return alert("请输入正确的信息");e.$axios.post(e.api+"/role/create",e.addRoleForm).then(function(e){})}),this.addRoleVisible=!this.addRoleVisible,this.getRoleList()},editRole:function(e){this.editRoleVisible=!0,this.editRoleForm=e},deleteRole:function(e){var t=this;this.$axios.delete(this.api+"/role/delete",{params:{r_id:e.id}}).then(function(e){t.getRoleList()})},editRoleInfo:function(){var e=this;console.log(this.editRoleForm),this.$axios.put(this.api+"/role/update",this.editRoleForm).then(function(t){console.log(t),e.getRoleList()}),this.editRoleVisible=!1}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("权限管理")]),e._v(" "),i("el-breadcrumb-item",[e._v("角色列表")])],1),e._v(" "),i("el-card",[i("el-row",{attrs:{gutter:14}},[i("el-col",{attrs:{span:6}},[i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getRoleList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getRoleList},slot:"append"})],1)],1),e._v(" "),i("el-col",{attrs:{span:3}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addRoleVisible=!e.addRoleVisible}}},[e._v("添加角色")])],1)],1),e._v(" "),i("el-table",{key:e.dataKey,staticStyle:{width:"100%"},attrs:{data:e.roleList,height:"100%",border:""}},[i("el-table-column",{attrs:{type:"index",label:"编号",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"title",label:"角色",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"desc",label:"描述"}}),e._v(" "),i("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑信息",placement:"top"}},[i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(i){return e.editRole(t.row)}}})],1)]}}])})],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.queryInfo.page,"page-sizes":[1,10,20,50],"page-size":e.queryInfo.page_size,layout:"prev, pager, next, sizes, total",total:e.total},on:{"size-change":e.sizeChange,"current-change":e.currentChange,"update:currentPage":function(t){return e.$set(e.queryInfo,"page",t)},"update:current-page":function(t){return e.$set(e.queryInfo,"page",t)}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"添加角色",visible:e.addRoleVisible,width:"50%",align:"left"},on:{"update:visible":function(t){e.addRoleVisible=t}}},[i("el-form",{ref:"addRoleFormRef",staticClass:"demo-ruleForm",attrs:{model:e.addRoleForm,rules:e.addRoleFormRul,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"角色",prop:"title"}},[i("el-input",{model:{value:e.addRoleForm.title,callback:function(t){e.$set(e.addRoleForm,"title",t)},expression:"addRoleForm.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"描述",prop:"desc"}},[i("el-input",{model:{value:e.addRoleForm.desc,callback:function(t){e.$set(e.addRoleForm,"desc",t)},expression:"addRoleForm.desc"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"权限",prop:"permissions"}},[i("el-select",{attrs:{multiple:"",placeholder:"选择角色"},model:{value:e.addRoleForm.p_id,callback:function(t){e.$set(e.addRoleForm,"p_id",t)},expression:"addRoleForm.p_id"}},e._l(e.permissionInfo,function(e){return i("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.addRoleVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.addRole}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"修改角色",visible:e.editRoleVisible,width:"50%",align:"left"},on:{"update:visible":function(t){e.editRoleVisible=t}}},[i("el-form",{ref:"addRoleFormRef",staticClass:"demo-ruleForm",attrs:{model:e.editRoleForm,rules:e.addRoleFormRul,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"角色",prop:"title"}},[i("el-input",{model:{value:e.editRoleForm.title,callback:function(t){e.$set(e.editRoleForm,"title",t)},expression:"editRoleForm.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"描述",prop:"desc"}},[i("el-input",{model:{value:e.editRoleForm.desc,callback:function(t){e.$set(e.editRoleForm,"desc",t)},expression:"editRoleForm.desc"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"权限",prop:"permissions"}},[i("el-select",{attrs:{multiple:"",placeholder:"选择权限"},model:{value:e.editRoleForm.p_id,callback:function(t){e.$set(e.editRoleForm,"p_id",t)},expression:"editRoleForm.p_id"}},e._l(e.permissionInfo,function(e){return i("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editRoleVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.editRoleInfo}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=i("VU/8")(l,o,!1,function(e){i("8eEc")},"data-v-7771d07a",null);t.default=a.exports}});
//# sourceMappingURL=3.e087d0ccee71d4c0fdf9.js.map