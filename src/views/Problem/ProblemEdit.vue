<template>
	<Content>
		<Row>
			<Col span="16">
			<Content style="padding: 5px;">

				<Card>
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
						<FormItem label="标题" prop="title">
							<Input v-model="formValidate.title" placeholder="title"></Input>
						</FormItem>
						<FormItem label="时间限制" prop="time_limit">
							<Input v-model="formValidate.time_limit" placeholder="time_limit">
								<span slot="append">S</span>
							</Input>
						</FormItem>
						<FormItem label="内存限制" prop="memory_limit">
							<Input v-model="formValidate.memory_limit" placeholder="memory_limit">
								<span slot="append">MB</span>
							</Input>
						</FormItem>
						<FormItem label="标签" prop="tags">
							<Input v-model="formValidate.tags" placeholder="tags"></Input>
							<p>
								<Icon type="ios-information-circle-outline" />多个标签请以英文逗号“,”隔开
							</p>
						</FormItem>
						<FormItem label="权限" prop="privilege">
							<i-switch v-model="formValidate.privilege" size="large">
								<span slot="open">私有</span>
								<span slot="close">公开</span>
							</i-switch>
						</FormItem>

					</Form>

				</Card>
			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>
				<div style="background-color: #f8f8f9; padding: 5px;">

					<Card class="ProblemCard">
						<p slot="title">文章信息</p>
						<p slot="extra">
							<Button type="primary" :loading="btnLoading" @click="handleSubmit('formValidate')">提交</Button>
							<Button type="error" :to="'/problem/'+this.$route.params.id">查看</Button>
						</p>

						<Table :columns="tableCol" :data="problemData" :show-header="false"></Table>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
		<Card>
			<mavon-editor ref="editorDescription" @imgAdd="$imgAddDescription" v-model="description" style="min-height: 600px;"
			 v-on:save="saveDescription" />
			<mavon-editor ref="editorHint" @imgAdd="$imgAddHint" v-model="hint" style="min-height: 600px;" v-on:save="saveHint" />
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'ProblemEdit',
		data() {
			return {
				btnLoading: true,
				formValidate: {
					title: '',
					time_limit: '',
					memory_limit: '',
					tags: '',
					privilege: false
				},
				ruleValidate: {
					title: [{
						required: true,
						message: '标题不能为空！',
						trigger: 'blur'
					}],
					time_limit: [{
						required: true,
						message: '时间限制不能为空！',
						trigger: 'blur'
					}],
					memory_limit: [{
						required: true,
						message: '内存限制不能为空！',
						trigger: 'blur'
					}],
				},
				description: '',
				hint: '',
				tableCol: [{
						key: 'name'
					},
					{
						key: 'info'
					}
				],
				problemData: [],
				uploadToken: ''
			}
		},
		mounted() {
			var params = new URLSearchParams();
			if (this.$store.state.loginInfo.isLogin) {
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}

			axios
				.get(this.$store.state.API_ROOT + 'problem/' + this.$route.params.id + "?" + params.toString())
				.then(response => {

					this.formValidate.title = response.data.data.problemInfo.title
					this.formValidate.time_limit = response.data.data.problemInfo.problemData[1].info
					this.formValidate.memory_limit = response.data.data.problemInfo.problemData[2].info
					this.formValidate.privilege = (response.data.data.problemInfo.problemData[5].info == 1 )
					this.description = response.data.data.problemInfo.description
					this.hint = response.data.data.problemInfo.hint
					
					this.formValidate.tags=""
					let tags = response.data.data.problemInfo.problemData[0]['info']
					for (let i = 0, len = tags.length; i < len; i++) {
						if (i > 0)
							this.formValidate.tags += ","
						this.formValidate.tags += tags[i]['name']
					}
					
					let temp = Array()
					temp[0] = response.data.data.problemInfo.problemData[6]
					temp[1] = response.data.data.problemInfo.problemData[7]
					this.problemData = temp
					
					this.btnLoading = false

				}).catch(function(error) {
					console.log(error);
				});

		},
		methods: {
			saveDescription: function() {
				this.$Spin.show();
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('description', this.description);
				this.btnLoading = true
				axios
					.post(this.$store.state.API_ROOT + 'problem/' + this.$route.params.id + '/edit', params)
					.then(response => {
						if (response.data.data.is_ok) {
							this.problemData[1]['info'] = this.$store.state.server_time
							this.$Message.success('保存成功！');
						} else
							this.$Message.error('保存失败！');
						this.btnLoading = false
						this.$Spin.hide();
					}).catch(function(error) {
						this.$Message.error('保存失败！');
						this.btnLoading = false
						this.$Spin.hide();
					});
			},
			saveHint: function() {
				this.$Spin.show();
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('hint', this.hint);
				this.btnLoading = true
				axios
					.post(this.$store.state.API_ROOT + 'problem/' + this.$route.params.id + '/edit', params)
					.then(response => {
						if (response.data.data.is_ok) {
							this.problemData[1]['info'] = this.$store.state.server_time
							this.$Message.success('保存成功！');
						} else
							this.$Message.error('保存失败！');
						this.btnLoading = false
						this.$Spin.hide();
					}).catch(function(error) {
						this.$Message.error('保存失败！');
						this.btnLoading = false
						this.$Spin.hide();
					});
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Spin.show();
						this.btnLoading = true
						var params = new URLSearchParams();
						params.append('user_id', this.$store.state.loginInfo.user_id);
						params.append('token', this.$store.state.loginInfo.token);
						params.append('title', this.formValidate.title);
						params.append('time_limit', this.formValidate.time_limit);
						params.append('memory_limit', this.formValidate.memory_limit);
						params.append('privilege', this.formValidate.privilege ? 1 : 0);
						params.append('tags', this.formValidate.tags);
						params.append('description', this.description);
						params.append('hint', this.hint)
						axios
							.post(this.$store.state.API_ROOT + 'problem/' + this.$route.params.id + '/edit', params)
							.then(response => {
								this.$Spin.hide();
								if (response.data.data.is_ok) {
									this.problemData[1]['info'] = this.$store.state.server_time
									this.btnLoading = false
									this.$Message.success('保存成功！');
								} else {
									this.btnLoading = false
									this.$Message.error('保存失败！');
								}
							}).catch(function(error) {
								this.$Spin.hide();
								this.btnLoading = false
								this.$Message.error('保存失败！');
							});
					} else {
						this.$Message.error('请检查输入!');
					}
				})
			},
			$imgAddDescription(pos, $file) {
				this.$Spin.show();
				axios.get(this.$store.state.API_ROOT + 'upload/token')
					.then(response => {
						this.uploadToken = response.data.data.token

						var params = new URLSearchParams();
						params.append('token', this.uploadToken);
						params.append('file', $file);

						var formdata = new FormData();
						formdata.append('token', this.uploadToken)
						formdata.append('file', $file)

						axios
							.post('https://upload.qiniup.com', formdata)
							.then(response => {
								this.$refs.editorDescription.$img2Url(pos, this.$store.state.CDN_ROOT + response.data.key)
								this.$Spin.hide()
								this.$Message.success('图片上传成功！')
							}).catch(function(error) {
								console.log(error);
							});

					}).catch(function(error) {
						console.log(error);
					});
			},
			$imgAddHint(pos, $file) {
				this.$Spin.show();
				axios.get(this.$store.state.API_ROOT + 'upload/token')
					.then(response => {
						this.uploadToken = response.data.data.token

						var params = new URLSearchParams();
						params.append('token', this.uploadToken);
						params.append('file', $file);

						var formdata = new FormData();
						formdata.append('token', this.uploadToken)
						formdata.append('file', $file)

						axios
							.post('https://upload.qiniup.com', formdata)
							.then(response => {
								this.$refs.editorHint.$img2Url(Description, this.$store.state.CDN_ROOT + response.data.key)
								this.$Spin.hide()
								this.$Message.success('图片上传成功！')
							}).catch(function(error) {
								console.log(error);
							});

					}).catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style>

</style>
