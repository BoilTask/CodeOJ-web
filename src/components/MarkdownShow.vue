<template>
	<mavon-editor class="showDiv" codeStyle='vs2015' v-model="content" :editable="false" :toolbars="options" :toolbarsFlag="false" defaultOpen="preview"
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
		data(){
			return{
				options: {
					navigation:true,
					readmodel: true
				  }
			} 
		},
	}
</script>

<style scoped>
	.showDiv{
		z-index: 500;
	}
</style>
