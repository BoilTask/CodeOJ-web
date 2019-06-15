<template>
	<Content>
		<Row>
			<Col span="16">
			<Content style="padding: 5px;">

				<Card>
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
						<FormItem label="讨论ID" prop="discuss_id">
							<Input v-model="formValidate.discuss_id" placeholder="discuss_id" disabled></Input>
							<p>
								<Icon type="ios-information-circle-outline" />请勿随便更改
							</p>
						</FormItem>
					</Form>
				</Card>
			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>
				<div style="background-color: #f8f8f9; padding: 5px;">

					<Card class="ReplyCard">
						<p slot="title">新建回复</p>
						<p slot="extra">
							<Button type="primary" :loading="btnLoading" @click="handleSubmit('formValidate')">提交</Button>
							<Button type="error" :to="'/discuss/'+this.$route.params.id">查看</Button>
						</p>
						<Table :show-header="false" :columns="tableCol" :data="replyData"></Table>
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
		name: 'ReplyEdit',
		data() {
			return {
				btnLoading: false,
				formValidate: {
					discuss_id: '',
				},
				ruleValidate: {
					discuss_id: [{
						required: true,
						message: '回复ID不能为空！',
						trigger: 'blur'
					}]
				},
				content: '',
				tableCol: [{
						key: 'name'
					},
					{
						key: 'info'
					}
				],
				replyData: []
			}
		},
		mounted() {
			this.formValidate.discuss_id = this.$route.params.id
			var params = new URLSearchParams();
			if (this.$store.state.loginInfo.isLogin) {
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}
			axios
				.get(this.$store.state.API_ROOT + 'discuss/' + this.$route.params.id+'/reply/'+this.$route.params.reply_id + "?" + params.toString())
				.then(response => {
			
					this.content = response.data.data.reply.content
					// console.log(response.data.data.reply)
					let temp = Array()
					temp.push({
						name:"创建时间",
						info:response.data.data.reply.insert_time
					})
					temp.push({
						name:"更新时间",
						info:response.data.data.reply.update_time
					})
					this.replyData = temp
					this.btnLoading = false
				}).catch(function(error) {
					console.log(error);
				});
			
		},
		methods: {
			saveContent: function() {
				if (this.formValidate.discuss_id == '') {
					this.$Message.error('讨论ID不能为空！');
				} else {
					if (this.content.length < 1) {
						this.$Message.error('内容不能为空!');
					} else {
						this.$Spin.show();
						var params = new URLSearchParams();
						params.append('user_id', this.$store.state.loginInfo.user_id);
						params.append('token', this.$store.state.loginInfo.token);
						params.append('content', this.content);
						this.btnLoading = true
						axios
							.post(this.$store.state.API_ROOT + 'discuss/'+this.formValidate.discuss_id+'/reply/'+this.$route.params.reply_id+'/edit=', params)
							.then(response => {
								if (response.data.data.is_ok) {
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
					}
				}
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.saveContent();
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
