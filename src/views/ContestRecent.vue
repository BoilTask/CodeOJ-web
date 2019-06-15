<template>
	<Content style="text-align: center;padding: 20px;">
		<h2 style="margin: 10px;">近期比赛</h2>
		<Table stripe :columns="contestColumns" :data="contestData" :loading="contestLoading"></Table>
		<h3 style="margin:10px">数据来源：<a href="http://acmicpc.info/archives/224" target="_blank">http://contests.acmicpc.info/contests.json</a></h3>
	</Content>
</template>

<script>
	export default {
		name: 'ContestRecent',
		data() {
			return {
				contestLoading: true,
				contestColumns: [{
						title: '#',
						align: "center",
						width: '100',
						render: (h, params) => {
							return h('span', params.index + 1);
						}
					}, {
						title: 'OJ',
						key: 'oj',
						width: '100',
						align: "center"
					},
					{
						title: '名称',
						key: 'name',
						render: (h, params) => {

							return h('Button', {
									props: {
										type: 'dashed',
									},
									on: {
										click: () => {
											window.open(params.row.link)
										}
									}
								},
								params.row.name);
						}
					},
					{
						title: '时间',
						key: 'start_time',
						width: '180',
						align: "center"
					},
					{
						title: '星期',
						key: 'week',
						width: '180',
						align: "center"
					},
					{
						title: '权限',
						key: 'access',
						width: '180',
						align: "center"
					},
				],
				contestData: []
			}
		},
		mounted() {
			this.contestLoading = true;
			axios
				.get(this.$store.state.API_ROOT + 'contest/recent')
				.then(response => {
					// console.log(response)
					this.contestData = response.data.data.contestList
					this.contestLoading = false;
				}).catch(function(error) {
					console.log(error);
				});

		}
	}
</script>

<style scoped>
	.pageBar {
		margin: 10px 0;
	}
</style>
