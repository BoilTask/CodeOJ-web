<template>
	<Row>
		<Col span="16">
		<Content>
			<div style="padding: 10px;background: #f8f8f9">
				<Card title="博客文章" icon="ios-leaf">
					<CellGroup>
						<Cell v-for="(blog,index) in blogData" :title="blog.title" :to="'/blog/'+blog.blog_id" >
							<span slot="extra"><Icon type="md-git-pull-request" /><Time :time="blog.insert_time" /></span>
						</Cell>
					</CellGroup>
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
						<Icon type="ios-person-add" />{{user}}</p>
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
												to: '/blog/tag/' + item.name
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
			var params = new URLSearchParams();
			if(this.$store.state.loginInfo.isLogin){
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}
			axios
				.get(this.$store.state.API_ROOT + 'user/' + this.$route.params.id+"?"+params.toString())
				.then(response => {
					this.user = response.data.data.user_id
					document.title = this.user + " - CodeOJ"
					this.userData = response.data.data.userData
					this.userImg = response.data.data.userImg
					this.blogData = response.data.data.blogData
				}).catch(function(error) {
					console.log(error);
				});
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
