<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content style="text-align: center;">
				<Table stripe :columns="rankColumns" :data="rankData" :loading="rankLoading"></Table>
			</Content>
			</Col>
			<Col span="8">
			<Sider hide-trigger width="100%">
				<div style="background-color: #f8f8f9;padding:20px;">
					<Card class="siderCard">
						<p slot="title">用户排行</p>
						<p>
							根据用户做题量，统计出排名前列的用户。
						</p>
					</Card>

				</div>
			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	export default {
		name: 'Rank',
		data() {
			return {
				rankLoading: true,
				tagData: [],
				rankColumns: [{
						title: '#',
						width: 80,
						render: (h, params) => {
							return h('span', params.index+1);
						}
					}, {
						title: '用户名',
						key: 'user_id',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'dashed',
									to: '/user/' + params.row.user_id
								}
							}, params.row.user_id);
						}
					},
					{
						title: '昵称',
						key: 'nickname'
					},
					{
						title: '正确',
						key: 'accept',
						sortable: true,
						width: 80
					}
				],
				rankData: []
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT + 'rank')
				.then(response => {
					this.rankData = response.data.data.rankList
					this.rankLoading = false;
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style scoped>
	.siderCard {
		width: 90%;
		margin: 20px auto;
	}
</style>
