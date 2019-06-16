<template>
	<Content style="padding: 15px;">
		<Card class="formCard">
			<p slot="title">重判题目</p>
			<Input v-model="problem_id" placeholder="请输入问题序号">
			<Button slot="append" v-on:click="reJudgeProblem">重判</Button>
			<span slot="prepend">题目序号：</span>
			</Input>
			</p>
		</Card>
		<Card class="formCard">
			<p slot="title">重判任务</p>
			<Input v-model="status_id" placeholder="请输入任务序号">
			<Button slot="append" v-on:click="reJudgeStatus">重判</Button>
			<span slot="prepend">任务序号：</span>
			</Input>
			</p>
		</Card>
		<Card class="formCard">
			<p slot="title">判题测试</p>
			<Button slot="extra" type="error" v-on:click="reJudge">重判</Button>
			<p><Icon type="ios-information-circle-outline" />点击重判之后会重新评判最近的100份提交</p>
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'ManageStatus',
		data() {
			return {
				problem_id:'',
				status_id:''
			}
		},
		methods: {
			reJudgeProblem() {
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('problem_id', this.problem_id);
				axios
					.post(this.$store.state.API_ROOT + 'rejudge', params)
					.then(response => {
						if (response.data.data.is_ok) {
							this.$Message.success('重判成功！');
							this.$router.push('/status?problem_id='+this.problem_id)
						} else {
							this.$Message.error(response.data.data.message);
						}
					}).catch(function(error) {
						console.log(error)
					});
			},
			reJudgeStatus() {
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				params.append('status_id', this.status_id);
				axios
					.post(this.$store.state.API_ROOT + 'rejudge', params)
					.then(response => {
						if (response.data.data.is_ok) {
							this.$Message.success('重判成功！');
							this.$router.push('/status/'+this.status_id)
						} else {
							this.$Message.error(response.data.data.message);
						}
					}).catch(function(error) {
						console.log(error)
					});
			},
			reJudge() {
				var params = new URLSearchParams();
				params.append('user_id', this.$store.state.loginInfo.user_id);
				params.append('token', this.$store.state.loginInfo.token);
				axios
					.post(this.$store.state.API_ROOT + 'rejudge', params)
					.then(response => {
						if (response.data.data.is_ok) {
							this.$Message.success('重判成功！');
							this.$router.push('/status?page=4')
						} else {
							this.$Message.error(response.data.data.message);
						}
					}).catch(function(error) {
						console.log(error)
					});
			}
		}
	}
</script>

<style scoped>
	.formCard{
		margin:10px;
	}
</style>
