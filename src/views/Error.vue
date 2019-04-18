<template>
	<Content>
		<p>{{this.$route.params.msg}}</p>
		<Button v-on:click="goBack">返回</Button>
	</Content>
</template>

<script>
	export default {
		name: 'Error',
		methods: {
			goBack() {
				if (window.history.length > 1)
					this.$router.go(-1)
				else
					this.$router.push('/')
			}
		},
		mounted() {
			if (this.$route.params.msg == null || this.$route.params.msg == '')
				this.$router.push('/')
		}
	}
</script>

<style>
</style>
