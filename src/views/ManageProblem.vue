<template>
	<Content style="text-align: center;padding: 20px;">
		<Page :total="blogCnt" :page-size="blogPageSize" :current="blogPage" @on-change="changePage" show-elevator show-total
		 class="pageBar" />
		<Table stripe :columns="blogColumns" :data="blogData" :loading="blogLoading"></Table>
		<Page :total="blogCnt" :page-size="blogPageSize" :current="blogPage" @on-change="changePage" show-elevator show-total
		 class="pageBar" />
	</Content>
</template>

<script>
	export default {
		name: 'ManageProblem',
		data() {
			return {
				blogLoading: true,
				blogCnt: 0,
				blogPageSize: 50,
				blogColumns: [{
						title: '#',
						key: 'blog_id',
						width: 80,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									size: 'small',
									to: '/blog/' + params.row.blog_id
								}
							}, params.row.blog_id);
						}
					}, {
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/blog/' + params.row.blog_id
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
											to: '/blog/tag/' + item.name
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
						title: '操作',
						key: 'op',
						render: (h, params) => {
							let Vnode = Array()
							Vnode.push(h('Button', {
									props: {
										type: 'primary',
										to: '/blog/' + params.row.blog_id+'/edit'
									},
									style: "margin:0 1px"
								},
								'编辑'
							))
							return h('div', Vnode);
						}
					},
				],
				blogData: [],
			}
		},
		computed: {
			blogPage: function() {
				if (this.$route.query['page'])
					return parseInt(this.$route.query['page'])
				else
					return 1;
			}
		},
		mounted() {
			this.getBlogList()
		},
		watch: {
			'$route'(to, from) {
				this.getBlogList()
			}
		},
		methods: {
			changePage(val) {
				this.$router.push({
					path: '/manage/blog',
					query: {
						page: val
					}
				})
			},
			getBlogList() {
				this.blogLoading = true;
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('user', this.$store.state.loginInfo.user_id);
				axios
					.get(this.$store.state.API_ROOT + 'blog/list/' + this.blogPage + "?" + params.toString())
					.then(response => {
						this.blogData = response.data.data.blogList
						this.blogCnt = response.data.data.total
						this.blogPageSize = response.data.data.pageSize
						this.blogLoading = false;
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
