<template>
  <Header :style="{padding: '0'}">
    <Menu
      mode="horizontal"
      :active-name="menuactive"
      :style="{width: '100%' , height:'100%'}"
    >
      <router-link to="/">
        <MenuItem name="/">
          <Icon type="ios-paper" />
          CodeOJ
        </MenuItem>
      </router-link>
      <router-link to="/problem">
        <MenuItem name="/problem">
          <Icon type="ios-people" />
          问题
        </MenuItem>
      </router-link>
      <router-link to="/status">
        <MenuItem name="/status">
          <Icon type="ios-people" />
          状态
        </MenuItem>
      </router-link>
      <router-link to="/ai">
        <MenuItem name="/ai">
          <Icon type="ios-people" />
          对战
        </MenuItem>
      </router-link>
      <router-link to="/rank">
        <MenuItem name="/rank">
          <Icon type="ios-people" />
          排名
        </MenuItem>
      </router-link>
      <Submenu name="/discuss">
        <template slot="title">
          <Icon type="ios-stats" />
          社区
        </template>
        <router-link to="/blog">
          <MenuItem name="/blog">
            博客
          </MenuItem>
        </router-link>
        <router-link to="/bbs">
          <MenuItem name="/bbs">
            论坛
          </MenuItem>
        </router-link>
      </Submenu>
      <Submenu name="/contest">
        <template slot="title">
          <Icon type="ios-stats" />
          竞赛
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">
            新增和启动
          </MenuItem>
          <MenuItem name="3-2">
            活跃分析
          </MenuItem>
          <MenuItem name="3-3">
            时段分析
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">
            用户留存
          </MenuItem>
          <MenuItem name="3-5">
            流失用户
          </MenuItem>
        </MenuGroup>
      </Submenu>
      <router-link to="/help">
        <MenuItem name="/help">
          <Icon type="ios-people" />
          帮助
        </MenuItem>
      </router-link>
      <div class="nav-profile">
        <Submenu name="/profile">
          <template slot="title">
            <Icon type="ios-people" />
            {{ user }}
          </template>
          <MenuItem name="/login">
            登录
          </MenuItem>
          <MenuItem name="/register">
            注册
          </MenuItem>
        </Submenu>
      </div>
    </Menu>
  </Header>
</template>

<script>
	export default {
		name: 'Ojheader',
		data () {
			return {
				menuactive: this.$route.path,
				user: '用户'
			}
		},
		watch: {
			'$route' () {
				this.menuactive = this.$route.path
			}
		}
	}
</script>

<style scoped>
	.background-box {
		background-color: #FFFFFF;
		box-shadow: 0 2px 3px 2px rgba(0, 0, 0, .1);
	}
	.nav-profile{
		float: right;
	}
</style>
