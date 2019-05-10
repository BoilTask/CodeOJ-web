<template>
	<Row>
		<Col span="16">
		<Content>
			<MarkdownShow v-model="description" />
			<MarkdownShow v-model="hint" />
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
				</Card>
				<Card class="ProblemCard" dis-hover>
					<Row style="margin: 10px;text-align: center;">
						<Col span="16">
						<Select v-model="language">
							<span slot="prefix">语言：</span>
							<Option v-for="(item,index) in languages" :value="item" :key="index">{{ item }}</Option>
						</Select>
						</Col>
						<Col span="8">
						<Button type="error">提交</Button>
						</Col>
					</Row>
					<mavon-editor class="codeEdit" :boxShadow="false" :subfield="false" :shortCut="false" 
					:toolbars="problemToolbars" defaultOpen="edit" :ishljs="true" placeholder="将代码复制到此处……" />
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
				isEdit:false,
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
													to: '/blog/tag/' + item.name
												},
												style: "margin:0 1px"
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
				language: '',
				languages: [
					'C',
					'C++'
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
				}
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT + 'problem/' + this.$route.params.id)
				.then(response => {
					this.problemId = response.data.data.problemInfo.problem_id
					this.problemTitle = " - " + response.data.data.problemInfo.title
					document.title = this.problemId + this.problemTitle + " - CodeOJ"
					this.description = response.data.data.problemInfo.description
					this.hint = response.data.data.problemInfo.hint
					response.data.data.problemInfo.problemData[1].info=response.data.data.problemInfo.problemData[1].info+' MS'
					response.data.data.problemInfo.problemData[2].info=response.data.data.problemInfo.problemData[2].info+' MB'
					response.data.data.problemInfo.problemData[5].info=(response.data.data.problemInfo.problemData[5].info==0?'公开':'私有')
					
					this.problemData = response.data.data.problemInfo.problemData

					this.isEdit = (this.problemData[8].info === this.$store.state.loginInfo.user_id)
					
				}).catch(function(error) {
					console.log(error);
				});
		}
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
