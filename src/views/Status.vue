<template>
	<Content style="text-align: center;padding: 20px;">
		<Form ref="filterData" :model="filterData" inline>
			<FormItem prop="title">
				<Input type="text" v-model="filterData.title" placeholder="Title">
				<span slot="prepend">标题：</span>
				</Input>
			</FormItem>
			<FormItem prop="tags">
				<Input type="text" v-model="filterData.tags" placeholder="Tags">
				<span slot="prepend">标签：</span>
				</Input>
			</FormItem>
			<FormItem>
				<Select v-model="filterData.privilege">
					<span slot="prefix">权限：</span>
					<Option :value="0" :key="0">全部</Option>
					<Option :value="1" :key="1">公开</Option>
					<Option :value="2" :key="2">私有</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="filterStatus">筛选</Button>
			</FormItem>
		</Form>
		<Page :total="statusCnt" :page-size="statusPageSize" :current="statusPage" @on-change="changePage" show-elevator show-total
		 class="pageBar" />
		<Table stripe :columns="statusColumns" :data="statusData" :loading="statusLoading"></Table>
		<Page :total="statusCnt" :page-size="statusPageSize" :current="statusPage" @on-change="changePage" show-elevator show-total
		 class="pageBar" />
	</Content>
</template>

<script>
	export default {
		name: 'Status',
		data() {
			return {
				statusLoading: true,
				statusCnt: 0,
				statusPageSize: 50,
				filterData: {
					title: '',
					tags: '',
					privilege: 0
				},
				statusColumns: [{
						title: '#',
						key: 'status_id',
					}, {
						title: '题目',
						key: 'problem_id',
					},
					{
						title: '状态',
						key: 'result',
					},
					{
						title: '分数',
						key: 'score',
					},
					{
						title: '用时',
						key: 'time',
					},
					{
						title: '内存',
						key: 'memory',
					},
					{
						title: '语言',
						key: 'language',
					},
					{
						title: '长度',
						key: 'length',
					},
					{
						title: '用户',
						key: 'creator',
					},
					{
						title: '时间',
						key: 'insert_time',
					},
				],
				statusData: [
					{
						'status_id':1,
						'problem_id':1000,
						'result':'Accept',
						'score':100,
						'time':'100ms',
						'memory':'100MB',
						'language':'C',
						'length':'1000',
						'creator':'BoilTask',
						'insert_time':'2019-05-09 14:00:00',
					}
				]
			}
		},
		computed: {
			statusPage: function() {
				if (this.$route.query['page'])
					return parseInt(this.$route.query['page'])
				else
					return 1;
			}
		},
		mounted() {
			this.filterData.title=this.$route.query['title']?this.$route.query['title']:''
			this.filterData.tags=this.$route.query['tags']?this.$route.query['tags']:''
			this.filterData.privilege=this.$route.query['privilege']?this.$route.query['privilege']:0
			this.getStatusList()
		},
		watch: {
			'$route'(to, from) {
				this.getStatusList()
			}
		},
		methods: {
			changePage(val) {
				this.$router.push({
					path: '/manage/status',
					query: {
						page: val,
					}
				})
			},
			getStatusList() {
				this.statusLoading = true;
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				
				params.append('user', this.$store.state.loginInfo.user_id);
				params.append('title', this.filterData.title);
				params.append('tags', this.filterData.tags);
				params.append('privilege', this.filterData.privilege);
				axios
					.get(this.$store.state.API_ROOT + 'status/list/' + this.statusPage + "?" + params.toString())
					.then(response => {
						this.statusData = response.data.data.statusList
						this.statusCnt = response.data.data.total
						this.statusPageSize = response.data.data.pageSize
						this.statusLoading = false;
					}).catch(function(error) {
						console.log(error);
					});
			},
			filterStatus() {
				this.statusLoading = true;
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('user', this.$store.state.loginInfo.user_id);
				params.append('title', this.filterData.title);
				params.append('tags', this.filterData.tags);
				params.append('privilege', this.filterData.privilege);
				axios
					.get(this.$store.state.API_ROOT + 'status/list/' + this.statusPage + "?" + params.toString())
					.then(response => {
						this.statusData = response.data.data.statusList
						this.statusCnt = response.data.data.total
						this.statusPageSize = response.data.data.pageSize
						this.statusLoading = false;
					}).catch(function(error) {
						console.log(error);
					});
		
			}
		}
	}
</script>

<style scoped>
	.pageBar {
		margin: 10px 0;
	}
</style>
