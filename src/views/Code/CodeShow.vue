<template>
	<Row>
		<Col span="16">
		<Content>
			<MarkdownShow class="codeContent" v-model="content" />
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
				<Card class="CodeCard">
					<p slot="title">代码信息</p>
					<Table :columns="tableCol" :data="codeData" :show-header="false"></Table>
				</Card>
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>
	export default {
		name: 'Code',
		data() {
			return {
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
													to: '/code?tags=' + item.name
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
				codeData: [],
			}
		},
		mounted() {
			var params = new URLSearchParams();
			if (this.$store.state.loginInfo.isLogin) {
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
			}
			axios
				.get(this.$store.state.API_ROOT + 'code/' + this.$route.params.id + "?" + params.toString())
				.then(response => {
					this.content = "```"+(response.data.data.code.language=="text"?"":response.data.data.code.language)
					this.content = this.content + "\n"+ response.data.data.code.code + "\n```"
					
					this.creator = response.data.data.code.user_id
					this.userData = response.data.data.creator
					this.creatorImg = response.data.data.creatorImg
					
					let codeInfo = Array()
					codeInfo.push({
						name:"创建日期",
						info:response.data.data.code.insert_time
					})
					this.codeData = codeInfo
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style>
	.codeContent {
		margin: 10px 0 10px 10px;
	}

	.UserCard,
	.CodeCard {
		margin: 5px 0;
	}
</style>
