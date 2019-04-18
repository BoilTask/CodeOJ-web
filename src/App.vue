<template>
	<div id="app">
		<div class="layout container">
			<Layout>
				<OJHeader />
				<router-view></router-view>
				<OJFooter />
			</Layout>
		</div>
		<Drawer v-on:on-close="drawerClose" :title="drawerTitle" v-model="drawerShow">
			<LoginForm></LoginForm>
		</Drawer>
	</div>
</template>

<script>
	import OJHeader from './components/OJHeader.vue'
	import OJFooter from './components/OJFooter.vue'
	import LoginForm from './components/LoginForm.vue'
	export default {
		name: 'app',
		components: {
			OJHeader,
			OJFooter,
			LoginForm
		},
		computed: {
			drawerShow: {
				get: function() {
					return this.$store.state.drawerInfo.drawerShow
				},
				set: function(val) {
					this.$store.commit('drawerChange', val)
				}
			},
			drawerTitle: {
				get: function() {
					return this.$store.state.drawerInfo.drawerTitle
				},
				set: function(val) {
					this.$store.commit('drawerTitle', val)
				}
			},
		},
		methods: {
			drawerClose: function() {
				this.drawerTitle = '';
			}
		},
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
		width: 100%;
	}

	.flexDiv {
		display: flex;
		justify-content: space-between;
	}

	.container {
		width: 1200px;
		margin: 0 auto;
	}

	@media(max-width:1200px) {
		.container {
			/* width: 100%; */
		}
	}
</style>
