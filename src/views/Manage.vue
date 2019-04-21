<template>
	<Row>
		<Col span="16">
		<router-view></router-view>
		</Col>
		<Col span="8">
		<div style="padding: 25px;">

			<Menu style="width: 80%;margin: 0 auto;z-index: 850;" :active-name="menuactive" :open-names="['1','2']">
				<Submenu name="1">
					<template slot="title">
						<Icon type="ios-person" />
						信息管理
					</template>
					<MenuItem name="user" to="/manage/user">编辑资料</MenuItem>
					<MenuItem name="userinfo" to="/manage/userinfo">更新信息</MenuItem>
				</Submenu>
				<Submenu name="2">
					<template slot="title">
						<Icon type="ios-document" />
						博客管理
					</template>
					<MenuItem name="blog" to="/manage/blog">文章管理</MenuItem>
					<MenuItem name="blogdiscuss" to="/manage/blogdiscuss">评论管理</MenuItem>
				</Submenu>
				<Submenu name="3" v-if="isAdministrator">
					<template slot="title">
						<Icon type="ios-stats" />
						系统管理
					</template>
					<MenuGroup title="使用">
						<MenuItem name="3-1">新增和启动</MenuItem>
						<MenuItem name="3-2">活跃分析</MenuItem>
						<MenuItem name="3-3">时段分析</MenuItem>
					</MenuGroup>
					<MenuGroup title="留存">
						<MenuItem name="3-4">用户留存</MenuItem>
						<MenuItem name="3-5">流失用户</MenuItem>
					</MenuGroup>
				</Submenu>
			</Menu>
		</div>
		</Col>
	</Row>
</template>

<script>
	export default {
		name: 'Manage',
		data() {
			return {
				isAdministrator: false
			}
		},
		computed: {
			menuactive: function() {
				let url = this.$route.path
				let activeName = url.split("/")[2]
				if (activeName == null || activeName == "") {
					activeName = "user"
				}
				return activeName
			},
		},
		mounted() {


		}
	}
</script>

<style>
</style>
