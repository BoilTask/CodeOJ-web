<template>
	<Content style="text-align: center;padding: 20px;">
		<Form ref="filterData" :model="filterData" inline>
			<FormItem prop="title">
				<Input type="text" v-model="filterData.problem_id" placeholder="Problem_id">
				<span slot="prepend">题目：</span>
				</Input>
			</FormItem>
			<FormItem prop="result">
				<Select v-model="filterData.result" style="width:200px">
					<span slot="prefix">状态：</span>
					<Option v-for="result in resultList" :value="result.key" :key="result.key">{{ result.name }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="score_min">
				<Input type="number" v-model="filterData.score_min" placeholder="0" style="width:110px">
				<span slot="prepend">分数：</span>
				</Input>
			</FormItem>
			<FormItem prop="score_max">
				<Input type="number" v-model="filterData.score_max" placeholder="100" style="width:110px">
				<span slot="prepend">~</span>
				</Input>
			</FormItem>
			<FormItem prop="language">
				<Select v-model="filterData.language" style="width:150px">
					<span slot="prefix">语言：</span>
					<Option v-for="language in languageList" :value="language.key" :key="language.key">{{ language.name }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="user">
				<Input type="text" v-model="filterData.user" placeholder="user">
				<Button slot="prepend" @click="fillMine">用户：</Button>
				</Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="filterStatus">筛选</Button>
			</FormItem>
		</Form>
		<ButtonGroup class="pageBar">
			<Button type="primary" @click="previousPage">
				<Icon type="ios-arrow-back" />
				上一页
			</Button>
			<Button type="primary" @click="nextPage">
				下一页
				<Icon type="ios-arrow-forward" />
			</Button>
		</ButtonGroup>
		<Table stripe :columns="statusColumns" :data="statusData" :loading="statusLoading"></Table>
		<ButtonGroup class="pageBar">
			<Button type="primary" @click="previousPage">
				<Icon type="ios-arrow-back" />
				上一页
			</Button>
			<Button type="primary" @click="nextPage">
				下一页
				<Icon type="ios-arrow-forward" />
			</Button>
		</ButtonGroup>
	</Content>
</template>

<script>
	export default {
		name: 'Status',
		data() {
			return {
				statusLoading: true,
				filterData: {
					problem_id: '',
					result: -1,
					score_min: 0,
					score_max: 100,
					language: -1,
					user: ''
				},
				resultList: [{
						key: -1,
						name: 'All'
					},
					{
						key: 4,
						name: 'Accept'
					},
					{
						key: 5,
						name: 'Persentation Error'
					},
					{
						key: 6,
						name: 'Wrong Answer'
					},
					{
						key: 7,
						name: 'Time Limit Error'
					},
					{
						key: 8,
						name: 'Memory Limit Error'
					},
					{
						key: 9,
						name: 'Output Limit Exceeded'
					},
					{
						key: 10,
						name: 'Runtime Error'
					},
					{
						key: 11,
						name: 'Compile Error'
					},
					{
						key: 14,
						name: 'Judge Fail'
					},
					{
						key: 0,
						name: 'Pending'
					},
					{
						key: 1,
						name: 'Pending Rejudge'
					},
					{
						key: 2,
						name: 'Compiling'
					},
					{
						key: 3,
						name: 'Running & Judging'
					}
				],
				languageList: [{
						key: -1,
						name: 'All'
					},
					{
						key: 0,
						name: 'C'
					},
					{
						key: 1,
						name: 'C++'
					},
					{
						key: 3,
						name: 'Java'
					},
					{
						key: 6,
						name: 'Python'
					}
				],
				statusColumns: [{
						title: '#',
						key: 'status_id',
						align: "center",
						width: '100',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'text',
									to: '/status/' + params.row.status_id
								}
							}, params.row.status_id);
						}
					}, {
						title: '题目',
						key: 'problem_id',
						width: '100',
						align: "center",
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'text',
									to: '/problem/' + params.row.problem_id
								}
							}, params.row.problem_id);
						}
					},
					{
						title: '状态',
						key: 'result',
						align: "center",
						width: '180',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: this.resultToType(params.row.result),
									to: '/status/' + params.row.status_id
								}
							}, this.intToResult(params.row.result));
						}
					},
					{
						title: '分数',
						key: 'score',
						width: '100',
						render: (h, params) => {

							if (params.row.result < 4) {
								return h('Spin');
							} else {
								return h('Button', {
									props: {
										type: 'dashed',
										to: '/status/' + params.row.status_id
									}
								}, params.row.score);
							}
						}
					},
					{
						title: '用时',
						key: 'time',
						width: '100',
						align: "center",
						render: (h, params) => {
							return h('span', params.row.time<0?'-':params.row.time);
						}
					},
					{
						title: '内存',
						key: 'memory',
						width: '100',
						align: "center",
						render: (h, params) => {
							return h('span', params.row.memory<0?'-':params.row.memory);
						}
					},
					{
						title: '语言 / 长度',
						key: 'language',
						width: '150',
						align: "center",
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/status/' + params.row.status_id
								}
							}, this.intToLanguage(params.row.language) + ' / ' + params.row.length);
						}
					},
					{
						title: '用户',
						key: 'creator',
						align: "center",
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'text',
									to: '/user/' + params.row.creator
								}
							}, params.row.creator);
						}
					},
					{
						title: '时间',
						key: 'insert_time',
						width: '180',
						align: "center"
					},
				],
				statusData: [],
				interval: ''
			}
		},
		computed: {
			statusPage: {
				get: function() {
					if (this.$route.query['page'])
						return parseInt(this.$route.query['page'])
					else
						return 1;
				},
				set: function(val) {
					this.$router.push({
						path: 'status',
						query: {
							problem_id: this.filterData.problem_id,
							result: this.filterData.result,
							score_min: this.filterData.score_min,
							score_max: this.filterData.score_max,
							language: this.filterData.language,
							user: this.filterData.user,
							page: val
						}
					})
				}
			}
		},
		mounted() {
			this.filterData.problem_id = this.$route.query['problem_id'] ? this.$route.query['problem_id'] : ''
			this.filterData.result = this.$route.query['result'] ? this.$route.query['result'] : -1
			this.filterData.score_min = this.$route.query['score_min'] ? this.$route.query['score_min'] : 0
			this.filterData.score_max = this.$route.query['score_max'] ? this.$route.query['score_max'] : 100
			this.filterData.language = this.$route.query['language'] ? this.$route.query['language'] : -1
			this.filterData.user = this.$route.query['user'] ? this.$route.query['user'] : ''
			this.getStatusList()
		},
		watch: {
			'$route'(to, from) {
				this.getStatusList()
			}
		},
		methods: {
			fillMine(){
				if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo
					.user_id.length <= 20)
					this.filterData.user = this.$store.state.loginInfo.user_id
			},
			getStatusList() {
				if (this.interval != '') {
					clearInterval(this.interval);
				}
				this.statusLoading = true;
				var params = new URLSearchParams();
				if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state.loginInfo
					.user_id.length <= 20)
					params.append('user_id', this.$store.state.loginInfo.user_id);
				if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
					params.append('token', this.$store.state.loginInfo.token);
				if (this.filterData.problem_id && this.filterData.problem_id != '')
					params.append('problem_id', this.filterData.problem_id);
				if (this.filterData.result == 0 || (this.filterData.result && this.filterData.result != -1)) {
					params.append('result', this.filterData.result);
				}

				if (this.filterData.score_min == 0 || (this.filterData.score_min && this.filterData.score_min >= 0 && this.filterData
						.score_min <= 100))
					params.append('score_min', this.filterData.score_min);
				if (this.filterData.score_max == 0 || (this.filterData.score_max && this.filterData.score_max >= 0 && this.filterData
						.score_max <= 100))
					params.append('score_max', this.filterData.score_max);
				if (this.filterData.language == 0 || (this.filterData.language && this.filterData.language != -1))
					params.append('language', this.filterData.language);
				if (this.filterData.user && this.filterData.user.length >= 3 && this.filterData.user.length <= 20)
					params.append('user', this.filterData.user);

				axios
					.get(this.$store.state.API_ROOT + 'status/list/' + this.statusPage + "?" + params.toString())
					.then(response => {
						this.statusData = response.data.data.statusList
						this.statusLoading = false;


						this.interval = setInterval(

							() => {
								let updateList = new Array()
								for (let i = 0; i < this.statusData.length; i++) {
									if (this.statusData[i].result < 4) {
										updateList.push({
											key: i,
											status_id: this.statusData[i].status_id
										})
									}
								}

								if (updateList.length === 0) {
									clearInterval(this.interval);
									return true;
								}

								let updateListStr = JSON.stringify(updateList)

								var params = new URLSearchParams();
								if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state
									.loginInfo
									.user_id.length <= 20)
									params.append('user_id', this.$store.state.loginInfo.user_id);
								if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
									params.append('token', this.$store.state.loginInfo.token);
								if (updateListStr && updateListStr.length > 0) {
									params.append('statusList', updateListStr);
								}

								axios
									.get(this.$store.state.API_ROOT + 'status/update' + "?" + params.toString())
									.then(response => {

										let newStatus = response.data.data.statusList

											for (let i = 0; i < newStatus.length; i++) {
												this.$set(this.statusData[newStatus[i].key], 'result', newStatus[i].result)
												this.$set(this.statusData[newStatus[i].key], 'score', newStatus[i].score)
												this.$set(this.statusData[newStatus[i].key], 'time', newStatus[i].time)
												this.$set(this.statusData[newStatus[i].key], 'memory', newStatus[i].memory)
											}

									}).catch(function(error) {
										console.log(error);
									});
							}

							, 2500);

					}).catch(function(error) {
						console.log(error);
					});

			},
			filterStatus() {
				this.statusPage = 1
			},
			previousPage() {
				if (this.statusPage <= 1) {
					this.statusPage = 1
				} else {
					this.statusPage = this.statusPage - 1
				}
			},
			nextPage() {
				this.statusPage = this.statusPage + 1
			},
			intToLanguage(t) {

				let languageStr = ['C', 'C++', 'Pascal', 'Java','Ruby','Bash','Python']
				if (t >= 0 && t <= languageStr.length) {
					return languageStr[t]
				} else {
					return 'Other'
				}

			},
			intToResult(t) {
				let resultStr = ['Pending', 'Pending Rejudge',
					'Compiling', 'Running & Judging', 'Accept',
					'Persentation Error', 'Wrong Answer',
					'Time Limit Error', 'Memory Limit Error',
					'Output Limit Exceeded', 'Runtime Error',
					'Compile Error','Compile Limit Exceeded',
					'Test Running','Judge Fail'
				]
				if (t >= 0 && t <= resultStr.length) {
					return resultStr[t]
				} else {
					return 'Other'
				}
			
			},
			resultToType(t) {
				if (t < 4) {
					return 'info'
				} else if (t == 4) {
					return 'success'
				} else if (t == 5) {
					return 'warning'
				} else {
					return 'error'
				}
			}
		}
	}
</script>

<style scoped>
	.pageBar {
		margin: 10px 0;
	}
</style>
