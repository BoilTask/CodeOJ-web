<template>
	<div>
		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
			<FormItem label="用户名" prop="user_id">
				<Input v-model="formValidate.user_id" placeholder="userid"></Input>
			</FormItem>
			<FormItem label="密码" prop="password">
				<Input v-model="formValidate.password" placeholder="newpassword"></Input>
			</FormItem>
			<FormItem label="请确认" prop="repeat_password">
				<Input v-model="formValidate.repeat_password" placeholder="repeatpassword"></Input>
			</FormItem>
			<FormItem label="昵称" prop="nickname">
				<Input v-model="formValidate.nickname" placeholder="nickname"></Input>
			</FormItem>
			<FormItem label="邮箱" prop="email">
				<Input v-model="formValidate.email" placeholder="email"></Input>
			</FormItem>
			<FormItem label="组织" prop="organization">
				<Input v-model="formValidate.organization" placeholder="organization"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	export default {
		name: "RegisterForm",
		data() {
			const validatePassCheck = (rule, value, callback) => {
				if (this.formValidate.password !== '' && value === '') {
					callback(new Error('请再次输入新密码！'));
				} else if (value !== this.formValidate.password) {
					callback(new Error('两次密码输入不一致！'));
				} else {
					callback();
				}
			};
			const validateEmailCheck = (rule, value, callback) => {
				var t = value.search(/.+@.+\..+/)
				if (t < 0) {
					callback(new Error('请输入正确的邮箱格式！'));
				} else {
					callback();
				}
			};
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
			return {
				formValidate: {
					user_id: '',
					password: '',
					repeat_password: '',
					nickname: '',
					email: '',
					organization: ''
				},
				ruleValidate: {
					user_id: [{
						required: true,
						validator: validateUserCheck,
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码为6位到20位字符！',
						min: 6,
						max: 20,
						trigger: 'blur'
					}],
					repeat_password: [{
						required: true,
						validator: validatePassCheck,
						trigger: 'blur'
					}],
					nickname: [{
						required: true,
						message: '昵称为1~20位！',
						min: 1,
						max: 20,
						trigger: 'blur'
					}],
					email: [{
						required: true,
						validator: validateEmailCheck,
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Spin.show();
						var params = new URLSearchParams();
						params.append('user_id', this.formValidate.user_id);
						params.append('password', this.formValidate.password);
						params.append('repeat_password', this.formValidate.repeat_password);
						params.append('nickname', this.formValidate.nickname);
						params.append('email', this.formValidate.email);
						params.append('organization', this.formValidate.organization);
						axios
							.post(this.$store.state.API_ROOT + 'user/register', params)
							.then(response => {
								this.$Spin.hide();
								if (response.data.data.is_ok) {
									this.$Message.success('注册成功！');
								} else
									this.$Message.error(response.data.data.msg===''?'注册失败！':response.data.data.msg);
							}).catch(function(error) {
								this.$Spin.hide();
								this.$Message.error('注册失败！');
							});
					} else {
						this.$Message.error('请检查输入!');
					}
				})
			}
		},
	}
</script>
<style scoped>

</style>
