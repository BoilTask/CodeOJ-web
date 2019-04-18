<template>
	<Footer class="footer">
		<BackTop></BackTop>
		<div class="footer-left">
			{{time}}
		</div>
		<div>
			<Button to="//www.miitbeian.gov.cn" target="_blank" ghost>
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
				time: this.getTime()
			}
		},
		methods: {
			getTime: function() {
				var currentTime = new Date(new Date(this.time==null?(new Date()):this.time).getTime() + 1000)
				var Y = currentTime.getYear() + 1900
				var M = currentTime.getMonth() + 1
				var D = currentTime.getDate()
				var h = currentTime.getHours()
				var m = currentTime.getMinutes()
				var s = currentTime.getSeconds()
				return Y + "/" + M + "/" + D + " " + (h >= 10 ? h : "0" + h) + ":" + (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s :
					"0" + s)
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT +'time')
				.then(response => (
					this.time = response.data.data.time
				))
			setInterval(() => {
				var currentTime = new Date(new Date(this.time).getTime() + 1000)
				var Y = currentTime.getYear() + 1900;
				var M = currentTime.getMonth() + 1;
				var D = currentTime.getDate();
				var h = currentTime.getHours();
				var m = currentTime.getMinutes();
				var s = currentTime.getSeconds();
				this.time = Y + "/" + M + "/" + D + " " + (h >= 10 ? h : "0" + h) + ":" + (m >= 10 ? m : "0" + m) + ":" + (s >=
					10 ? s : "0" + s)
			}, 1000)
			
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
