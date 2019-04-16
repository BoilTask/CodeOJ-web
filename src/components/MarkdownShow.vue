<template>
	<mavon-editor v-model="content" :editable="false" :toolbarsFlag="false" defaultOpen="preview" :subfield="false" />
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
				alert(123);
			}
		}
	}
</script>

<style>
</style>
