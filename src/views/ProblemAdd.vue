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
						</p>

						<Table :columns="tableCol" :data="problemData" :show-header="false"></Table>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
		<Card>
			<mavon-editor ref="editorDescription" @imgAdd="$imgAddDescription" v-model="description" style="min-height: 600px;"
			 v-on:save="saveData" />
			<mavon-editor ref="editorHint" @imgAdd="$imgAddHint" v-model="hint" style="min-height: 600px;" v-on:save="saveData" />
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'ProblemEdit',
		data() {
			return {
				btnLoading: false,
				formValidate: {
					title: '',
					time_limit: '1000',
					memory_limit: '128',
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
				description: '## 题目描述\n\n\n\n## 输入\n\n\n\n## 输出\n\n\n\n## 样例输入\n\n```\n\n```\n\n## 样例输出\n\n```\n\n```',
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
		methods: {
			saveData: function() {
				if (this.formValidate.title == '') {
					this.$Message.error('请先输入标题！');
				} else if (this.formValidate.time_limit == '') {
					this.$Message.error('请先输入时间限制！');
				} else if (this.formValidate.time_limit == '') {
					this.$Message.error('请先输入内存限制！');
				} else {
					this.$Spin.show();
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
					this.btnLoading = true
					axios
						.post(this.$store.state.API_ROOT + 'problem/add', params)
						.then(response => {
							if (response.data.data.is_ok) {
								this.$Message.success('保存成功！');
								this.$router.push('/problem/'+response.data.data.problem_id+'/edit')
							} else
								this.$Message.error('保存失败！');
							this.btnLoading = false
							this.$Spin.hide();
						}).catch(function(error) {
							console.log(error);
						});
				}
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
							.post(this.$store.state.API_ROOT + 'problem/add', params)
							.then(response => {
								this.$Spin.hide();
								if (response.data.data.is_ok) {
									this.btnLoading = false
									this.$Message.success('保存成功！');
									this.$router.push('/problem/'+response.data.data.problem_id+'/edit')
								} else {
									this.btnLoading = false
									this.$Message.error('保存失败！');
								}
							}).catch(function(error) {
								console.log(error);
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
