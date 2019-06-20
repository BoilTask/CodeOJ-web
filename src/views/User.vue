<template>
	<Row>
		<Col span="16">
		<Content>
			<div style="padding: 10px;background: #f8f8f9">
				<Card title="博客文章" icon="ios-leaf">
					<p slot="extra">
						<Button :to="'/blog?user='+user">More</Button>
					</p>
					<CellGroup v-if="blogData.length>0">
						<Cell v-for="(blog,index) in blogData" :title="blog.title" :to="'/blog/'+blog.blog_id">
							<span slot="extra">
								<Icon type="md-git-pull-request" /><Time :time="blog.update_time" /></span>
						</Cell>
					</CellGroup>
					<p v-else>暂无文章……</p>
				</Card>
				<Card title="做题记录" icon="ios-leaf" style="margin-top:10px;">
					<p slot="extra">
						<Button :to="'/status?user='+user">More</Button>
					</p>

					<div ref="statusChart" style="width: 100%;height: 120px;"></div>
				</Card>
			</div>
		</Content>
		</Col>
		<Col span="8">
		<Sider width="100%" hide-trigger>
			<div style="background-color: #f8f8f9; padding: 10px;">
				<Card class="UserCard">
					<p slot="title">用户信息</p>
					<p slot="extra">
						<Icon type="ios-person-add" />{{user}}
					</p>
					<div v-if="userImg!=''" style="text-align:center">
						<img :src="userImg">
					</div>
					<Table :columns="tableCol" :data="userData" :show-header="false"></Table>
				</Card>
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'User',
		data() {
			return {
				content: '',
				user: '',
				userImg: '',
				tableCol: [{
						key: 'name'
					},
					{
						key: 'info',
						render: (h, params) => {
							if (Array.isArray(params.row.info)) {
								let Vnode = Array()
								params.row.info.forEach(((item, index) => {
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

							} else {
								return h('span', params.row.info);
							}
						}
					}
				],
				userData: [],
				blogData: []
			}
		},
		mounted() {
			this.getUserData();
		},
		watch: {
			'$route'(to, from) {
				this.getUserData();
			}
		},
		methods: {
			getUserData() {
				this.statusChart = echarts.init(this.$refs.statusChart);
				var params = new URLSearchParams();
				if (this.$store.state.loginInfo.isLogin) {
					params.append('user_id', this.$store.state.loginInfo.user_id);
					params.append('token', this.$store.state.loginInfo.token);
				}
				axios
					.get(this.$store.state.API_ROOT + 'user/' + this.$route.params.id + "?" + params.toString())
					.then(response => {
						this.user = response.data.data.user_id
						document.title = this.user + " - CodeOJ"
						this.userData = response.data.data.userData
						this.userImg = response.data.data.userImg

						let blogData = response.data.data.blogData
						for (let i = 0; i < blogData.length; i++) {
							blogData[i].update_time = blogData[i].update_time.toString().replace(/-/g, "/")
						}

						this.blogData = blogData

						this.statusChart.setOption({
							visualMap: {
								show: false,
								min: response.data.data.status.min,
								max: response.data.data.status.max,
								type: 'piecewise',
								orient: 'horizontal',
								left: 'center',
								inRange: {
									color: ['#C7DBFF', '#5291FF']
								},
							},
							tooltip: {},
							calendar: {
								range: response.data.data.status.range,
								left: 20,
								top: 20,
								cellSize: ['auto', 13],
								yearLabel: {
									show: false
								}
							},
							series: {
								type: 'heatmap',
								coordinateSystem: 'calendar',
								data: response.data.data.status.data
							}
						})
					}).catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style>
	.blogContent {
		margin: 10px 0 10px 10px;
	}

	.UserCard,
	.BlogCard {
		margin: 5px 0;
	}
</style>
