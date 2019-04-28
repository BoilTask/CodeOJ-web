<template>
	<Content style="padding: 15px;">
		<Card>
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem label="用户名" prop="user_id">
					<Input v-model="formValidate.user_id" placeholder="userid" disabled></Input>
				</FormItem>
				<FormItem label="原密码" prop="old_password">
					<Input type="password" v-model="formValidate.old_password" placeholder="oldpassword"></Input>
				</FormItem>
				<FormItem label="新密码" prop="new_password">
					<Input type="password" v-model="formValidate.new_password" placeholder="newpassword"></Input>
				</FormItem>
				<FormItem label="请确认" prop="repeat_password">
					<Input type="password" v-model="formValidate.repeat_password" placeholder="repeatpassword"></Input>
				</FormItem>
				<FormItem label="昵称" prop="nickname">
					<Input v-model="formValidate.nickname" placeholder="nickname"></Input>
				</FormItem>
				<FormItem label="邮箱" prop="email">
					<Input v-model="formValidate.email" placeholder="email">
					<span v-if="formValidate.email_flag==1" slot="append" style="color: #19be6b;">原邮箱是否验证：
						<Icon type="md-checkmark-circle" /></span>
					<span v-else slot="append" style="color: #ed4014;">原邮箱是否验证：
						<Icon type="md-close-circle" /></span>
					</Input>
					<p>
						<Icon type="md-attach" />修改后请点击右侧 <Tag color="blue">更新信息</Tag> 进行邮箱验证</p>
				</FormItem>
				<FormItem label="组织" prop="organization">
					<Input v-model="formValidate.organization" placeholder="organization"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
				</FormItem>
			</Form>

		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'ManageUser',
		data() {
			const validateOldPassCheck = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('请检查输入！'));
				} else {
					var params = new URLSearchParams();
					params.append('user_id', this.$store.state.loginInfo.user_id);
					params.append('password', value);
					axios
						.post(this.$store.state.API_ROOT + 'user/check', params)
						.then(response => {
							this.$Spin.hide();
							if (response.data.data.is_ok) {
								callback();
							} else {
								callback(new Error('原密码不符！'));
							}
						}).catch(function(error) {
							callback(new Error('服务器连接失败！'));
						});
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if (this.formValidate.new_password !== '' && value === '') {
					callback(new Error('请再次输入新密码！'));
				} else if (value !== this.formValidate.new_password) {
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
			return {
				formValidate: {
					user_id: '',
					old_password: '',
					new_password: '',
					repeat_password: '',
					nickname: '',
					email: '',
					email_flag:0,
					organization: ''
				},
				ruleValidate: {
					user_id: [{
						required: true,
						message: '用户名不能为空！',
						trigger: 'blur'
					}],
					old_password: [{
						validator: validateOldPassCheck,
						trigger: 'blur'
					}],
					new_password: [{
						required: false,
						message: '密码为6位到20位字符！',
						min: 6,
						max: 20,
						trigger: 'blur'
					}],
					repeat_password: [{
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
						validator: validateEmailCheck,
						trigger: 'blur'
					}]
				},
			}
		},
		mounted() {
			var params = new URLSearchParams();
			if(this.$store.state.loginInfo.isLogin){
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}
			axios
				.get(this.$store.state.API_ROOT + 'user/' + this.$store.state.loginInfo.user_id + '/info'+"?"+params.toString())
				.then(response => {
					this.formValidate.user_id = response.data.data.user_id
					this.formValidate.nickname = response.data.data.nickname
					this.formValidate.email = response.data.data.email
					this.formValidate.email_flag = response.data.data.email_flag
					this.formValidate.organization = response.data.data.organization

				}).catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Spin.show();
						var params = new URLSearchParams();
						params.append('user_id', this.$store.state.loginInfo.user_id);
						params.append('token', this.$store.state.loginInfo.token);
						params.append('old_password',this.formValidate.old_password);
						if(this.formValidate.new_password!==''){
							params.append('new_password',this.formValidate.new_password);
							params.append('repeat_password',this.formValidate.repeat_password);
						}
						params.append('nickname',this.formValidate.nickname);
						params.append('email',this.formValidate.email);
						params.append('organization',this.formValidate.organization);
						axios
							.post(this.$store.state.API_ROOT + 'user/' + this.formValidate.user_id + '/edit', params)
							.then(response => {
								this.$Spin.hide();
								if (response.data.data.is_ok) {
									this.$Message.success('修改成功！');
								} else
									this.$Message.error('修改失败！');
							}).catch(function(error) {
								this.$Spin.hide();
								this.$Message.error('修改失败！');
							});
					} else {
						this.$Message.error('请检查输入!');
					}
				})
			}
		},
	}
</script>

<style>
</style>
