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
						<FormItem label="主题" prop="keyword">
							<Input v-model="formValidate.keyword" placeholder="keyword"></Input>
							<p>
								<Icon type="ios-information-circle-outline" />可使用指定格式关键词关联页面
							</p>
						</FormItem>
					</Form>
				</Card>
			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>
				<div style="background-color: #f8f8f9; padding: 5px;">

					<Card class="DiscussCard">
						<p slot="title">新建讨论</p>
						<p slot="extra">
							<Button type="primary" :loading="btnLoading" @click="handleSubmit('formValidate')">提交</Button>
						</p>
						<Table :show-header="false"></Table>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
		<Card>
			<mavon-editor ref="editor" @imgAdd="$imgAdd" v-model="content" style="min-height: 600px;" v-on:save="saveContent" />
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'DiscussEdit',
		data() {
			return {
				btnLoading: false,
				formValidate: {
					title: '',
					keyword: ''
				},
				ruleValidate: {
					title: [{
						required: true,
						message: '标题不能为空！',
						trigger: 'blur'
					}],
					keyword: [{
						required: true,
						message: '主题不能为空！',
						trigger: 'blur'
					}],
				},
				content: '',
			}
		},
		mounted() {
			this.formValidate.keyword = this.$route.query['keyword']
		},
		methods: {
			saveContent: function() {
				if (this.formValidate.title == '') {
					this.$Message.error('请先输入标题！');
				} else if (this.formValidate.keyword == '') {
					this.$Message.error('请先输入主题！');
				} else {
					if (this.content.length < 1) {
						this.$Message.error('内容不能为空!');
					} else {
						this.$Spin.show();
						var params = new URLSearchParams();
						params.append('user_id', this.$store.state.loginInfo.user_id);
						params.append('token', this.$store.state.loginInfo.token);
						params.append('title', this.formValidate.title);
						params.append('keyword', this.formValidate.keyword);
						params.append('content', this.content);
						this.btnLoading = true
						axios
							.post(this.$store.state.API_ROOT + 'discuss/add', params)
							.then(response => {
								if (response.data.data.is_ok) {
									this.$Message.success('保存成功！');
									this.$router.push('/discuss/' + response.data.data.discuss_id + '/edit')
								} else
									this.$Message.error('保存失败！');
								this.btnLoading = false
								this.$Spin.hide();
							}).catch(function(error) {
								this.$Message.error('保存失败！');
								this.btnLoading = false
								this.$Spin.hide();
							});
					}
				}
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if (this.content.length < 1) {
							this.$Message.error('内容不能为空!');
						} else {
							this.$Spin.show();
							this.btnLoading = true
							var params = new URLSearchParams();
							params.append('user_id', this.$store.state.loginInfo.user_id);
							params.append('token', this.$store.state.loginInfo.token);
							params.append('title', this.formValidate.title);
							params.append('keyword', this.formValidate.keyword);
							params.append('content', this.content);
							axios
								.post(this.$store.state.API_ROOT + 'discuss/add', params)
								.then(response => {
									this.$Spin.hide();
									if (response.data.data.is_ok) {
										this.$Message.success('保存成功！');
										this.$router.push('/discuss/' + response.data.data.discuss_id + '/edit')
									} else {
										this.$Message.error('保存失败！');
									}
									this.btnLoading = false
								}).catch(function(error) {
									this.$Spin.hide();
									this.btnLoading = false
									this.$Message.error('保存失败！');
								});
						}
					} else {
						this.$Message.error('请检查输入!');
					}
				})
			},
			$imgAdd(pos, $file) {
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
								this.$refs.editor.$img2Url(pos, this.$store.state.CDN_ROOT + response.data.key)
								this.$Spin.hide()
								this.$Message.success('图片上传成功！')
							}).catch(function(error) {
								console.log(error);
							});

					}).catch(function(error) {
						console.log(error);
					});
			}
		},
	}
</script>

<style>

</style>
