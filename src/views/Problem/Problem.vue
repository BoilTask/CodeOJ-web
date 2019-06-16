<template>
	<Row>
		<Col span="16">
		<Content>
			<MarkdownShow v-model="description" />
			<MarkdownShow v-if="hint.length>0" v-model="hint" />
		</Content>
		</Col>
		<Col span="8">
		<Sider width="100%" hide-trigger>
			<div style="background-color: #f8f8f9; padding: 10px;">
				<Card class="ProblemCard">
					<p slot="title">{{problemId}}{{problemTitle}}</p>
					<p slot="extra">
						<Button v-if="isEdit" :to="'/problem/'+this.$route.params.id+'/edit'" type="error">编辑</Button>
					</p>
					<Table :columns="problemCol" :data="problemData" :show-header="false"></Table>
					<p style="text-align: right;margin-top: 10px;">
						<ButtonGroup>
							<Button :to="'/discuss?keyword=p-'+this.$route.params.id" type="success">题目讨论</Button>
							<Button :to="'/status?problem_id='+this.$route.params.id" type="info">题目统计</Button>
							<Button :to="'/problem/'+this.$route.params.id+'/recommend'" type="warning">题目推荐</Button>
						</ButtonGroup>
					</p>
				</Card>
				<Card class="ProblemCard" dis-hover>
					<Row style="margin: 10px;text-align: center;">
						<Col span="16">
						<Select v-model="language">
							<span slot="prefix">语言：</span>
							<Option v-for="item in languageList" :value="item.key" :key="item.key">{{ item.name }}</Option>
						</Select>
						</Col>
						<Col span="8">
						<Button type="error" :loading="btnLoading" @click="submitCode">提交</Button>
						</Col>
					</Row>
					<mavon-editor class="codeEdit" :boxShadow="false" :subfield="false" :shortCut="false" :toolbars="problemToolbars"
					 defaultOpen="edit" :ishljs="true" v-on:save="submitCode" v-model="code" placeholder="将代码复制到此处……" />
				</Card>
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>
	// import Clipboard from 'clipboard';
	export default {
		name: 'Problem',
		data() {
			return {
				problemId: '',
				problemTitle: '',
				description: '',
				hint: '',
				time_limit: '',
				memory_limit: '',
				accept: 0,
				attempt: 0,
				isEdit: false,
				problemCol: [{
						key: 'name'
					},
					{
						key: 'info',
						render: (h, params) => {
							if (Array.isArray(params.row.info)) {
								if (params.row.info.length) {
									let Vnode = Array()
									params.row.info.forEach(((item, index) => {
										Vnode.push(h('Button', {
												props: {
													type: index & 1 ? 'info' : 'success',
													size: 'small',
													to: '/problem?tags=' + item.name
												},
												style: "margin:1px"
											},
											item.name
										))
									}))
									return h('div', Vnode);
								}
								return h('span', '无');
							} else {
								return h('span', params.row.info);
							}
						}
					}
				],
				problemData: [],
				language: 0,
				languageList: [{
						key: 0,
						name: 'C'
					},
					{
						key: 1,
						name: 'C++'
					},
					{
						key: 3,
						name: 'Java'
					},
					{
						key: 6,
						name: 'Python'
					}
				],
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
				},
				btnLoading: false,
				code: ''
			}
		},
		mounted() {
			let judgeStr = ['标准判题', '特殊评判', '文本比较']
			var params = new URLSearchParams();
			if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo
				.user_id.length <= 20)
				params.append('user_id', this.$store.state.loginInfo.user_id);
			if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
				params.append('token', this.$store.state.loginInfo.token);
			axios
				.get(this.$store.state.API_ROOT + 'problem/' + this.$route.params.id + "?" + params.toString())
				.then(response => {
					this.problemId = response.data.data.problemInfo.problem_id
					this.problemTitle = " - " + response.data.data.problemInfo.title
					document.title = this.problemId + this.problemTitle + " - CodeOJ"
					this.description = response.data.data.problemInfo.description
					this.hint = response.data.data.problemInfo.hint
					response.data.data.problemInfo.problemData[1].info = response.data.data.problemInfo.problemData[1].info + ' S'
					response.data.data.problemInfo.problemData[2].info = response.data.data.problemInfo.problemData[2].info + ' MB'

					response.data.data.problemInfo.problemData[3].info = judgeStr[response.data.data.problemInfo.problemData[3].info]

					response.data.data.problemInfo.problemData[6].info = (response.data.data.problemInfo.problemData[6].info == 0 ?
						'公开' : '私有')

					this.problemData = response.data.data.problemInfo.problemData

					this.isEdit = this.$store.state.loginInfo.isLogin&&(this.problemData[9].info === this.$store.state.loginInfo.user_id)

				}).catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			submitCode() {

				if (this.code == '') {
					this.$Message.error('请填写代码！');
				} else {


					this.$Spin.show();
					var params = new URLSearchParams();
					params.append('user_id', this.$store.state.loginInfo.user_id);
					params.append('token', this.$store.state.loginInfo.token);
					params.append('problem_id', this.problemId);
					params.append('language', this.language);
					params.append('code', this.code);

					this.btnLoading = true
					axios
						.post(this.$store.state.API_ROOT + 'problem/submit', params)
						.then(response => {
							if (response.data.data.is_ok) {
								this.$Message.success('提交成功！');
								this.$router.push('/status/' + response.data.data.status_id)
							} else
								this.$Message.error('提交失败！');
							this.btnLoading = false
							this.$Spin.hide();
						}).catch(function(error) {
							console.log(error)
						});
				}
			}
		},
	}
</script>

<style scoped>
	.ProblemCard {
		width: 90%;
		margin: 20px auto;
	}

	.codeEdit {
		z-index: 500;
	}
</style>
