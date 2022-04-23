<template>
  <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>原料仓库</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="14">
          <el-col :span="6">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getGoodWarehouseList">
              <el-button slot="append" icon="el-icon-search" @click="getGoodWarehouseList"></el-button>
            </el-input>
          </el-col>
        </el-row>
         <!-- 渲染数据表格 -->
        <el-table
        :data="goodWarehouseList"
        height="100%"
        border
        :key="dataKey"
        style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="source_name.good_name" label="原料名称" width="180"> </el-table-column>
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
        goodWarehouseList:[{
          id:0,
          source_name:{},
          number:0,
          unit:"",
          current_time:""
        }]
      }
  },
  mounted() {
    this.getGoodWarehouseList();
  },
  methods:{
      //请求用户列表数据
    getGoodWarehouseList(){
      this.$axios.get(this.api + '/good/warehouse/list', {params:this.queryInfo})
        .then(res=>{
          console.log(res.data)
          this.goodWarehouseList = res.data.list;
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

