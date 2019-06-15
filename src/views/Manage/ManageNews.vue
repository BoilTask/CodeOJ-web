<template>
	<Content style="text-align: center;padding: 20px;">
		<Form ref="filterData" :model="filterData" inline>
			<FormItem prop="title">
				<Input type="text" v-model="filterData.title" placeholder="Title">
				<span slot="prepend">标题：</span>
				</Input>
			</FormItem>
			<FormItem>
				<Select v-model="filterData.privilege">
					<span slot="prefix">权限：</span>
					<Option :value="0" :key="0">全部</Option>
					<Option :value="1" :key="1">公开</Option>
					<Option :value="2" :key="2">私有</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="filterNews">筛选</Button>
				<Button type="error" to="/news/add">新建</Button>
			</FormItem>
		</Form>
		<Page :total="newsCnt" :page-size="newsPageSize" :current="newsPage" @on-change="changePage" show-elevator show-total
		 class="pageBar" />
		<Table stripe :columns="newsColumns" :data="newsData" :loading="newsLoading"></Table>
		<Page :total="newsCnt" :page-size="newsPageSize" :current="newsPage" @on-change="changePage" show-elevator show-total
		 class="pageBar" />
	</Content>
</template>

<script>
	export default {
		name: 'ManageNews',
		data() {
			return {
				newsLoading: true,
				newsCnt: 0,
				newsPageSize: 50,
				filterData: {
					title: '',
					privilege: 0
				},
				newsColumns: [{
						title: '#',
						key: 'news_id',
						width: 80,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									size: 'small',
									to: '/news/' + params.row.news_id + '/edit'
								}
							}, params.row.news_id);
						}
					}, {
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/news/' + params.row.news_id + '/edit'
								}
							}, params.row.title);
						}
					},
					{
						title: '权限',
						key: 'privilege',
						render: (h, params) => {
							return h('Tag', {
								props: {
									color: params.row.privilege == 0 ? "success" : "error",
								}
							}, params.row.privilege == 0 ? "公开" : "私有");
						}
					},
					{
						title: '操作',
						key: 'op',
						render: (h, params) => {
							let Vnode = Array()
							Vnode.push(h('Button', {
									props: {
										type: 'primary',
										to: '/news/' + params.row.news_id + '/edit'
									},
									style: "margin:0 1px"
								},
								'编辑'
							))
							return h('div', Vnode);
						}
					},
				],
				newsData: []
			}
		},
		computed: {
			newsPage: function() {
				if (this.$route.query['page'])
					return parseInt(this.$route.query['page'])
				else
					return 1;
			}
		},
		mounted() {
			this.getNewsList()
		},
		watch: {
			'$route'(to, from) {
				this.getNewsList()
			}
		},
		methods: {
			changePage(val) {
				this.$router.push({
					path: '/manage/news',
					query: {
						page: val
					}
				})
			},
			getNewsList() {
				this.newsLoading = true;
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				axios
					.get(this.$store.state.API_ROOT + 'news/list/' + this.newsPage + "?" + params.toString())
					.then(response => {
						this.newsData = response.data.data.newsList
						this.newsCnt = response.data.data.total
						this.newsPageSize = response.data.data.pageSize
						this.newsLoading = false;
					}).catch(function(error) {
						console.log(error);
					});
			},
			filterNews() {
				this.newsLoading = true;
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('title', this.filterData.title);
				params.append('privilege', this.filterData.privilege);
				axios
					.get(this.$store.state.API_ROOT + 'news/list/' + this.newsPage + "?" + params.toString())
					.then(response => {
						this.newsData = response.data.data.newsList
						this.newsCnt = response.data.data.total
						this.newsPageSize = response.data.data.pageSize
						this.newsLoading = false;
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
