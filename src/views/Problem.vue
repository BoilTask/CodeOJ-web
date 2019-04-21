<template>
	<Row>
		<Col span="16">
		<Content>
			<MarkdownShow v-model="description" />
			<MarkdownShow v-model="hint" />
		</Content>
		</Col>
		<Col span="8">
		<Sider width="100%" hide-trigger>
			<div style="background-color: #f8f8f9; padding: 10px;">
				<Card class="ProblemCard">
					<p slot="title">{{problemId}}{{problemTitle}}</p>
					<Table :columns="problemCol" :data="problemData" :show-header="false"></Table>
				</Card>
				<mavon-editor class="ProblemCard" :subfield="false" :toolbarsFlag="false" defaultOpen="edit" :ishljs="true" />
			</div>
		</Sider>
		</Col>
	</Row>
</template>

<script>
	// import Clipboard from 'clipboard';
	export default {
		name: 'Problem',
		data() {
			return {
				problemId: '',
				problemTitle: '',
				description: '',
				hint: '',
				time_limit: '',
				memory_limit: '',
				accept: 0,
				attempt: 0,
				problemCol: [{
						key: 'name'
					},
					{
						key: 'info'
					}
				],
				problemData: []
			}
		},
		mounted() {
			axios
				.get(this.$store.state.API_ROOT + 'problem/' + this.$route.params.id)
				.then(response => {
					this.problemId = response.data.data.problemInfo.problem_id
					this.problemTitle = " - " + response.data.data.problemInfo.title
					document.title = this.problemId + this.problemTitle + " - CodeOJ"
					this.description = response.data.data.problemInfo.description
					this.hint = response.data.data.problemInfo.hint
					this.problemData = response.data.data.problemInfo.problemData
				}).catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style>
	.ProblemCard {
		width: 90%;
		margin: 20px auto;
	}
</style>
