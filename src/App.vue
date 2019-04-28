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
			<LoginForm v-if="drawerContent=='LoginForm'"></LoginForm>
			<RegisterForm v-else></RegisterForm>
		</Drawer>
		<Modal v-model="modalShow" :title="modalTitle" @on-ok="modalOk" @on-cancel="modalCancel">
			<ForgetPassword v-if="modalContent=='ForgetPassword'"></ForgetPassword>
		</Modal>
	</div>
</template>

<script>
	import OJHeader from './components/OJHeader.vue'
	import OJFooter from './components/OJFooter.vue'
	import LoginForm from './components/LoginForm.vue'
	import RegisterForm from './components/RegisterForm.vue'
	import ForgetPassword from './components/ForgetPassword.vue'
	export default {
		name: 'app',
		components: {
			OJHeader,
			OJFooter,
			LoginForm,
			RegisterForm,
			ForgetPassword
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
			drawerContent: function() {
				return this.$store.state.drawerInfo.drawerContent
			},
			modalShow: {
				get: function() {
					return this.$store.state.modalInfo.modalShow
				},
				set: function(val) {
					this.$store.commit('modalChange', val)
				}
			},
			modalTitle: {
				get: function() {
					return this.$store.state.modalInfo.modalTitle
				},
				set: function(val) {
					this.$store.commit('modalTitle', val)
				}
			},
			modalContent: function() {
				return this.$store.state.modalInfo.modalContent
			},
		},
		methods: {
			drawerClose: function() {
				this.drawerTitle = '';
			},
			modalOk:function(){
				
			},
			modalCancel:function(){
				
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
