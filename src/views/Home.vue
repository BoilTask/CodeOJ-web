<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content>
				<Carousel v-model="carouselValue" :autoplay="carouselSetting.autoplay" :autoplay-speed="carouselSetting.autoplaySpeed"
				 :dots="carouselSetting.dots" :radius-dot="carouselSetting.radiusDot" :trigger="carouselSetting.trigger" :arrow="carouselSetting.arrow">
					<CarouselItem v-for="(carouselItem,index) in carouseList">
						<img :src="carouselItem.img" :alt="index" :style="{'width':'100%'}">
					</CarouselItem>
				</Carousel>
				<i-circle :percent="circlePercent" :size="300">
					<div>
						<div style="font-size:32px">{{circlePercent}}%</div>
						<div class="progressBox" style="font-size:24px">一日进度</div>
						<div style="font-size:20px">{{currentTime}}</div>
					</div>
				</i-circle>
			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>
				<Collapse v-model="newsShow">
					<Panel v-for="(news,index) in newsList" :name="'news-'+index" ref="newsPanel" hide-arrow>
						{{news.title}}
						<p slot="content">{{news.content}}</p>
					</Panel>
				</Collapse>
			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				currentTime: this.getTime(),
				carouselValue: 0,
				carouselSetting: {
					autoplay: true,
					autoplaySpeed: 2000,
					dots: 'inside',
					radiusDot: false,
					trigger: 'click',
					arrow: 'hover'
				},
				carouseList: [],
				circlePercent: 0,
				newsList: [],
				newsShow: []
			}
		},
		methods: {
			getTime: function() {
				var currentTime = new Date(new Date().getTime() + 1000)
				var Y = currentTime.getYear() + 1900
				var M = currentTime.getMonth() + 1
				var D = currentTime.getDate()
				var h = currentTime.getHours()
				var m = currentTime.getMinutes()
				var s = currentTime.getSeconds()
				return Y + "-" + M + "-" + D + " " + (h >= 10 ? h : "0" + h) + ":" + (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s :
					"0" + s)
			}
		},
		mounted() {
			axios
				.get('http://api.codeoj.cn/home')
				.then(response => {
					this.currentTime = response.data.time
					this.carouseList = response.data.carouse
					this.newsList = response.data.news
// 					var cnt=0;
// 					for (var i = 0; i < this.newsList.length; i++) {
// 						if (this.newsList[i].show) {
// 							this.$refs.newsPanel[i].isActive=true;
// // 							this.newsShow.push('news-'+i);
// // 							Vue.set(this.newsShow, cnt, this.newsShow[cnt]);
// 							cnt++;
// 						}
// 					}
					this.$Spin.hide()
				})
			setInterval(() => {
				var currentTime = new Date(new Date(this.currentTime).getTime() + 1000)
				var Y = currentTime.getYear() + 1900;
				var M = currentTime.getMonth() + 1;
				var D = currentTime.getDate();
				var h = currentTime.getHours();
				var m = currentTime.getMinutes();
				var s = currentTime.getSeconds();
				this.currentTime = Y + "-" + M + "-" + D + " " + (h >= 10 ? h : "0" + h) + ":" + (m >= 10 ? m : "0" + m) + ":" +
					(s >=
						10 ? s : "0" + s)

				var Y = currentTime.getYear() + 1900;
				var M = currentTime.getMonth() + 1;
				var D = currentTime.getDate();

				var todayTime = new Date(Y + "-" + M + "-" + D + " 0:0:0")
				this.circlePercent = parseFloat(((currentTime.getTime() - todayTime.getTime()) / 864000.0).toFixed(2));
			}, 1000)
		}
	}
</script>

<style>
	.progressBox {
		width: 50%;
		margin: 15px auto;
		padding: 15px;
		border: solid 2px #2db7f5;
		border-radius: 50px;
	}
</style>
