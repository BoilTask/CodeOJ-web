<template>
	<Content style="padding: 15px;">
		<Card>
			<p slot="title">邮箱验证</p>
			<Row style="text-align: center;">
				<Col span="8">
				<span>您的邮箱：<Tag color="blue">{{email}}</Tag></span>
				<Steps :current="email_step" :status="email_status" size="small">
					<Step title="发送"></Step>
					<Step title="验证"></Step>
					<Step title="成功"></Step>
				</Steps>
				</Col>
				<Col span="16">

				<Button v-if="email_flag==1" disabled>验证完成</Button>
				<span v-else><Input v-model="email_key" placeholder="验证码区分大小写">
					<Button slot="prepend">
						<vueTencentCaptcha appid="2081307488" @callback="sendEmailKey">发送验证码</vueTencentCaptcha>
					</Button>
					<Button slot="append" v-on:click="verifyEmailKey">点击验证</Button></Input></span>
				</Col>
			</Row>
			</p>
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'ManageUserInfo',
		data() {
			return {
				email: '',
				email_flag: 0,
				email_step: 0,
				email_status: 'wait',
				email_key: ''
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT + 'user/' + this.$store.state.loginInfo.user_id + '/email')
				.then(response => {
					this.email = response.data.data.email
					this.email_flag = response.data.data.email_flag
					if (this.email_flag == 1) {
						this.email_step = 2
						this.email_status = 'finish'
					}
				}).catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			sendEmailKey(ticket) {
				if (!ticket.ret) {
					this.$Message.info('正在尝试发送验证码……');
					this.email_status = 'process'
					var params = new URLSearchParams();
					params.append('token', this.$store.state.loginInfo.token);
					params.append('ticket', ticket.ticket);
					params.append('randStr', ticket.randstr);
					axios
						.post(this.$store.state.API_ROOT + 'user/' + this.$store.state.loginInfo.user_id + '/email/get', params)
						.then(response => {
							if (response.data.data.is_ok) {
								this.email_step = 1
								this.$Message.success('发送成功！');
							} else {
								this.email_step = 0
								this.email_status = 'error'
								this.$Message.error('发送失败！');
							}
						}).catch(function(error) {
							this.email_status = 'error'
							this.$Message.error('发送失败！');
						});
				}
			},
			verifyEmailKey() {
				if (this.email_key.length != 6) {
					this.$Message.error('验证码为6位字符！');
				} else {
					var params = new URLSearchParams();
					params.append('token', this.$store.state.loginInfo.token);
					params.append('email_key', this.email_key);
					axios
						.post(this.$store.state.API_ROOT + 'user/' + this.$store.state.loginInfo.user_id + '/email/verify', params)
						.then(response => {
							this.$Spin.hide();
							if (response.data.data.is_ok) {
								this.email_step = 2
								this.email_status = 'finish'
								this.$Message.success('验证成功！');
								this.$router.go(0)
							} else {
								this.email_step = 1
								this.email_status = 'error'
								this.$Message.error('验证失败，请重新发送验证码！');
							}
						}).catch(function(error) {
							this.$Spin.hide();
							this.email_status = 'error'
							this.$Message.error('验证失败！');
						});
				}
			}
		},
	}
</script>

<style>
</style>
