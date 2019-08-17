<template>
	<Footer class="footer">
		<BackTop></BackTop>
		<div class="footer-left">
			<p>{{time}}</p>
		</div>
		<div>
			<Button to="//www.beian.miit.gov.cn" target="_blank" ghost>
				豫ICP备15024677号-3
			</Button>
		</div>
		<div class="footer-right">
			<p>Copyright © CodeOJ</p>
		</div>
	</Footer>
</template>

<script>
	export default {
		name: 'OJFooter',
		computed: {
			time: {
				get: function() {
					return this.$store.state.server_time
				},
				set: function(val) {
					this.$store.commit('setTime', val)
				}
			}
		},
		methods: {
			exchangeTime: function(nowTime) {
				nowTime = nowTime.toString().replace(/-/g, "/")
				var currentTime = new Date(nowTime)
				var Y = currentTime.getYear() + 1900
				var M = currentTime.getMonth() + 1
				var D = currentTime.getDate()
				var h = currentTime.getHours()
				var m = currentTime.getMinutes()
				var s = currentTime.getSeconds()
				return Y + "-" + (M >= 10 ? M : "0" + M) + "-" + D + " " + (h >= 10 ? h : "0" + h) + ":" + (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s :
					"0" + s)
			},
			nextTime: function(nowTime) {
				nowTime = nowTime.toString().replace(/-/g, "/")
				var currentTime = new Date(new Date(nowTime).getTime() + 1000)
				return this.exchangeTime(currentTime)
			},
			getTime: function() {
				var currentTime = (this.time == '' ? (new Date()) : this.time)
				return this.exchangeTime(currentTime)
			}
		},
		mounted() {
			this.time = this.getTime()
			axios
				.get(this.$store.state.API_ROOT + 'time')
				.then(response => (
					this.time = this.exchangeTime(response.data.data.time)
				))

			setInterval(() => {
				this.time = this.nextTime(this.time)
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
</style>
