<template>
	<Row>
		<Col span="16">
		<Content>
			<MarkdownShow v-model="content" />
		</Content>
		</Col>
		<Col span="8">
		<Sider hide-trigger>

		</Sider>
		</Col>
	</Row>
</template>

<script>
	export default {
		name: 'Blog',
		data() {
			return {
				content: ''
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT+'problem?id='+this.$route.params.id)
				.then(response => {
					this.content = response.data.description
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style>

</style>

