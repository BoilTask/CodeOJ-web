<template>
	<Content>
		<Row>
			<Col span="16">
			<Content style="padding: 5px;">

				<Card>
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
						<FormItem label="语言" prop="language">
							<Input v-model="formValidate.language" placeholder="language"></Input>
							<p>
								<Icon type="ios-information-circle-outline" />也可以写入<span @click="changeText">text</span>表示纯文本
							</p>
						</FormItem>
					</Form>

				</Card>
			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>
				<div style="background-color: #f8f8f9; padding: 5px;">

					<Card class="CodeCard">
						<p slot="title">码池系统</p>
						<p slot="extra">
							<Button type="primary" :loading="btnLoading" @click="handleSubmit('formValidate')">提交</Button>
						</p>
						<p style="text-indent: 2em;">
							将代码复制进输入框中，输入相应的代码语言，可以获得一个单独的页面以供分享查看，您可以直接将得到的链接复制粘贴给其他人。
						</p>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
		<Card>
			<mavon-editor class="codeEdit" :boxShadow="false" :subfield="false" :shortCut="false" :toolbars="problemToolbars"
			 defaultOpen="edit" :ishljs="true" v-on:save="handleSubmit('formValidate')" v-model="content" placeholder="将代码复制到此处……" />
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'CodeEdit',
		data() {
			return {
				btnLoading: false,
				formValidate: {
					language: ''
				},
				ruleValidate: {
					language: [{
						required: true,
						message: '语言不能为空！',
						trigger: 'blur'
					}],
				},
				content: '',
				problemToolbars: {
					bold: false, // 粗体
					italic: false, // 斜体
					header: false, // 标题
					underline: false, // 下划线
					strikethrough: false, // 中划线
					mark: false, // 标记
					superscript: false, // 上角标
					subscript: false, // 下角标
					quote: false, // 引用
					ol: false, // 有序列表
					ul: false, // 无序列表
					link: false, // 链接
					imagelink: false, // 图片链接
					code: false, // code
					table: false, // 表格
					fullscreen: true, // 全屏编辑
					readmodel: true, // 沉浸式阅读
					htmlcode: false, // 展示html源码
					help: false, // 帮助
					/* 1.3.5 */
					undo: true, // 上一步
					redo: true, // 下一步
					trash: true, // 清空
					save: true, // 保存（触发events中的save事件）
					/* 1.4.2 */
					navigation: false, // 导航目录
					/* 2.1.8 */
					alignleft: false, // 左对齐
					aligncenter: false, // 居中
					alignright: false, // 右对齐
					/* 2.2.1 */
					subfield: false, // 单双栏模式
					preview: false, // 预览
				}
			}
		},
		methods: {
			changeText: function() {
				this.formValidate.language = "text"
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
							params.append('language', this.formValidate.language);
							params.append('code', this.content);
							axios
								.post(this.$store.state.API_ROOT + 'code/add', params)
								.then(response => {
									this.$Spin.hide();
									if (response.data.data.is_ok) {
										this.btnLoading = false
										this.$Message.success('保存成功！');
										this.$router.push('/code/'+response.data.data.code_id)
									} else {
										this.btnLoading = false
										this.$Message.error('保存失败！');
									}
								}).catch(function(error) {
									this.btnLoading = false
									this.$Message.error('保存失败！');
								});
						}
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
