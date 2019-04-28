<template>
	<Header :style="{padding: '0'}">
		<Menu mode="horizontal" :active-name="menuactive" style="width:100%;height:100%;text-align:center;">
			<MenuItem name="home" to="/">
			<Icon type="md-code" />
			CodeOJ
			</MenuItem>
			<MenuItem name="problem" to="/problem">
			<Icon type="ios-paper" />
			问题
			</MenuItem>
			<MenuItem name="status" to="/status">
			<Icon type="md-filing" />
			状态
			</MenuItem>
			<MenuItem name="ai" to="/ai">
			<Icon type="logo-snapchat" />
			对战
			</MenuItem>
			<MenuItem name="rank" to="/rank">
			<Icon type="ios-stats" />
			排名
			</MenuItem>
			<Submenu name="discuss">
				<template slot="title">
					<Icon type="md-bonfire" />
					社区
				</template>
				<MenuItem name="blog" to="/blog">
				<Icon type="ios-document" />
				博客
				</MenuItem>
				<MenuItem name="bbs" to="/blog">
				<Icon type="ios-beer" />
				论坛
				</MenuItem>
			</Submenu>
			<Submenu name="contest">
				<template slot="title">
					<Icon type="ios-calendar" />
					竞赛
				</template>
				<MenuItem name="3-1" to="/contest">
				<Icon type="md-medal" />
				比赛
				</MenuItem>
				<MenuItem name="3-2" to="/contest">
				<Icon type="ios-snow" />
				训练
				</MenuItem>
				<MenuItem name="3-3" to="/contest">
				<Icon type="ios-pulse" />
				考试
				</MenuItem>
			</Submenu>
			<div class="nav-profile">
				<Submenu v-if="isLogin" name="profile">
					<template slot="title">
						<Icon type="ios-person" />
						{{ user_id }}
					</template>
					<MenuItem name="user" :to="'/user/'+user_id">
					<Icon type="ios-chatbubbles" />
					空间
					</MenuItem>
					<MenuItem name="message" @click.native="messageShow">
					<Icon type="ios-chatbubbles" />
					消息
					</MenuItem>
					<MenuItem name="manage" to='/manage'>
					<Icon type="ios-contact" />
					管理
					</MenuItem>
					<MenuItem name="logout" @click.native="logout" style="color: #ff9900">
					<Icon type="md-exit" />
					<span>注销</span>
					</MenuItem>
				</Submenu>
				<Submenu v-else name="profile">
					<template slot="title">
						<Icon type="ios-finger-print" />
						用户
					</template>
					<MenuItem name="login" @click.native="loginShow">
					<Icon type="md-log-in" />
					登录
					</MenuItem>
					<MenuItem name="register" @click.native="registerShow">
					<Icon type="ios-rose" />
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
				this.$store.commit('drawerContent', 'LoginForm')
			},
			registerShow: function() {
				this.$store.commit('drawerChange', true)
				this.$store.commit('drawerTitle', '注册')
				this.$store.commit('drawerContent', 'RegisterForm')
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
