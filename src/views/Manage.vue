<template>
	<Row>
		<Col span="16">
		<router-view></router-view>
		</Col>
		<Col span="8">
		<div style="padding: 25px;">

			<Menu style="width: 80%;margin: 0 auto;z-index: 850;" :active-name="menuactive" :open-names="['1','2','3']">
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
				<Submenu name="3">
					<template slot="title">
						<Icon type="ios-stats" />
						系统设置
					</template>
						<MenuGroup title="个性设置">
							<MenuItem name="domain" to="/manage/domain">端口切换</MenuItem>
						</MenuGroup>
					<template v-if="isAdministrator">
						<MenuGroup title="后台管理">
							<MenuItem name="carouse" to="/manage/carouse">首页轮播</MenuItem>
							<MenuItem name="news" to="/manage/news">首页新闻</MenuItem>
							<MenuItem name="problem" to="/manage/problem">问题管理</MenuItem>
						</MenuGroup>
					</template>
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
			this.$Spin.show();
			var params = new URLSearchParams();
			params.append('user_id', this.$store.state.loginInfo.user_id);
			params.append('token', this.$store.state.loginInfo.token);
			axios
				.post(this.$store.state.API_ROOT + 'auth/' + this.$route.params.id + '/administrator', params)
				.then(response => {
					this.isAdministrator = response.data.data;
					this.$Spin.hide();
				}).catch(function(error) {
					this.$Spin.hide();
				});

		}
	}
</script>

<style>
</style>
