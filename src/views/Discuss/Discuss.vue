<template>
	<Row>
		<Col span="16">
		<Content class="discussContent">
			<MarkdownShow class="discussShow" v-model="content" />
		</Content>
		<Card v-for="reply in replyList" class="replyCard">
			<p slot="title">
				<Icon type="ios-person" />
				<router-link :to="'/user/'+reply.creator">{{reply.creator}}</router-link>
			</p>
			<p slot="extra" v-if="reply.creator==$store.state.loginInfo.user_id">
				<Icon type="md-git-pull-request" /><router-link :to="'/discuss/'+$route.params.id+'/reply/'+reply.reply_id+'/edit'">{{reply.update_time}}</router-link>
			</p>
			<p slot="extra" v-else>
				<Icon type="md-git-pull-request" />{{reply.update_time}}
			</p>
			<MarkdownShow v-model="reply.content" />
		</Card>
		</Col>
		<Col span="8">
		<Sider width="100%" hide-trigger>
			<div style="background-color: #f8f8f9; padding: 10px;">
				<Card class="UserCard">
					<p slot="title">楼主信息</p>
					<p slot="extra">
						<Button :to="'/user/'+creator"><Icon type="ios-person" />{{creator}}</Button>
					</p>
					<div v-if="creatorImg!=''" style="text-align:center">
						<img :src="creatorImg">
					</div>
					<Table :columns="tableCol" :data="userData" :show-header="false"></Table>
				</Card>
				<Card class="DiscussCard">
					<p slot="title">主题信息</p>
					<p slot="extra">
						<Button v-if="isEdit" :to="'/discuss/'+this.$route.params.id+'/edit'" type="error">编辑</Button>
					</p>
					<Table :columns="tableCol" :data="discussData" :show-header="false"></Table>
					<p style="text-align: right;margin-top: 10px;">
						<ButtonGroup>
							<Button v-if="$store.state.loginInfo.isLogin" :to="'/discuss/'+this.$route.params.id+'/reply/add'" type="success">回复主题</Button>
						</ButtonGroup>
					</p>
				</Card>
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>
	export default {
		name: 'Discuss',
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
							if (params.row.name == '关键词') {
								return h('Button', {
										props: {
											type: 'info',
											size: 'small',
											to: '/discuss?keyword=' + params.row.info
										},
										style: "margin:0 1px"
									},
									params.row.info
								)
							} else {
								return h('span', params.row.info);
							}
						}
					}
				],
				userData: [],
				discussData: [],
				replyList: []

			}
		},
		mounted() {
			var params = new URLSearchParams();
			if (this.$store.state.loginInfo.isLogin) {
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}
			axios
				.get(this.$store.state.API_ROOT + 'discuss/' + this.$route.params.id + "?" + params.toString())
				.then(response => {
					document.title = response.data.data.discuss.title + " - CodeOJ"
					this.content = "# " + response.data.data.discuss.title + '\n' + response.data.data.discuss.content
					this.creator = response.data.data.discuss.creator
					this.userData = response.data.data.creator
					this.creatorImg = response.data.data.creatorImg
					this.discussData = response.data.data.discussData
					this.replyList = response.data.data.replyList
					if (this.creator === this.$store.state.loginInfo.user_id) {
						this.isEdit = true
					}
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style scoped>
	.discussShow {
		margin: 10px 0 10px 10px;
	}

	.UserCard,
	.DiscussCard {
		margin: 5px 0;
	}

	.replyCard {
		padding: 5px;
		margin: 10px 0 10px 10px;
	}
</style>
