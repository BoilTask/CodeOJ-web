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

					<Card class="BlogCard">
						<p slot="title">文章信息</p>
						<p slot="extra"><Button type="primary" @click="handleSubmit('formValidate')">提交</Button></p>
						<Table :columns="tableCol" :data="blogData" :show-header="false"></Table>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
		<Card>
			<mavon-editor v-model="content" style="min-height: 600px;" v-on:save="saveContent" />
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'BlogEdit',
		data() {
			return {
				formValidate: {
					title: '',
					tags: '',
					privilege: false
				},
				ruleValidate: {
					title: [{
						required: true,
						message: '标题不能为空！',
						trigger: 'blur'
					}],
				},
				content: '',
				tableCol: [{
						key: 'name'
					},
					{
						key: 'info'
					}
				],
				blogData: []
			}
		},
		mounted() {
			var params = new URLSearchParams();
			if(this.$store.state.loginInfo.isLogin){
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}
			axios
				.get(this.$store.state.API_ROOT + 'blog/' + this.$route.params.id+"?"+params.toString())
				.then(response => {
					this.formValidate.title = response.data.data.blog.title
					this.formValidate.privilege = (response.data.data.blog.privilege==1?true:false)
					
					this.content = response.data.data.blog.content
					let temp = Array()
					temp[0] = response.data.data.blogData[0]
					temp[1] = response.data.data.blogData[1]
					this.blogData = temp
					let tags = response.data.data.blogData[2]['info']
					for (let i = 0, len = tags.length; i < len; i++) {
						if (i > 0)
							this.formValidate.tags += ","
						this.formValidate.tags += tags[i]['name']
					}
				}).catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			saveContent: function() {
				this.$Spin.show();
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('content', this.content);
				axios
					.post(this.$store.state.API_ROOT + 'blog/' + this.$route.params.id + '/edit', params)
					.then(response => {
						if (response.data.data.is_ok) {
							this.blogData[1]['info'] = this.$store.state.server_time
							this.$Message.success('保存成功！');
						} else
							this.$Message.error('保存失败！');
						this.$Spin.hide();
					}).catch(function(error) {
						this.$Message.error('保存失败！');
						this.$Spin.hide();
					});
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Spin.show();
						var params = new URLSearchParams();
						params.append('user_id', this.$store.state.loginInfo.user_id);
						params.append('token', this.$store.state.loginInfo.token);
						params.append('title', this.formValidate.title);
						params.append('privilege', this.formValidate.privilege?1:0);
						params.append('tags', this.formValidate.tags);
						params.append('content', this.content);
						axios
							.post(this.$store.state.API_ROOT + 'blog/' + this.$route.params.id + '/edit',params)
							.then(response => {
								this.$Spin.hide();
								if (response.data.data.is_ok) {
									this.blogData[1]['info'] = this.$store.state.server_time
									this.$Message.success('保存成功！');
								} else
									this.$Message.error('保存失败！');
							}).catch(function(error) {
								this.$Spin.hide();
								this.$Message.error('保存失败！');
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
