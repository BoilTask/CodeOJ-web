<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content style="text-align: center;">
				<Page :total="blogCnt" :page-size="blogPageSize" :current="blogPage" @on-change="changePage" show-elevator
				 show-total class="pageBar" />
				<Table stripe :columns="blogColumns" :data="blogData" :loading="blogLoading"></Table>
				<Page :total="blogCnt" :page-size="blogPageSize" :current="blogPage" @on-change="changePage" show-elevator
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
							<FormItem prop="user">
								<Input type="text" v-model="filterData.user" placeholder="User">
								<span slot="prepend">作者：</span>
								</Input>
							</FormItem>
							<FormItem>
								<Button type="primary" @click="getBlogList(true)">筛选</Button>
							</FormItem>
						</Form>
					</Card>

					<Card v-if="tagData.length>0" class="siderCard" style="background-color: #212121">
						<Button v-for="tag in tagData" style="margin:2px" ghost :to="'/blog?tags='+tag.name">{{tag.name}}</Button>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	export default {
		name: 'Bloglist',
		data() {
			return {
				blogLoading: true,
				blogCnt: 0,
				blogPageSize: 50,
				filterData: {
					title: '',
					tags: '',
					user: '',
				},
				tagData: [],
				blogColumns: [{
						title: '#',
						key: 'blog_id',
						width: 80,
						align: "center",
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
											to: '/blog?tags=' + item.name
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
						title: '作者',
						key: 'creator',
						align: "center",
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/user/' + params.row.creator
								}
							}, params.row.creator);
						}
					}
				],
				blogData: []
			}
		},
		computed: {
			blogPage: {
				get: function() {
					if (this.$route.query['page'])
						return parseInt(this.$route.query['page'])
					else
						return 1;
				},
				set: function(val) {
					this.$router.push({
						path: 'blog',
						query: {
							title: this.filterData.title,
							tags: this.filterData.tags,
							user: this.filterData.user,
							page: val,
						}
					})
				}
			}
		},
		mounted() {
			this.filterData.title = this.$route.query['title'] ? this.$route.query['title'] : ''
			this.filterData.tags = this.$route.query['tags'] ? this.$route.query['tags'] : ''
			this.filterData.user = this.$route.query['user'] ? this.$route.query['user'] : ''
			this.getBlogList()
			axios
				.get(this.$store.state.API_ROOT + 'blog/tag')
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
				this.filterData.user = this.$route.query['user'] ? this.$route.query['user'] : ''
				this.getBlogList()
			}
		},
		methods: {
			changePage(val) {
				this.blogPage = val
			},
			getBlogList(reset = false) {
				if (reset)
					this.blogPage = 1
				this.blogLoading = true;
				var params = new URLSearchParams();
				if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo.user_id.length <= 20)
					params.append('user_id', this.$store.state.loginInfo.user_id);
				if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
					params.append('token', this.$store.state.loginInfo.token);
				if (this.filterData.title && this.filterData.title != '')
					params.append('title', this.filterData.title);
				if (this.filterData.tags && this.filterData.tags != '')
					params.append('tags', this.filterData.tags);
				if (this.filterData.user && this.filterData.user != '')
					params.append('user', this.filterData.user);
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

	.siderCard {
		width: 90%;
		margin: 20px auto;
	}
</style>
