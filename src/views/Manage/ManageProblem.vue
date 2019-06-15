<template>
	<Content style="text-align: center;padding: 20px;">
		
			<Form ref="filterData" :model="filterData" inline>
				<FormItem prop="title">
					<Input type="text" v-model="filterData.title" placeholder="Title">
					<span slot="prepend">标题：</span>
					</Input>
				</FormItem>
				<FormItem prop="tags">
					<Input type="text" v-model="filterData.tags" placeholder="Tags">
					<span slot="prepend">标签：</span>
					</Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="getProblemList">筛选</Button>
					<Button type="error" to="/problem/add">新建</Button>
				</FormItem>
			</Form>
			<Page :total="problemCnt" :page-size="problemPageSize" :current="problemPage" @on-change="changePage" show-elevator
			 show-total class="pageBar" />
			<Table stripe :columns="problemColumns" :data="problemData" :loading="problemLoading"></Table>
			<Page :total="problemCnt" :page-size="problemPageSize" :current="problemPage" @on-change="changePage" show-elevator
			 show-total class="pageBar" />
		
	</Content>
</template>

<script>
	export default {
		name: 'ManageProblem',
		data() {
			return {
				problemLoading: true,
				problemCnt: 0,
				problemPageSize: 50,
				filterData: {
					title: '',
					tags: '',
				},
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
					},
					{
						title: '操作',
						key: 'op',
						render: (h, params) => {
							let Vnode = Array()
							Vnode.push(h('Button', {
									props: {
										type: 'primary',
										to: '/problem/' + params.row.problem_id + '/edit'
									},
									style: "margin:0 1px"
								},
								'编辑'
							))
							return h('div', Vnode);
						}
					},
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
			this.filterData.title=this.$route.query['title']?this.$route.query['title']:''
			this.filterData.tags=this.$route.query['tags']?this.$route.query['tags']:''
			this.getProblemList()
			axios
				.get(this.$store.state.API_ROOT + 'problem/tag')
				.then(response => {
					this.tagData = response.data.data.tags;
				}).catch(function(error) {
					console.log(error);
				});
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
						title:this.filterData.title,
						tags:this.filterData.tags,
						page: val,
					}
				})
			},
			getProblemList() {
				this.problemLoading = true;
				var params = new URLSearchParams();
				if(this.$store.state.loginInfo.user_id&&this.$store.state.loginInfo.user_id!='')
					params.append('user_id', this.$store.state.loginInfo.user_id);
				if(this.$store.state.loginInfo.token&&this.$store.state.loginInfo.token!='')
					params.append('token', this.$store.state.loginInfo.token);
				if(this.filterData.title&&this.filterData.title!='')
					params.append('title', this.filterData.title);
				if(this.filterData.tags&&this.filterData.tags!='')
					params.append('tags', this.filterData.tags);
				axios
					.get(this.$store.state.API_ROOT + 'problem/list/' + this.problemPage + "?" + params.toString())
					.then(response => {

						this.problemData = response.data.data.problemList
						this.problemCnt = response.data.data.total
						this.problemPageSize = response.data.data.pageSize
						this.problemLoading = false;
					}).catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.pageBar {
		margin: 10px 0;
	}
</style>
