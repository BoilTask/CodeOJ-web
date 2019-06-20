<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content>

				<Carousel v-model="carouselValue" :autoplay="carouselSetting.autoplay" :autoplay-speed="carouselSetting.autoplaySpeed"
				 :dots="carouselSetting.dots" :radius-dot="carouselSetting.radiusDot" :trigger="carouselSetting.trigger" :arrow="carouselSetting.arrow"
				 style="min-height: 180px;">
					<CarouselItem v-for="(carouselItem,index) in carouseList">
						<a v-if="carouselItem.url!=''" :href="carouselItem.url">
							<img :src="carouselItem.src" :alt="carouselItem.alt" :style="{'width':'100%'}">
						</a>
						<img v-else :src="carouselItem.src" :alt="carouselItem.alt" :style="{'width':'100%'}">
					</CarouselItem>
				</Carousel>

				<Tabs value="news" type="card">
					<TabPane label="公告" icon="ios-menu" name="news">
						<Card v-for="(news,index) in newsList" :bordered="false" class="newsCard">
							<p slot="title">{{news.title}}</p>
							<p slot="extra">
								<Icon type="ios-person-add-outline" />{{news.creator}}</p>
							<MarkdownShow v-model="news.content" />
						</Card>
					</TabPane>
					<TabPane label="信息" icon="md-bulb" name="name2">
						<Card class="newsCard">
							<p slot="title">资料整合</p>
							<div style="padding: 15px;">
								<ul>
									<li>
										<router-link to="/blog/1">更新日志</router-link>
									</li>
									<li>
										<router-link to="/blog/2">系统帮助 & FAQ</router-link>
									</li>
								</ul>
							</div>
						</Card>
						<SwitchServer />
					</TabPane>
				</Tabs>
			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>
				<div style="background-color: #f8f8f9;padding-top:20px;">
					<Card style="margin: 10px;">
						<p slot="title">
							一言 © Hitokoto
						</p>
						<p slot="extra">
							<Icon v-if="hitokotoCreator!=''" type="ios-person-add" />{{hitokotoCreator}}
						</p>
						<div style="padding: 20px;">
							<span>{{hitokotoContent}}</span>
							<p style="text-align: right">{{hitokotoFrom}}</p>
							<Spin fix v-if="spinHitokoto"></Spin>
						</div>
					</Card>
					<Card style="margin: 10px;">
						<p slot="title">
							当前日期
							<!-- 每日签到 -->
						</p>
						<!-- 
						<a style="color: #ed4014;" slot="extra" @click.prevent="changeLimit">
							<Icon type="ios-bowtie" />
							签到
						</a>
						 -->
						<div class="flexDiv">
							<div>
								<canvas id="rili" width="350px" height="200px" style="magin:0 auto;"></canvas>
							</div>
						</div>
					</Card>
					<div>
						<i-circle :percent="circlePercent" :size="300" style="display:block;margin:20px auto;">
							<div>
								<div style="font-size:32px">{{circlePercent}}%</div>
								<div class="progressBox" style="font-size:24px">一日进度</div>
								<div style="font-size:20px">{{this.$store.state.server_time}}</div>
							</div>
						</i-circle>
					</div>
					<Card style="margin: 10px;">
						<p slot="title">
							<Icon type="ios-magnet" />友情链接
						</p>
						<ul style="margin: 0; padding-left: 20px; ">
							<li><a href="https://hpuoj.com" target="_blank">HPU Online Judge</a></li>
							<li><a href="http://vj.codeoj.cn" target="_blank">HPU Virtual Judge</a></li>
							<li><a href="http://boiltask.com" target="_blank">BoilTask's Homepage</a></li>
							<li><a href="https://www.kancloud.cn/hpuacm/acmbook/content" target="_blank">HPU ACM Book</a></li>
							<li><a href="https://loj.ac" target="_blank">Libre Online Judge</a></li>
						</ul>
					</Card>
				</div>
			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	import SwitchServer from '../components/SwitchServer.vue'
	export default {
		name: 'Home',
		components: {
			SwitchServer
		},
		data() {
			return {
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
				hitokotoContent: '',
				hitokotoCreator: '',
				hitokotoFrom: '',
				spinHitokoto: true
			}
		},
		methods: {
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

			axios
				.get(this.$store.state.API_ROOT + 'home')
				.then(response => {
					this.carouseList = response.data.data.carouse
					this.newsList = response.data.data.news
				}).catch(function(error) {
					console.log(error);
				});

			axios.get('https://v1.hitokoto.cn')
				.then(response => {
					this.hitokotoContent = response.data.hitokoto
					this.hitokotoCreator = response.data.creator
					this.hitokotoFrom = "—— " + response.data.from
					this.spinHitokoto = false
				}).catch(function(error) {
					console.log(error);

				});
			setInterval(() => {
				var currentTime = new Date(this.$store.state.server_time.replace(/-/g, "/"))

				var Y = currentTime.getYear() + 1900;
				var M = currentTime.getMonth() + 1;
				var D = currentTime.getDate();

				var todayTime = new Date(Y + "/" + M + "/" + D + " 0:0:0")
				this.circlePercent = parseFloat(((currentTime.getTime() - todayTime.getTime()) / 864000.0).toFixed(3));
			}, 1000)
			this.drawRili()
		}
	}
</script>

<style scoped>
	.newsCard {
		width: 80%;
		padding: 5px;
		margin: 20px auto;
	}

	.progressBox {
		width: 50%;
		margin: 15px auto;
		padding: 15px;
		border: solid 2px #2db7f5;
		border-radius: 50px;
	}

	.list li {
		margin: 10px;
	}
</style>
