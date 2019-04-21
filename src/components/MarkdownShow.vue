<template>
	<mavon-editor class="showDiv" codeStyle='vs2015' v-model="content" :editable="false" :toolbarsFlag="false" defaultOpen="preview"
	 :subfield="false" :ishljs="true" style="min-height: 0;" />
</template>

<script>
	export default {
		name: 'MarkdownShow',
		model: {
			prop: 'content',
			event: 'change'
		},
		props: {
			content: String
		},
		methods: {
			change() {
				
			}
		},
	}
</script>

<style scoped>
	.showDiv{
		z-index: 500;
	}
</style>
