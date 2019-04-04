<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content>
				<Page :total="problemCnt" :page-size="problemPageSize" :current="problemPage" @on-change="changePage" show-elevator
				 show-total class="pageBar" />
				<Table stripe :columns="problemColumns" :data="problemData" :loading="problemLoading"></Table>
				<Page :total="problemCnt" :page-size="problemPageSize" :current="problemPage" @on-change="changePage" show-elevator
				 show-total class="pageBar" />
			</Content>
			</Col>
			<Col span="8">
			<Sider hide-trigger>

			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	export default {
		name: 'Problemlist',
		data() {
			return {
				problemLoading: true,
				problemCnt: 0,
				problemPageSize: 50,
				problemColumns: [{
						title: '#',
						key: 'id',
						width: 80,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									size: 'small',
									to: '/problem/' + params.row.id
								}
							}, params.row.id);
						}
					}, {
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/problem/' + params.row.id
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
											to: '/problem/tag/' + item
										},
										style: "margin:0 1px"
									},
									item
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
		computed: {
			problemPage: function() {
				if (this.$route.query['page'])
					return parseInt(this.$route.query['page'])
				else
					return 1;
			}
		},
		mounted() {
			this.getProblemList()
		},
		watch: {
			'$route'(to, from) {
				this.getProblemList()
			}
		},
		methods: {
			changePage(val) {
				this.$router.push({
					path: 'problem',
					query: {
						page: val
					}
				})
			},
			getProblemList() {
				this.problemLoading = true;
				axios
					.get('http://api.codeoj.cn/problemlist?pagesize=' + this.problemPageSize + "&page=" + this.problemPage)
					.then(response => {
						this.problemData = response.data.problemList
						this.problemCnt = response.data.problemCnt
						this.problemPageSize = response.data.pageSize
						this.problemLoading = false;
					}).catch(function(error) {
						console.log(error);
					});

			}
		}
	}
</script>
</script>

<style>
	.pageBar {
		margin: 10px 0;
	}
</style>
