<template>
	<Footer class="footer">
		<div class="footer-left">
			<Time :time="time" :interval="1" />
		</div>
		<div>
			<Button ghost>
				豫ICP备15024677号-3
			</Button>
		</div>
		<div class="footer-right">
			<span>Copyright © CodeOJ</span>
		</div>
	</Footer>
</template>

<script>
	export default {
		name: 'OJFooter',
		data() {
			return {
				API_ROOT: this.$store.state.API_ROOT,
				time: new Date()
			}
		}
	}
</script>

<style scoped>
	.footer {
		display: flex;
		justify-content: space-between;
		color: #FFFFFF;
		background-color: #212121;
	}

	/* 	.footer-left{
		float: left;
	}
	.footer-right{
		float: right;
	} */
</style>
