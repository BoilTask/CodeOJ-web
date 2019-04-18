<template>
	<Content>
		<p>123123</p>
		<p>123123</p>
		<p>123123</p>
		<mavon-editor v-model="content" />
	</Content>
</template>

<script>

	export default {
		name: 'BlogEdit',
		data() {
			return {
				content: ''
			}
		}
	}
</script>

<style>

</style>
