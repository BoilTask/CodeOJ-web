<template>
	<Content style="padding: 20px;">
		<Table stripe :columns="statusColumns" :data="statusData" :loading="statusLoading"></Table>
		<MarkdownShow v-if="code!=''" class="codeContent" v-model="code" />
		<MarkdownShow v-if="compileInfo!=''" class="codeContent" v-model="compileInfo" />
		<Collapse v-if="tasks.length>0" class="codeContent" simple>
			<Panel v-for="(task,index) in tasks">
				子任务 : {{index+1}}
				<div slot="content">
					<Collapse class="codeContent" simple>
						<Panel v-for="taskData in task">

							结果：<Tag :color="resultToType(taskData.result)">{{intToResult(taskData.result)}}</Tag> | 用时：{{taskData.time}} MS
							| 内存：{{taskData.memory}} KB
							<p slot="content">
								{{taskData.content==""?"无提示信息！":taskData.content}}
							</p>
						</Panel>
					</Collapse>
				</div>
			</Panel>
		</Collapse>
	</Content>
</template>

<script>
	export default {
		name: 'Status',
		data() {
			return {
				statusLoading: true,
				code: '',
				judge_time: '',
				compileInfo: '',
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
						width: '190',
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
							return h('span', params.row.time < 0 ? '-' : params.row.time);
						}
					},
					{
						title: '内存',
						key: 'memory',
						width: '100',
						align: "center",
						render: (h, params) => {
							return h('span', params.row.memory < 0 ? '-' : params.row.memory);
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
				interval: '',
				tasks: []
			}
		},
		mounted() {
			this.getStatusList()
		},
		watch: {
			'$route'(to, from) {
				this.getStatusList()
			}
		},
		methods: {
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

				axios
					.get(this.$store.state.API_ROOT + 'status/' + this.$route.params.id + "?" + params.toString())
					.then(response => {
						this.statusData = response.data.data.statusList

						var params = new URLSearchParams();
						if (this.$store.state.loginInfo.user_id && this.$store.state.loginInfo.user_id.length >= 3 && this.$store.state
							.loginInfo
							.user_id.length <= 20)
							params.append('user_id', this.$store.state.loginInfo.user_id);
						if (this.$store.state.loginInfo.token && this.$store.state.loginInfo.token != '')
							params.append('token', this.$store.state.loginInfo.token);

						axios
							.get(this.$store.state.API_ROOT + 'status/' + this.$route.params.id + "/detail?" + params.toString())
							.then(response => {
								this.code = '## 用户代码\n```' + (this.intToLanguage(this.statusData[0].language)) + '\n' + response.data.data.code +
									'\n```'
									
								let judge_time=response.data.data.judgeInfo.judge_time
								let judger=response.data.data.judgeInfo.judger
								
								if(judge_time&&judge_time!=''){
									let judgeInfo='## 判题信息\n>'+judge_time
									if(judger&&judger!=''){
										judgeInfo = judgeInfo +' By '+judger
									}
									this.code=judgeInfo+'\n'+this.code
								}
								
								
								this.compileInfo = (response.data.data.compileInfo && response.data.data.compileInfo != '') ? '## 编译信息' +
									'\n' + response.data.data.compileInfo : ''
								
								let taskstemp = response.data.data.tasks;
								let tasksArray = Array();
								for (let i = 0; i < taskstemp.length; i++) {
									if (!Array.isArray(tasksArray[taskstemp[i].task_id]))
										tasksArray[taskstemp[i].task_id] = Array();
									tasksArray[taskstemp[i].task_id].push({
										result: taskstemp[i].result,
										time: taskstemp[i].time,
										memory: taskstemp[i].memory,
										content: taskstemp[i].content
									})
								}

								this.tasks = tasksArray
							}).catch(function(error) {
								console.log(error);
							});

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
			intToLanguage(t) {

				let languageStr = ['C', 'C++', 'Pascal', 'Java', 'Ruby', 'Bash', 'Python']
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
					'Compile Error', 'Compile Limit Exceeded',
					'Test Running', 'Judge Fail'
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
			},
		}
	}
</script>

<style scoped>
	.codeContent {
		margin: 10px 10px 10px 10px;
	}
</style>
