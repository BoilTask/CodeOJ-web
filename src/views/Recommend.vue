<template>
	<Layout>
		<Row>
			<Col span="16">
			<Card>
				根据本题目数据，推荐您完成以下题目：
			</Card>
			<Content style="text-align: center;">
				<Table stripe :columns="problemColumns" :data="problemData" :loading="problemLoading"></Table>
			</Content>
			</Col>
			<Col span="8">
			<Sider hide-trigger width="100%">
				<div style="background-color: #f8f8f9;padding:20px;">
					<Card class="siderCard">
						<p slot="title">温馨提示：加载时间可能较久，请等待……</p>
						<p>
							题目推荐算法：
						</p>
						<p style="text-indent: 2em;">
							本页面为根据用户来推荐类似题目，依据为与本用户相似度最高的用户做的题大概率被自己感兴趣，根据题目加权平均，得出推荐题目。
						</p>
					</Card>

					<Card v-if="tagData.length>0" class="siderCard" style="background-color: #212121">
						<Button v-for="tag in tagData" style="margin:2px" ghost :to="'/problem?tags='+tag.name">{{tag.name}}</Button>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	export default {
		name: 'Recommend',
		data() {
			return {
				problemId: '',
				problemTitle: '',
				problemLoading: true,
				tagData: [],
				problemColumns: [{
						title: '#',
						key: 'problem_id',
						width: 80,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									size: 'small',
									to: '/problem/' + params.row.problem_id
								}
							}, params.row.problem_id);
						}
					}, {
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/problem/' + params.row.problem_id
								}
							}, params.row.title);
						}
					},
					{
						title: '标签',
						key: 'tag',
						render: (h, params) => {
							let Vnode = Array()
							params.row.tag.forEach(((item, index) => {
								Vnode.push(h('Button', {
										props: {
											type: index & 1 ? 'info' : 'success',
											size: 'small',
											to: '/problem?tags=' + item.name
										},
										style: "margin:0 1px"
									},
									item.name
								))
							}))
							return h('div', Vnode);
						}
					},
					{
						title: '正确',
						key: 'accept',
						sortable: true,
						width: 80
					},
					{
						title: '提交',
						key: 'attempt',
						sortable: true,
						width: 80
					}
				],
				problemData: []
			}
		},
		mounted() {
			this.getProblemList()
		},
		methods: {
			getProblemList(reset = false) {
				if (reset)
					this.problemPage = 1
				this.problemLoading = true;
				var params = new URLSearchParams();
				if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo
					.user_id.length <= 20)
					params.append('user_id', this.$store.state.loginInfo.user_id);
				if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
					params.append('token', this.$store.state.loginInfo.token);
				axios
					.get(this.$store.state.API_ROOT + 'recommend' + "?" + params.toString())
					.then(response => {

						this.problemId = response.data.data.problem_id
						this.problemTitle = " - " + response.data.data.title

						this.problemData = response.data.data.problemList
						this.tagData = response.data.data.tags;
						this.problemLoading = false;
						if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo
							.user_id.length <= 20) {
							var params = new URLSearchParams();
							let problemList = Array();
							for (let i = 0; i < this.problemData.length; i++) {
								problemList.push(this.problemData[i]['problem_id'])
							}
							params.append('user_id', this.$store.state.loginInfo.user_id);
							if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
								params.append('token', this.$store.state.loginInfo.token);
							params.append('problemList', JSON.stringify(problemList));
							axios
								.get(this.$store.state.API_ROOT + 'status/check' + "?" + params.toString())
								.then(response => {
									if (response.data.data.is_ok) {
										let resultList = response.data.data.resultList;
										let tempData = this.problemData;
										for (let i = 0; i < tempData.length; i++) {
											if (resultList[tempData[i]['problem_id']]) {
												this.$set(this.problemData[i], 'result', parseInt(resultList[tempData[i]['problem_id']]))
											}
										}
									}
								}).catch(function(error) {
									console.log(error);
								});
						}
					}).catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.siderCard {
		width: 90%;
		margin: 20px auto;
	}
</style>
