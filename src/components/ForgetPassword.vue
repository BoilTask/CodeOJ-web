<template>
	<div>
		<Input v-model="user_id" placeholder='username'>
		<span slot="prepend">用户名：</span>
		<Button slot="append" :loading="getLoading" >
			<vueTencentCaptcha appid='2081307488' @callback="getForgetKey">获取验证码</vueTencentCaptcha>
		</Button>
		</Input>
		<Input v-model="email_key" placeholder='email_key' style="margin-top:10px">
		<span slot="prepend">{{hint}}</span>
		<Button slot="append" @click="verifyEmailKey">发送验证码</Button>
		</Input>
	</div>
</template>

<script>
	export default {
		name: 'ForgetPassword',
		data() {
			return {
				user_id: '',
				email_key: '',
				getLoading:false,
				hint:'验证码：'
			}
		},
		methods: {
			getForgetKey: function(ticket) {
				if (!ticket.ret) {
					let uPattern = /^[a-zA-Z0-9]{3,20}$/;
					if (uPattern.test(this.user_id)) {
						this.getLoading=true;
						this.hint='验证码：'
						this.$Message.info('正在尝试发送验证码……');
						var params = new URLSearchParams();
						params.append('ticket', ticket.ticket);
						params.append('randStr', ticket.randstr);
						params.append('user_id', this.user_id);
						axios
							.post(this.$store.state.API_ROOT + 'user/password', params)
							.then(response => {
								if (response.data.data.is_ok) {
									this.$Message.success(response.data.data.msg === '' ? '发送成功，请前往邮箱接收！' : response.data.data.msg)
								} else {
									this.$Message.error(response.data.data.msg === '' ? '发送失败！' : response.data.data.msg)
								}
								this.getLoading=false;
							}).catch(function(error) {
								this.$Message.error('发送失败！');
								this.getLoading=false;
							});

					} else {
						this.$Message.error('用户名格式不符！');
					}
				}
			},
			verifyEmailKey() {
				if (this.email_key.length != 6) {
					this.$Message.error('验证码为6位字符！');
				} else {
					this.$Message.info('正在验证信息……');
					var params = new URLSearchParams();
					params.append('user_id', this.user_id);
					params.append('email_key', this.email_key);
					axios
						.post(this.$store.state.API_ROOT + 'user/' + this.user_id + '/password', params)
						.then(response => {
							if (response.data.data.is_ok) {
								this.email_key = response.data.data.password
								this.hint='新密码：'
								this.$Message.success("重置成功，新的密码为：" + response.data.data.password);
							} else {
								this.$Message.error('验证失败，请重新发送验证码！');
							}
						}).catch(function(error) {
							this.$Message.error('验证失败！');
						});
				}
			}
		}
	}
</script>

<style>
</style>
