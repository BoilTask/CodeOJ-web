<template>
	<Row>
		<Col span="16">
		<Content>

			{{ $route.params.id }}
			<Markdown :content="content" :highlight="highlight" style="margin:0 20px">

			</Markdown>
		</Content>
		</Col>
		<Col span="8">
		<Sider hide-trigger>

		</Sider>
		</Col>
	</Row>
</template>

<script>
	import Markdown from 'iview-editor/src/lib/components/md.vue';
	export default {
		name: 'Blog',
		data() {
			return {
				content: '',
				highlight: function(code) {
					return code;
				}
			}
		},
		components: {
			Markdown
		},
		mounted() {
			axios
				.get('http://api.codeoj.cn/blog')
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
