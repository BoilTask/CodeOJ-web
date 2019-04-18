<template>
	<Header :style="{padding: '0'}">
		<Menu mode="horizontal" :active-name="menuactive" :style="{width: '100%' , height:'100%'}">
			<MenuItem name="home" to="/">
			<Icon type="ios-paper" />
			CodeOJ
			</MenuItem>
			<MenuItem name="problem" to="/problem">
			<Icon type="ios-people" />
			问题
			</MenuItem>
			<MenuItem name="status" to="/status">
			<Icon type="ios-people" />
			状态
			</MenuItem>
			<MenuItem name="ai" to="/ai">
			<Icon type="ios-people" />
			对战
			</MenuItem>
			<MenuItem name="rank" to="/rank">
			<Icon type="ios-people" />
			排名
			</MenuItem>
			<Submenu name="discuss">
				<template slot="title">
					<Icon type="ios-stats" />
					社区
				</template>
				<MenuItem name="blog" to="/blog">
				博客
				</MenuItem>
				<MenuItem name="bbs" to="/blog">
				论坛
				</MenuItem>
			</Submenu>
			<Submenu name="contest">
				<template slot="title">
					<Icon type="ios-stats" />
					竞赛
				</template>
				<MenuItem name="3-1" to="/contest">
				比赛
				</MenuItem>
				<MenuItem name="3-2" to="/contest">
				训练
				</MenuItem>
				<MenuItem name="3-3" to="/contest">
				考试
				</MenuItem>
			</Submenu>
			<MenuItem name="help" to="/help">
			<Icon type="ios-people" />
			帮助
			</MenuItem>
			<div class="nav-profile">

				<Submenu v-if="isLogin" name="profile">
					<template slot="title">
						<Icon type="ios-people" />
						{{ user_id }}
					</template>
					<MenuItem name="logout" @click.native="logout">
					注销
					</MenuItem>
				</Submenu>
				<Submenu v-else name="profile">
					<template slot="title">
						<Icon type="ios-people" />
						用户
					</template>
					<MenuItem name="login" @click.native="loginShow">
					登录
					</MenuItem>
					<MenuItem name="register">
					注册
					</MenuItem>
				</Submenu>
			</div>
		</Menu>

	</Header>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'Ojheader',
		data() {
			return {

			}
		},
		computed: {
			menuactive: function() {
				let url = this.$route.path
				let activeName = url.split("/")[1]
				if (activeName == "") {
					activeName = "home"
				}
				return activeName
			},
			isLogin: function() {
				return this.$store.state.loginInfo.isLogin
			},
			user_id: function() {
				if (this.$store.state.loginInfo.isLogin)
					return this.$store.state.loginInfo.user_id
				else
					return '用户'
			}
		},
		methods: {
			loginShow: function() {
				this.$store.commit('drawerChange', true)
				this.$store.commit('drawerTitle', '登录')
			},
			logout: function() {
				this.$Spin.show();
				axios
					.post(this.$store.state.API_ROOT + 'user/logout',
						'user_id=' + this.user_id + '&token=' + this.$store.state.loginInfo.token)
					.then(response => {
						this.$Spin.hide();
						this.$store.commit('Logout')
						this.$router.go(0)
						this.$Message.success('注销成功!');
					}).catch(function(error) {
						this.$Spin.hide();
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.background-box {
		background-color: #FFFFFF;
		box-shadow: 0 2px 3px 2px rgba(0, 0, 0, .1);
	}

	.nav-profile {
		float: right;
	}
</style>
