<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content>

				<Carousel v-model="carouselValue" :autoplay="carouselSetting.autoplay" :autoplay-speed="carouselSetting.autoplaySpeed"
				 :dots="carouselSetting.dots" :radius-dot="carouselSetting.radiusDot" :trigger="carouselSetting.trigger" :arrow="carouselSetting.arrow"
				style="min-height: 180px;"
				>
					<CarouselItem v-for="(carouselItem,index) in carouseList">
						<img :src="carouselItem.img" :alt="index" :style="{'width':'100%'}">
					</CarouselItem>
				</Carousel>

				<Tabs value="name1">
					<TabPane label="公告" name="name1" style="min-height: 600px;">
						<Card v-for="(news,index) in newsList" :bordered="false" class="newsCard">
							<p slot="title">{{news.title}}</p>
							<Markdown :content="news.content" :highlight="highlight" style="margin:0 20px">
							
							</Markdown>
							
						</Card>
					</TabPane>
					<TabPane label="下载" name="name2">
						可以下载的内容
					</TabPane>
				</Tabs>

			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>
				<div style="background-color: #f8f8f9;padding-top:20px;">
					<Affix :offset-top="150">
						<Card style="margin: 10px;">
							<p slot="title">
								每日签到
							</p>
							<a style="color: #ed4014;" slot="extra" @click.prevent="changeLimit">
								<Icon type="ios-bowtie" />
								签到
							</a>
							<div class="flexDiv">
								<!-- <Card size="300">
								<div style="text-align:center">
									<img src="http://api.codeoj.cn/images/sign.jpg">
								</div>
							</Card> -->

								<div>
									<canvas id="rili" width="350px" height="200px" style="magin:0 auto;"></canvas>
								</div>
							</div>
						</Card>
						<i-circle :percent="circlePercent" :size="300" style="margin:20px">
							<div>
								<div style="font-size:32px">{{circlePercent}}%</div>
								<div class="progressBox" style="font-size:24px">一日进度</div>
								<div style="font-size:20px">{{currentTime}}</div>
							</div>
						</i-circle>

					</Affix>
				</div>
			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	import Markdown from 'iview-editor/src/lib/components/md.vue';
	export default {
		name: 'Home',
		data() {
			return {
				currentTime: this.getTime(),
				carouselValue: 0,
				carouselSetting: {
					autoplay: true,
					autoplaySpeed: 5000,
					dots: 'inside',
					radiusDot: false,
					trigger: 'click',
					arrow: 'hover'
				},
				carouseList: [],
				circlePercent: 0,
				newsList: [],
				newsShow: [],
				highlight: function(code) {
					return code;
				}
			}
		},
		components: {
			Markdown
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
			},
			drawRili: function() {
				var rili = document.getElementById("rili");
				var riliCtx = rili.getContext("2d");
				riliCtx.clearRect(0, 0, 350, 350);
				var date = new Date();
				var year = date.getYear();
				var mouth = date.getMonth();
				var today = date.getDate();
				var week = date.getDay();

				var cardSize = 25;

				var array_three = [4, 6, 9, 11];
				var array_threeone = [1, 3, 5, 7, 8, 10, 12];
				var array_week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

				var firstDraw; //1号绘制位置
				var wIdx = today % 7;

				if (week >= wIdx) {
					firstDraw = week - wIdx + 1;
				} else {
					firstDraw = week - wIdx + 8;
				}

				var dayIndex = 1;
				var countDay = 30;

				if (array_three.indexOf(mouth + 1) > -1) {
					countDay = 30;
				} else if (array_threeone.indexOf(mouth + 1) > -1) {
					countDay = 31;
				} else {
					if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
						countDay = 29;
					else
						countDay = 28;
				}

				var row = 6;
				if (7 - firstDraw + 7 * 4 < countDay) { //确定表格行数，防止日期绘制不全
					row = 7;
				}

				function drawTodaybg(i, j) {
					riliCtx.save();

					riliCtx.beginPath();
					riliCtx.strokeStyle = "#900";
					riliCtx.arc(45 + i * cardSize * 1.5 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 10, -Math
						.PI, Math.PI * 1);
					riliCtx.stroke();
					riliCtx.closePath();

					riliCtx.beginPath();
					riliCtx.arc(45 + i * cardSize * 1.5 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 9, -Math.PI,
						Math.PI * 0.9);
					riliCtx.stroke();
					riliCtx.closePath();

					riliCtx.beginPath();
					riliCtx.arc(45 + i * cardSize * 1.5 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 8, -Math.PI,
						Math.PI * 0.8);
					riliCtx.stroke();
					riliCtx.closePath();

					riliCtx.beginPath();
					riliCtx.arc(45 + i * cardSize * 1.5 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 7, -Math.PI,
						Math.PI * 0.7);
					riliCtx.stroke();
					riliCtx.closePath();

					riliCtx.beginPath();
					riliCtx.arc(45 + i * cardSize * 1.5 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 6, -Math.PI,
						Math.PI * 0.6);
					riliCtx.stroke();
					riliCtx.closePath();

					riliCtx.restore();
				}

				var isNum = /^\d+(\d+)?$/;

				function drawDate(txt, i, j) {
					riliCtx.textAlign = "center";
					riliCtx.fillStyle = "rgb(69,68,84)";
					if (isNum.test(txt))
						riliCtx.font = (cardSize / 1.5) + 'px Arial';
					else
						riliCtx.font = (cardSize / 1.5) + 'px Impact';
					var yOffest = 3;


					if ((j == 0 || j == 6) && isNum.test(txt)) {
						riliCtx.fillStyle = "#900";
					}

					riliCtx.fillText(txt.toString(), 45 + j * cardSize * 1.5 + cardSize / 1.18, 50 + i * cardSize + cardSize / 3 * 2 +
						yOffest);

					if (txt == today) {
						drawTodaybg(j, i);
					}
				}

				riliCtx.fillStyle = "rgb(69,68,84)";
				riliCtx.font = "900 24pt SimHei";
				riliCtx.textAlign = "center";
				var monthCN = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
				riliCtx.scale(1.1, 1);
				riliCtx.fillText(monthCN[mouth] + "月", 125, 30);
				riliCtx.resetTransform();

				riliCtx.font = "24pt SimHei";
				riliCtx.textAlign = "end";
				riliCtx.fillText(today + "日", 250, 30);

				for (var i = 0; i < row; i++) {
					for (var j = 0; j < 7; j++) {
						riliCtx.strokeRect(45 + j * cardSize * 1.5, 50 + i * cardSize, cardSize * 1.5, cardSize);
					}
				}

				dayIndex = 1;

				for (var i = 0; i < row; i++) { //开始绘制日期数
					for (var j = 0; j < 7; j++) {
						if (i == 0) { //表格第一行绘制星期
							drawDate(array_week[j], i, j);
							continue;
						}

						if (i == 1 && j < firstDraw) { //确定1号绘制位置
							continue;
						}

						if (dayIndex > countDay) { //只绘制月份的天数
							break;
						}

						drawDate(dayIndex++, i, j);
					}
				}
			}
		},
		mounted() {
			this.$Spin.show()
			axios
				.get('http://api.codeoj.cn/home')
				.then(response => {
					this.currentTime = response.data.time
					this.carouseList = response.data.carouse
					this.newsList = response.data.news

					this.$Spin.hide()
				}).catch(function(error) {
					console.log(error);
					this.$Spin.hide()
				});
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
			this.drawRili()
		}
	}
</script>

<style>
	.newsCard {
		width: 80%;
		margin: 20px auto;
	}

	.progressBox {
		width: 50%;
		margin: 15px auto;
		padding: 15px;
		border: solid 2px #2db7f5;
		border-radius: 50px;
	}
</style>
