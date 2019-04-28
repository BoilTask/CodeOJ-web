<template>
	<Row>
		<Col span="16">
		<Content style="padding: 10px;">
			<Alert show-icon>
				{{title}}
				<template slot="desc">{{msg}}</template>
			</Alert>
			<Card style="width:100%">
				<div style="text-align:center">
					<img src="https://api.jysafe.cn/randacgimg" alt="访问出现错误!" style="width: 100%;">
				</div>
			</Card>
		</Content>
		</Col>
		<Col span="8">
		<Sider width="100%" hide-trigger>
			<div style="background-color: #f8f8f9; padding: 10px;">

				<ButtonGroup style="margin: 10px;">
					<Button v-on:click="goBack">返回</Button>
					<Button to="/" type="success">首页</Button>
				</ButtonGroup>
				
				<Card style="width:100%">
					<div style="text-align:center">
						<img src="https://api.jysafe.cn/ip" style="width: 100%;">
					</div>
				</Card>
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>
	export default {
		name: 'Error',
		methods: {
			goBack() {
				if (window.history.length > 1)
					this.$router.go(-1)
				else
					this.$router.push('/')
			}
		},
		data() {
			return {
				title: this.$route.params.title,
				msg: this.$route.params.msg
			}
		},
		mounted() {
			if (this.$route.params.msg == null || this.$route.params.msg == '') {
				this.title = "404 Not Find !"
				this.msg = "您访问的页面不存在！"
			}
		}
	}
</script>

<style>
</style>
