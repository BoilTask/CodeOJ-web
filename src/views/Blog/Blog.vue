<template>
	<Row>
		<Col span="16">
		<Content>
			<MarkdownShow class="blogContent" v-model="content" />
		</Content>
		</Col>
		<Col span="8">
		<Sider width="100%" hide-trigger>
			<div style="background-color: #f8f8f9; padding: 10px;">
				<Card class="UserCard">
					<p slot="title">作者信息</p>
					<p slot="extra">
						<Button :to="'/user/'+creator">
							<Icon type="ios-person-add" />{{creator}}</Button>
					</p>
					<div v-if="creatorImg!=''" style="text-align:center">
						<img :src="creatorImg">
					</div>
					<Table :columns="tableCol" :data="userData" :show-header="false"></Table>
				</Card>
				<Card class="BlogCard">
					<p slot="title">文章信息</p>
					<p slot="extra">
						<Button v-if="isEdit" :to="'/blog/'+this.$route.params.id+'/edit'" type="error">编辑</Button>
					</p>
					<Table :columns="tableCol" :data="blogData" :show-header="false"></Table>
				</Card>
				<Card title="文章讨论">
					<p slot="extra">
						<Button :to="'/discuss?keyword=b-'+this.$route.params.id">More</Button>
					</p>
					<CellGroup v-if="discussData.length>0">
						<Cell v-for="(discuss,index) in discussData" :title="discuss.title" :to="'/discuss/'+discuss.discuss_id" ></Cell>
					</CellGroup>
					<span v-else>暂无讨论，可点击 <Button type="dashed" :to="'/discuss?keyword=b-'+this.$route.params.id">More</Button> 操作</span>
				</Card>
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>

	// import Vue from 'vue'
	// import VueSocketIO from 'vue-socket.io'
	// Vue.use(new VueSocketIO({
	//     debug: false,
	//     connection: 'http://ws.codeoj.cn:80',
	// }))
	
	export default {
		name: 'Blog',
		data() {
			return {
				isEdit: false,
				content: '',
				creator: '',
				creatorImg: '',
				tableCol: [{
						key: 'name'
					},
					{
						key: 'info',
						render: (h, params) => {
							if (Array.isArray(params.row.info)) {
								if (params.row.info.length) {
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
								}
								return h('span', '无');
							} else {
								return h('span', params.row.info);
							}
						}
					}
				],
				userData: [],
				blogData: [],
				discussData: []

			}
		},
		mounted() {
			var params = new URLSearchParams();
			if (this.$store.state.loginInfo.isLogin) {
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}
			axios
				.get(this.$store.state.API_ROOT + 'blog/' + this.$route.params.id + "?" + params.toString())
				.then(response => {
					document.title = response.data.data.blog.title + " - CodeOJ"
					this.content = "# " + response.data.data.blog.title + '\n' + response.data.data.blog.content
					this.creator = response.data.data.blog.creator
					this.userData = response.data.data.creator
					this.creatorImg = response.data.data.creatorImg
					this.blogData = response.data.data.blogData
					if (this.creator === this.$store.state.loginInfo.user_id) {
						this.isEdit = true
					}
				}).catch(function(error) {
					console.log(error);
				});
			params = new URLSearchParams();
			if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo.user_id.length <= 20)
				params.append('user_id', this.$store.state.loginInfo.user_id);
			if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
				params.append('token', this.$store.state.loginInfo.token);
			params.append('keyword', 'b-'+this.$route.params.id);
			axios
				.get(this.$store.state.API_ROOT + 'discuss/list/1' + "?" + params.toString())
				.then(response => {
			
					this.discussData = response.data.data.discussList
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
