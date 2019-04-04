<template>
	<Header :style="{padding: '0'}">
		<Menu mode="horizontal" :active-name="menuactive" :style="{width: '100%' , height:'100%'}">
			<MenuItem name="/" to="/">
			<Icon type="ios-paper" />
			CodeOJ
			</MenuItem>
			<MenuItem name="/problem" to="/problem">
			<Icon type="ios-people" />
			问题
			</MenuItem>
			<MenuItem name="/status" to="/status">
			<Icon type="ios-people" />
			状态
			</MenuItem>
			<MenuItem name="/ai" to="/ai">
			<Icon type="ios-people" />
			对战
			</MenuItem>
			<MenuItem name="/rank" to="/rank">
			<Icon type="ios-people" />
			排名
			</MenuItem>
			<Submenu name="/discuss">
				<template slot="title">
					<Icon type="ios-stats" />
					社区
				</template>
				<MenuItem name="/blog" to="/blog">
				博客
				</MenuItem>
				<MenuItem name="/bbs" to="/blog">
				论坛
				</MenuItem>
			</Submenu>
			<Submenu name="/contest">
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
			<MenuItem name="/help" to="/help">
			<Icon type="ios-people" />
			帮助
			</MenuItem>
			<div class="nav-profile">
				<Submenu name="/profile">
					<template slot="title">
						<Icon type="ios-people" />
						{{ user }}
					</template>
					<MenuItem name="/login">
					登录
					</MenuItem>
					<MenuItem name="/register">
					注册
					</MenuItem>
				</Submenu>
			</div>
		</Menu>
	</Header>
</template>

<script>
	export default {
		name: 'Ojheader',
		data() {
			return {
				menuactive: this.$route.path,
				user: '用户'
			}
		},
		watch: {
			'$route'() {
				this.menuactive = this.$route.path
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
