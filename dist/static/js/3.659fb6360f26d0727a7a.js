webpackJsonp([3],{NXVk:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={data:function(){return{dialogDisable:!1,value:!1,dataKey:!1,switchDisable:!1,queryInfo:{query:"",page:1,page_size:10},userInfo:[{id:0,username:""}],addOrderVisible:!1,editOrderVisible:!1,isA:!0,isP:!1,OrderList:[{id:0,order_name:{product_name:"产品一号"},order_client:"1号客户",order_number:100,order_price:10,order_total_price:1e3,order_time:"2022-04-01",status:"下单"}],total:0,addOrderForm:{id:0,order_client:"",order_name:0,order_number:0,order_price:0,order_total_price:""},editOrderForm:{id:0,order_client:"",order_name:0,order_number:0,order_price:0,order_total_price:""},addOrderFormRul:{order_client:[{required:!0,message:"请输入用户名称",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}],order_name:[{required:!0,message:"请选择产品",trigger:"blur"}]},productInfo:[{id:1,product_name:""}]}},mounted:function(){this.getOrderList()},methods:{changeEdit:function(){this.dialogDisable=!this.value},getProductList:function(){var e=this;this.$axios.get(this.api+"/order/list").then(function(r){e.productInfo=r.data.list})},getOrderList:function(){var e=this;this.$axios.get(this.api+"/order/list",{params:this.queryInfo}).then(function(r){e.OrderList=r.data.list,e.total=r.data.pagination.total,e.dataKey=!e.dataKey})},sizeChange:function(e){this.queryInfo.page_size=e,this.getOrderList()},currentChange:function(e){this.queryInfo.page=e,this.getOrderList()},addOrder:function(){var e=this;this.$refs.addOrderFormRef.validate(function(r){if(!r)return alert("请输入正确的信息");e.$axios.post(e.api+"/order/create",e.addOrderForm).then(function(r){e.getOrderList()})}),this.addOrderVisible=!this.addOrderVisible},editOrder:function(e){this.editOrderVisible=!0,this.dialogDisable=!0,this.value=!1,this.editOrderForm=e,console.log(this.editOrderForm.status),2==this.editOrderForm.status?this.switchDisable=!0:(console.log("sss"),this.switchDisable=!1)},editOrderInfo:function(){var e=this;this.$axios.put(this.api+"/order/update",this.editOrderForm).then(function(r){e.getOrderList()}),this.editOrderVisible=!1,this.dialogDisable=!1},auditOrder:function(e){var r=this;this.$axios.get(this.api+"/order/confirm",{params:{id:e.id}}).then(function(e){r.getOrderList()})}}},o={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),t("el-breadcrumb-item",[e._v("订单管理")]),e._v(" "),t("el-breadcrumb-item",[e._v("订单列表")])],1),e._v(" "),t("el-card",[t("el-row",{attrs:{gutter:14}},[t("el-col",{attrs:{span:6}},[t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getOrderList},model:{value:e.queryInfo.query,callback:function(r){e.$set(e.queryInfo,"query",r)},expression:"queryInfo.query"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getOrderList},slot:"append"})],1)],1),e._v(" "),t("el-col",{attrs:{span:3}},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.addOrderVisible=!e.addOrderVisible}}},[e._v("添加订单")])],1)],1),e._v(" "),t("el-table",{key:e.dataKey,staticStyle:{width:"100%"},attrs:{data:e.OrderList,height:"100%",border:""}},[t("el-table-column",{attrs:{type:"index",label:"编号",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"order_name.product_name",label:"产品",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"order_client",label:"客户"}}),e._v(" "),t("el-table-column",{attrs:{prop:"order_number",label:"数量"}}),e._v(" "),t("el-table-column",{attrs:{prop:"order_price",label:"单价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"order_total_price",label:"总价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"order_time",label:"订货时间"}}),e._v(" "),t("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑",placement:"top"}},[t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return e.editOrder(r.row)}}})],1),e._v(" "),1==r.row.status?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"确认",placement:"top"}},[t("el-button",{attrs:{type:"danger",icon:"el-icon-s-claim",size:"mini"},on:{click:function(t){return e.auditOrder(r.row)}}})],1):e._e()]}}])})],1),e._v(" "),t("el-pagination",{attrs:{"current-page":e.queryInfo.page,"page-sizes":[1,10,20,50],"page-size":e.queryInfo.page_size,layout:"prev, pager, next, sizes, total",total:e.total},on:{"size-change":e.sizeChange,"current-change":e.currentChange,"update:currentPage":function(r){return e.$set(e.queryInfo,"page",r)},"update:current-page":function(r){return e.$set(e.queryInfo,"page",r)}}})],1),e._v(" "),t("el-dialog",{attrs:{title:"添加生产单",visible:e.addOrderVisible,width:"50%",align:"left"},on:{"update:visible":function(r){e.addOrderVisible=r}}},[t("el-form",{ref:"addOrderFormRef",staticClass:"demo-ruleForm",attrs:{model:e.addOrderForm,rules:e.addOrderFormRul,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"客户",prop:"order_client"}},[t("el-input",{model:{value:e.addOrderForm.order_client,callback:function(r){e.$set(e.addOrderForm,"order_client",r)},expression:"addOrderForm.order_client"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"产品",prop:"order_name"}},[t("el-select",{attrs:{clearable:"",placeholder:"选择产品"},model:{value:e.addOrderForm.order_name,callback:function(r){e.$set(e.addOrderForm,"order_name",r)},expression:"addOrderForm.order_name"}},e._l(e.productInfo,function(e){return t("el-option",{key:e.id,attrs:{label:e.product_name,value:e.id}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"数量",prop:"order_number"}},[t("el-input",{model:{value:e.addOrderForm.order_number,callback:function(r){e.$set(e.addOrderForm,"order_number",r)},expression:"addOrderForm.order_number"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"单价",prop:"order_price"}},[t("el-input",{model:{value:e.addOrderForm.order_price,callback:function(r){e.$set(e.addOrderForm,"order_price",r)},expression:"addOrderForm.order_price"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总价",prop:"order_total_price"}},[t("el-input",{model:{value:e.addOrderForm.order_total_price,callback:function(r){e.$set(e.addOrderForm,"order_total_price",r)},expression:"addOrderForm.order_total_price"}})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(r){e.addOrderVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.addOrder}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"修改生产单",visible:e.editOrderVisible,width:"50%",align:"left"},on:{"update:visible":function(r){e.editOrderVisible=r}}},[t("span",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[t("el-switch",{attrs:{disabled:e.switchDisable},on:{change:e.changeEdit},model:{value:e.value,callback:function(r){e.value=r},expression:"value"}})],1),e._v(" "),t("el-form",{ref:"addOrderFormRef",staticClass:"demo-ruleForm",attrs:{model:e.editOrderForm,rules:e.addOrderFormRul,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"客户",prop:"order_client"}},[t("el-input",{attrs:{disabled:!0},model:{value:e.editOrderForm.order_client,callback:function(r){e.$set(e.editOrderForm,"order_client",r)},expression:"editOrderForm.order_client"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"产品",prop:"order_name"}},[t("el-select",{attrs:{clearable:"",placeholder:"选择产品",disabled:!0},model:{value:e.editOrderForm.order_name,callback:function(r){e.$set(e.editOrderForm,"order_name",r)},expression:"editOrderForm.order_name"}},e._l(e.productInfo,function(e){return t("el-option",{key:e.id,attrs:{label:e.product_name,value:e.id}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"数量",prop:"order_number"}},[t("el-input",{model:{value:e.editOrderForm.order_number,callback:function(r){e.$set(e.editOrderForm,"order_number",r)},expression:"editOrderForm.order_number"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"单价",prop:"order_price"}},[t("el-input",{model:{value:e.editOrderForm.order_price,callback:function(r){e.$set(e.editOrderForm,"order_price",r)},expression:"editOrderForm.order_price"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总价",prop:"order_total_price"}},[t("el-input",{model:{value:e.editOrderForm.order_total_price,callback:function(r){e.$set(e.editOrderForm,"order_total_price",r)},expression:"editOrderForm.order_total_price"}})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(r){e.editOrderVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary",disabled:e.dialogDisable},on:{click:e.editOrderInfo}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=t("VU/8")(i,o,!1,function(e){t("XVmM")},"data-v-938bb6ea",null);r.default=a.exports},XVmM:function(e,r){}});
//# sourceMappingURL=3.659fb6360f26d0727a7a.js.map