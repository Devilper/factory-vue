<template>
  <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品仓库</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getProductWarehouseList">
              <el-button slot="append" icon="el-icon-search" @click="getProductWarehouseList"></el-button>
            </el-input>
          </el-col>
        </el-row>
         <!-- 渲染数据表格 -->
        <el-table
        :data="productWarehouseList"
        height="100%"
        border
        :key="dataKey"
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="product_name.product_name" label="产品名称" width="180"> </el-table-column>
            <el-table-column prop="number" label="数量"> </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>
            <el-table-column prop="current_time" label="入库时间"> </el-table-column>
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
  </div>
</template>

<script>
export default {
  data(){
      return{
        dataKey: false,
        // 当前数据总数
        total:0,
        queryInfo:{
          query:"",
          page:1,
          page_size:10,
        },
        productWarehouseList:[{
          id:0,
          product_name:{},
          number:0,
          unit:"",
          current_time:""
        }]
      }
  },
  mounted() {
    this.getProductWarehouseList();
  },
  methods:{
      //请求用户列表数据
    getProductWarehouseList(){
      this.$axios.get(this.api + '/product/warehouse/list', {params:this.queryInfo})
        .then(res=>{
          console.log(res.data)
          this.productWarehouseList = res.data.list;
          this.total = res.data.pagination.total;
          this.dataKey = !this.dataKey;
      })
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
    }
  }
}
</script>

