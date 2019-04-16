<template>
	<Row>
		<Col span="16">
		<Content>
			{{ $route.params.id }}
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
				.get(this.$store.state.API_ROOT+'blog')
				.then(response => {
					this.content = response.data
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style>

</style>
