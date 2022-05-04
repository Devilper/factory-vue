webpackJsonp([4],{"90er":function(e,t){},wNDr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={data:function(){return{dataKey:!1,queryInfo:{query:"",page:1,page_size:10},addPermVisible:!1,editPermVisible:!1,permList:[{id:0,action:"",title:"",menu:"",parent:"",url:""}],total:0,addPermForm:{id:0,action:void 0,title:"",menu:void 0,parent:void 0,url:""},editPermForm:{id:0,action:void 0,title:"",menu:void 0,parent:void 0,url:""},addPermFormRul:{title:[{required:!0,message:"请输入角色名称",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}],url:[{required:!0,message:"请输入角色路由",trigger:"blur"},{min:2,max:200,message:"长度在 2 到 200 个字符",trigger:"blur"}],menu:[{required:!0,message:"请输入角色路由",trigger:"blur"}]},permissionInfo:[{id:1,title:"用户列表",url:"/user/",action:1,parent:null,menu:1}],menuInfo:[{id:"",desc:"",title:"",p_id:[]}]}},mounted:function(){this.getPermList(),this.getMenuList()},methods:{addPermV:function(){this.getPermList(1e4),this.addPermVisible=!this.addPermVisible},getPermList:function(e){var t=this;1e4===e&&(this.queryInfo.page_size=e),this.$axios.get(this.api+"/permission/list",{params:this.queryInfo}).then(function(e){t.permList=e.data.list,t.total=e.data.pagination.total,t.permissionInfo=e.data.list,t.dataKey=!t.dataKey})},getMenuList:function(){var e=this;this.$axios.get(this.api+"/menu/list",{params:{page_size:1e5}}).then(function(t){console.log(t.data),e.menuInfo=t.data.list,console.log("menu")})},sizeChange:function(e){this.queryInfo.page_size=e,this.getPermList()},currentChange:function(e){this.queryInfo.page=e,this.getPermList()},addPerm:function(){var e=this;this.$refs.addPermFormRef.validate(function(t){if(!t)return alert("请输入正确的信息");console.log("perm"),console.log(e.addPermForm),""==e.addPermForm.parent&&(e.addPermForm.parent=0),e.$axios.post(e.api+"/permission/create",e.addPermForm).then(function(e){})}),this.addPermVisible=!this.addPermVisible,this.getPermList(),console.log(this.permList)},editPerm:function(e){console.log("pernm"),console.log(this.menuInfo),this.getPermList(1e5),this.editPermVisible=!0,this.editPermForm=e},editPermInfo:function(){var e=this;this.$axios.put(this.api+"/permission/update",this.editPermForm).then(function(t){console.log(t),e.getPermList()}),this.editPermVisible=!1,this.getPermList()}}},l={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),r("el-breadcrumb-item",[e._v("权限管理")]),e._v(" "),r("el-breadcrumb-item",[e._v("权限列表")])],1),e._v(" "),r("el-card",[r("el-row",{attrs:{gutter:14}},[r("el-col",{attrs:{span:6}},[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getPermList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getPermList},slot:"append"})],1)],1),e._v(" "),r("el-col",{attrs:{span:3}},[r("el-button",{attrs:{type:"primary"},on:{click:e.addPermV}},[e._v("添加权限")])],1)],1),e._v(" "),r("el-table",{key:e.dataKey,staticStyle:{width:"100%"},attrs:{data:e.permList,height:"100%",border:""}},[r("el-table-column",{attrs:{type:"index",label:"编号",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"title",label:"名称",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"url",label:"路由"}}),e._v(" "),r("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑信息",placement:"top"}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(r){return e.editPerm(t.row)}}})],1)]}}])})],1),e._v(" "),r("el-pagination",{attrs:{"current-page":e.queryInfo.page,"page-sizes":[1,10,20,50],"page-size":e.queryInfo.page_size,layout:"prev, pager, next, sizes, total",total:e.total},on:{"size-change":e.sizeChange,"current-change":e.currentChange,"update:currentPage":function(t){return e.$set(e.queryInfo,"page",t)},"update:current-page":function(t){return e.$set(e.queryInfo,"page",t)}}})],1),e._v(" "),r("el-dialog",{attrs:{title:"添加角色",visible:e.addPermVisible,width:"50%",align:"left"},on:{"update:visible":function(t){e.addPermVisible=t}}},[r("el-form",{ref:"addPermFormRef",staticClass:"demo-ruleForm",attrs:{model:e.addPermForm,rules:e.addPermFormRul,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"权限名称",prop:"title"}},[r("el-input",{model:{value:e.addPermForm.title,callback:function(t){e.$set(e.addPermForm,"title",t)},expression:"addPermForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"url",prop:"url"}},[r("el-input",{model:{value:e.addPermForm.url,callback:function(t){e.$set(e.addPermForm,"url",t)},expression:"addPermForm.url"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"菜单",prop:"menu"}},[r("el-select",{attrs:{placeholder:"选择菜单"},model:{value:e.addPermForm.menu,callback:function(t){e.$set(e.addPermForm,"menu",t)},expression:"addPermForm.menu"}},e._l(e.menuInfo,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"父级权限",prop:"parent"}},[r("el-select",{attrs:{clearable:"",placeholder:"选择权限"},model:{value:e.addPermForm.parent,callback:function(t){e.$set(e.addPermForm,"parent",t)},expression:"addPermForm.parent"}},e._l(e.permissionInfo,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addPermVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.addPerm}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"添加角色",visible:e.editPermVisible,width:"50%",align:"left"},on:{"update:visible":function(t){e.editPermVisible=t}}},[r("el-form",{ref:"addPermFormRef",staticClass:"demo-ruleForm",attrs:{model:e.editPermForm,rules:e.addPermFormRul,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"权限名称",prop:"title"}},[r("el-input",{model:{value:e.editPermForm.title,callback:function(t){e.$set(e.editPermForm,"title",t)},expression:"editPermForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"url",prop:"url"}},[r("el-input",{model:{value:e.editPermForm.url,callback:function(t){e.$set(e.editPermForm,"url",t)},expression:"editPermForm.url"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"菜单",prop:"menu"}},[r("el-select",{attrs:{placeholder:"选择菜单"},model:{value:e.editPermForm.menu,callback:function(t){e.$set(e.editPermForm,"menu",t)},expression:"editPermForm.menu"}},e._l(e.menuInfo,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"父级权限",prop:"parent"}},[r("el-select",{attrs:{clearable:"",placeholder:"选择权限"},model:{value:e.editPermForm.parent,callback:function(t){e.$set(e.editPermForm,"parent",t)},expression:"editPermForm.parent"}},e._l(e.permissionInfo,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editPermVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.editPermInfo}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=r("VU/8")(i,l,!1,function(e){r("90er")},"data-v-7799b7f6",null);t.default=a.exports}});
//# sourceMappingURL=4.d05daae31070ca31208e.js.map