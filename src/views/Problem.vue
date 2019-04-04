<template>
	<Row>
		<Col span="16">
		<Content>

			{{ $route.params.id }}
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
		name: 'Problem',
		data() {
			return {
				problemLoading: true,
			}
		},
		mounted() {
			axios
				.get('http://api.codeoj.cn/problemlist?pagesize=' + this.problemPageSize + "&page=" + this.problemPage)
				.then(response => {
					console.log(response)
					this.problemData = response.data.problemlist
					this.problemCnt = this.problemData.length
					this.problemData.forEach((val) => {
						var tags = "";
						val.tag.forEach((tag) => tags = tags + tag)
						val.tag = tags
					});
					this.problemLoading = false;
				}).catch(function(error) {
					console.log(error);
					
				});
		}
	}
</script>

<style>
</style>
