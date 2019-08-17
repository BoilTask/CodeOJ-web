<template>
  <div id="app">
    <div id="show-bg" :style="{opacity:opacity}" v-on:click="bgShow"><Icon type="md-bulb" :size="24" style="color:#fff;padding: 8px 12px;"/></div>
    <div :class="showClass">
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
    data() {
      return {
        showClass: '',
        showFlag: true,
        opacity: 0.6
      }
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
      modalOk: function() {

      },
      modalCancel: function() {

      },
      bgShow: function() {
        if (this.showFlag) {
          this.showClass = 'hidden'
          this.showFlag = false
          this.opacity = 0.1
        } else {
          this.showClass = 'show'
          this.showFlag = true
          this.opacity = 0.6
        }
      }
    }
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

  body {
    background: url(//random.52ecy.cn/randbg.php) no-repeat fixed center;
    background-size: cover;
  }

  #show-bg {
    width: 48px;
    height: 40px;
    bottom: 80px;
    right: 30px;
    position: fixed;
    z-index: 1000;
    border-radius: 2px;
    cursor: pointer;
    background-color: #000;
  }

  .hidden {
    animation-name: hidden;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes hidden {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .show {
    animation-name: show;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
