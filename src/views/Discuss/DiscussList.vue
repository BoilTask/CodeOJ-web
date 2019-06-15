<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content style="text-align: center;">
				<Page :total="discussCnt" :page-size="discussPageSize" :current="discussPage" @on-change="changePage" show-elevator
				 show-total class="pageBar" />
				<Table stripe :columns="discussColumns" :data="discussData" :loading="discussLoading"></Table>
				<Page :total="discussCnt" :page-size="discussPageSize" :current="discussPage" @on-change="changePage" show-elevator
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
							<FormItem prop="keyword">
								<Input type="text" v-model="filterData.keyword" placeholder="Keyword">
								<span slot="prepend">主题：</span>
								</Input>
							</FormItem>
							<FormItem prop="user">
								<Input type="text" v-model="filterData.user" placeholder="User">
								<span slot="prepend">作者：</span>
								</Input>
							</FormItem>
							<FormItem>
								<Button type="primary" @click="getDiscussList(true)">筛选</Button>
								<Button type="error" :to="'/discuss/add?keyword='+filterData.keyword">新建</Button>
							</FormItem>
						</Form>
					</Card>

					<Card v-if="keywordData.length>0" class="siderCard" style="background-color: #212121">
						<Button v-for="keyword in keywordData" style="margin:2px" ghost :to="'/discuss?keyword='+keyword.keyword">{{keyword.keyword}}</Button>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	export default {
		name: 'Discusslist',
		data() {
			return {
				discussLoading: true,
				discussCnt: 0,
				discussPageSize: 50,
				filterData: {
					title: '',
					keyword: '',
					user: '',
				},
				keywordData: [],
				discussColumns: [{
						title: '#',
						key: 'discuss_id',
						width: 80,
						align: "center",
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									size: 'small',
									to: '/discuss/' + params.row.discuss_id
								}
							}, params.row.discuss_id);
						}
					}, {
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/discuss/' + params.row.discuss_id
								}
							}, params.row.title);
						}
					},
					{
						title: '主题',
						key: 'keyword',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/discuss?keyword=' + params.row.keyword
								}
							}, params.row.keyword);
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
				discussData: []
			}
		},
		computed: {
			discussPage: {
				get: function() {
					if (this.$route.query['page'])
						return parseInt(this.$route.query['page'])
					else
						return 1;
				},
				set: function(val) {
					this.$router.push({
						path: 'discuss',
						query: {
							title: this.filterData.title,
							keyword: this.filterData.keyword,
							user: this.filterData.user,
							page: val,
						}
					})
				}
			}
		},
		mounted() {
			this.filterData.title = this.$route.query['title'] ? this.$route.query['title'] : ''
			this.filterData.keyword = this.$route.query['keyword'] ? this.$route.query['keyword'] : ''
			this.filterData.user = this.$route.query['user'] ? this.$route.query['user'] : ''
			this.getDiscussList()
			axios
				.get(this.$store.state.API_ROOT + 'discuss/keyword')
				.then(response => {
					this.keywordData = response.data.data.keyword;
				}).catch(function(error) {
					console.log(error);
				});
		},
		watch: {
			'$route'(to, from) {
				this.filterData.title = this.$route.query['title'] ? this.$route.query['title'] : ''
				this.filterData.keyword = this.$route.query['keyword'] ? this.$route.query['keyword'] : ''
				this.filterData.user = this.$route.query['user'] ? this.$route.query['user'] : ''
				this.getDiscussList()
			}
		},
		methods: {
			changePage(val) {
				this.discussPage = val
			},
			getDiscussList(reset = false) {
				if (reset)
					this.discussPage = 1
				this.discussLoading = true;
				var params = new URLSearchParams();
				if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo.user_id.length <= 20)
					params.append('user_id', this.$store.state.loginInfo.user_id);
				if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
					params.append('token', this.$store.state.loginInfo.token);
				if (this.filterData.title && this.filterData.title != '')
					params.append('title', this.filterData.title);
				if (this.filterData.keyword && this.filterData.keyword != '')
					params.append('keyword', this.filterData.keyword);
				if (this.filterData.user && this.filterData.user != '')
					params.append('user', this.filterData.user);
				axios
					.get(this.$store.state.API_ROOT + 'discuss/list/' + this.discussPage + "?" + params.toString())
					.then(response => {

						this.discussData = response.data.data.discussList
						this.discussCnt = response.data.data.total
						this.discussPageSize = response.data.data.pageSize
						this.discussLoading = false;
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
