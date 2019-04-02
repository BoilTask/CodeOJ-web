<template>
  <div id="app">
    <div class="layout container">
      <Layout>
        <OJHeader />
        <router-view />
        <OJFooter />
      </Layout>
    </div>
  </div>
</template>

<script>
	import OJHeader from './components/OJHeader.vue'
	import OJFooter from './components/OJFooter.vue'
	export default {
		name: 'app',
		components: {
			OJHeader,
			OJFooter
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width: 100%;
	}

	.container {
		width: 1200px;
		margin: 0 auto;
	}

	@media(max-width:1200px) {
		.container {
			width: 100%;
		}
	}
</style>
