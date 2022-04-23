<template>
     <el-container class="home-container">
		 <!-- 头部 -->
       <el-header>
		   <div>
			    <img src="../assets/factory.png"  />
				<span>工厂管理系统</span>
		   </div>
		  
		   <el-button type="primary" @click="loginOut">退出</el-button>
	    </el-header>
       <el-container>
		   		   <!-- 左边菜单部分 -->
         <el-aside :width="isCollapse?'64px':'200px'" >
			 <!-- 收起导航栏 -->
		   	<div style="color: #fff;background: rgb(74, 80, 100); cursor: pointer;" @click="isCollapse=!isCollapse">></div>

			 <el-menu
				:default-active="activePath"
				class="el-menu-vertical-demo"
				background-color="#333744"
				text-color="#fff"
				active-text-color="#409EFF"
				:unique-opened=true
				:router="true"
				:collapse="isCollapse"
				:collapse-transition="false"
				>
				<!-- 一级导航 -->
				<!-- index 需要唯一 否则 unique-opened 无效 -->
				<el-submenu :index="item.id+''" v-for="item in menulists" :key="item.id">
					<template slot="title">
					<i class="el-icon-location"></i>
					<span>{{item.title}}</span>
					</template>
					    <!-- 二级导航 -->
						<el-menu-item :index="item2.url+''" v-for="item2 in item.children" :key="item2.id" @click="activeSave(item2.url+'')">
							<i class="el-icon-menu"></i>
							<span>{{item2.title}}</span>
						</el-menu-item>
				</el-submenu>
    		</el-menu>
		 </el-aside>
         <el-main>
			 <router-view></router-view>
		 </el-main>
       </el-container>
     </el-container>
</template>

<script>

export default {
  name: 'Home',
  data(){
	  return {
		  //左侧菜单
		  menulists:[{
						'title': '用户管理',
						'icon': 'el-icon-location',
						'id': 1,
						'children': [{'title': '用户列表', 'url': 'user', 'id': 1},
									{'title': '部门列表', 'url': 'dept', 'id': 11}
									]
						},
						{
							'title': '权限管理',
							'icon': 'el-icon-s-check',
							'id': 2,
							'children': [{'title': '权限列表', 'url': 'permission', 'id': 2},
									{'title': '角色列表', 'url': 'roles', 'id': 7},
									{'title': '菜单列表', 'url': 'menus', 'id': 12}
									]
						}
			],
		  objicon:{
			//   匹配icon图标
			  "125":'iconfont icon-icon_user',
			  "103":'iconfont icon-shangpin',
			  "101":'iconfont icon-danju',
			  "102":'iconfont icon-tijikongjian',
			  "145":'iconfont icon-baobiao'
		  },
		  //是否水平折叠菜单
		  isCollapse:false,
		  //当前激活的路径
		  activePath:''
		  
	  }
  },
   mounted() {
      this.get_menu_tree();
	},
  methods:{
	  //退出登录
	 loginOut(){
		 window.sessionStorage.clear();
		 this.$router.push({path:'/login'}) //回退登录页
	 },
	 //点击导航，有激活的状态
	activeSave(path){
		this.activePath = path;
		window.sessionStorage.setItem('activePath',path);
	},
	get_menu_tree(){
	this.$axios.get(this.api + '/menu/tree').then(res=>{
		console.log(res);
		this.menulists = res.data.list;
		
	})
  },
  },

  created() {
	  //导航激活的状态
	  this.activePath = window.sessionStorage.getItem('activePath');
	//   //获取左侧菜单
  
  }
 
}
</script>

<style scoped="scoped">
	.home-container{
		height: 100%;
		background: #c4c4c4;
	}
	.el-container{
		height: 100%;
	}
	.el-header{
		background: #333744;
		display: flex;
		justify-content: space-between;
		color: #fff;
		font-size: 20px;
    line-height: 60px;
	}
	.el-header img{
		vertical-align: middle;
		width: 60px;
		height: 65px;
	}
 .el-aside{
		background: #333744;
		height: 100%;
		box-sizing: border-box;
	}
	.el-main{
		background: #ececec;
	}
</style>
