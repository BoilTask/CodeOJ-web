<template>
	<Row>
		<Col span="16">
		<Content>
			<Button to="/blog/1/edit">1</Button>
			<MarkdownShow class="blogContent" v-model="content" />
		</Content>
		</Col>
		<Col span="8">
		<Sider width="100%" hide-trigger>
			<div style="background-color: #f8f8f9; padding: 10px;">
				<Card class="UserCard">
					<p slot="title">作者信息</p>
					<p slot="extra"><Icon type="ios-person-add" />{{creator}}</p>
					<div v-if="creatorImg!=''" style="text-align:center">
						<img :src="creatorImg">
					</div>
					<Table :columns="tableCol" :data="userData" :show-header="false"></Table>
				</Card>
				<Card class="BlogCard">
					<p slot="title">文章信息</p>
					<Table :columns="tableCol" :data="blogData" :show-header="false"></Table>
				</Card>
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>
	// import Clipboard from 'clipboard';
	export default {
		name: 'Blog',
		data() {
			return {
				content: '',
				creator: '',
				creatorImg:'',
				tableCol: [{
						key: 'name'
					},
					{
						key: 'info'
					}
				],
				userData: [],
				blogData: []
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT + 'blog/' + this.$route.params.id)
				.then(response => {
					this.content = "# " + response.data.data.blog.title + '\n' + response.data.data.blog.content
					this.creator = response.data.data.blog.creator
					this.userData = response.data.data.creator
					this.creatorImg=response.data.data.creatorImg
					this.blogData = response.data.data.blogData
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style>
	.blogContent{
		margin: 10px 0 10px 10px;
	}
	.UserCard,.BlogCard {
		margin: 5px 0;
	}
</style>
