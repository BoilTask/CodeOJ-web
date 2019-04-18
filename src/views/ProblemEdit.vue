<template>
	<Row>
		<Col span="16">
		<Content>
			<mavon-editor v-model="description" :ishljs = "true"/>
			<mavon-editor v-model="hint" :ishljs = "true"/>
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
		name: 'ProblemEdit',
		data() {
			return {
				description: '',
				hint:''
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT+'problem/'+this.$route.params.id)
				.then(response => {
					this.description = response.data.data.problemInfo.description
					this.hint = response.data.data.problemInfo.hint
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style>

</style>

