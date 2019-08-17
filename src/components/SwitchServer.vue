<template>
	<Card class="newsCard">
		<p slot="title">端口设置</p>
		<div style="padding: 15px;">
			<p>
				<Select v-model="serverAPIROOT" style="width: 250px;">
					<span slot="prefix">后台地址：</span>
					<Option value="https://api.codeoj.cn/">https://api.codeoj.cn/</Option>
					<Option value="http://local.codeoj.cn/">http://local.codeoj.cn/</Option>
				</Select>
			</p>
			<p>
				<ul class="list">
					<li>主域名：<Button><a href="https://codeoj.cn">https://codeoj.cn</a></Button></li>
					<li>coding.net代理：<Button><a href="https://coding.codeoj.cn">https://coding.codeoj.cn</a></Button></li>
					<li>github.com代理：<Button><a href="https://github.codeoj.cn">https://github.codeoj.cn</a></Button></li>
					<li>开发环境：<Button><a href="http://localhost:8080">http://localhost:8080</a></Button></li>
				</ul>
			</p>
		</div>
	</Card>
</template>

<script>
	export default {
		name: 'SwitchServer',
		computed: {
			serverAPIROOT: {
				get: function() {
					return this.$store.state.API_ROOT
				},
				set: function(val) {
					this.$store.commit('changeAPIROOT', val)
					this.$Message.success('修改后台端口成功!');
				}
			}
		},
	}
</script>

<style>
	.newsCard {
		width: 80%;
		padding: 5px;
		margin: 20px auto;
	}
</style>
