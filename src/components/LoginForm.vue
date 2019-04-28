<template>

	<Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
		<FormItem prop="user_id" label="用户名">
			<Input type="text" v-model="formLogin.user_id" placeholder="Username">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="password" label="密码">
			<Input type="password" v-model="formLogin.password" placeholder="Password" v-on:on-enter="handleSubmit('formLogin')">
			<Icon type="ios-lock-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
			<Button type="error" @click="forgetPasswordShow" style="margin-left: 8px">忘记密码</Button>
		</FormItem>
	</Form>
</template>

<script>
	export default {
		name: 'LoginForm',
		data() {
			const validateUserCheck = (rule, value, callback) => {
				var l = value.length
				if (l < 3 || l > 20) {
					callback(new Error('用户名为3~20位！'));
				} else {
					var uPattern = /^[a-zA-Z0-9]{3,20}$/;
					if (uPattern.test(value))
						callback();
					else
						callback(new Error('用户名为字母或数字！'));
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				var l = value.length
				if (l < 6 || l > 20) {
					callback(new Error('密码为6~20位！'));
				} else {
					callback();
				}
			};
			return {
				formLogin: {
					user_id: '',
					password: '',
				},
				ruleLogin: {
					user_id: [{
						required: true,
						validator: validateUserCheck,
						trigger: 'blur'
					}],
					password: [{
						required: true,
						validator: validatePassCheck,
						trigger: 'blur'
					}],
				},
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Spin.show();
						axios
							.post(this.$store.state.API_ROOT + 'user/login',
								'user_id=' + this.formLogin.user_id + '&password=' + this.formLogin.password)
							.then(response => {
								this.$Spin.hide();
								if (response.data.ret == 200 && response.data.data.isMatch) {

									this.$store.commit('Login', {
										user_id: response.data.data.user_id,
										token: response.data.data.token,
									})

									this.$Message.success('Success!');
									this.$store.commit('drawerChange', false)
									this.$router.go(0)
								} else {
									if (response.data.msg == "")
										this.$Message.error('登录失败，请检查输入！');
									else
										this.$Message.error(response.data.msg);
								}

							}).catch(function(error) {
								this.$Spin.hide();
								console.log(error);
							});
					} else {
						this.$Message.error('请检查输入!');
					}
				})
			},
			forgetPasswordShow: function() {
				this.$store.commit('drawerClose')
				this.$store.commit('modalChange', true)
				this.$store.commit('modalTitle', '忘记密码')
				this.$store.commit('modalContent', 'ForgetPassword')
			}
		}
	}
</script>

<style>
</style>
