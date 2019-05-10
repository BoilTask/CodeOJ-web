<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content style="text-align: center;">
				<Page :total="problemCnt" :page-size="problemPageSize" :current="problemPage" @on-change="changePage" show-elevator
				 show-total class="pageBar" />
				<Table stripe :columns="problemColumns" :data="problemData" :loading="problemLoading"></Table>
				<Page :total="problemCnt" :page-size="problemPageSize" :current="problemPage" @on-change="changePage" show-elevator
				 show-total class="pageBar" />
			</Content>
			</Col>
			<Col span="8">
			<Sider hide-trigger width="100%">
				<div style="background-color: #f8f8f9;padding:20px;">
					<Card class="siderCard">
						<Form ref="filterData" :model="filterData">
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
								<Button type="primary" @click="getProblemList(true)">筛选</Button>
							</FormItem>
						</Form>
					</Card>

					<Card class="siderCard" style="background-color: #212121">
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
		name: 'Problemlist',
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
					}
				],
				problemData: []
			}
		},
		computed: {
			problemPage: {
				get: function() {
					if (this.$route.query['page'])
						return parseInt(this.$route.query['page'])
					else
						return 1;
				},
				set: function(val) {
					this.$router.push({
						path: 'problem',
						query: {
							title: this.filterData.title,
							tags: this.filterData.tags,
							page: val,
						}
					})
				}
			}
		},
		mounted() {
			this.filterData.title = this.$route.query['title'] ? this.$route.query['title'] : ''
			this.filterData.tags = this.$route.query['tags'] ? this.$route.query['tags'] : ''
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
				this.filterData.title = this.$route.query['title'] ? this.$route.query['title'] : ''
				this.filterData.tags = this.$route.query['tags'] ? this.$route.query['tags'] : ''
				this.getProblemList()
			}
		},
		methods: {
			changePage(val) {
				this.problemPage = val
			},
			getProblemList(reset = false) {
				if (reset)
					this.problemPage = 1
				this.problemLoading = true;
				var params = new URLSearchParams();
				if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id != '')
					params.append('user_id', this.$store.state.loginInfo.user_id);
				if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
					params.append('token', this.$store.state.loginInfo.token);
				if (this.filterData.title && this.filterData.title != '')
					params.append('title', this.filterData.title);
				if (this.filterData.tags && this.filterData.tags != '')
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

	.siderCard {
		width: 90%;
		margin: 20px auto;
	}
</style>
