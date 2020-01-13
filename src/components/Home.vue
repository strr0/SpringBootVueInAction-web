<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <div class="title">微人事</div>
      <div>
        <el-dropdown class="user-info" @command="commandHandler">
          <span class="el-dropdown-link">{{user.name}}<i><img :src="user.userface" alt="" /></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="180px" class="home-aside">
        <el-menu unique-opened router>
          <template v-for="(item, index) in this.routes">
            <el-submenu :key="index" :index="index+''">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item width="180px" v-for="child in item.children" :index="child.path" :key="child.path">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="this.$router.currentRoute.path=='/home'">
          欢迎来到微人事！
        </div>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        user: JSON.parse(window.sessionStorage.getItem("user"))
      }
    },
    computed: {
      routes() {
        return this.$store.state.routes;
      }
    },
    methods: {
      commandHandler(cmd) {
        if (cmd == 'logout') {
          this.$confirm('此操作将注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getRequest("/logout");
            window.sessionStorage.removeItem("user")
            this.$store.commit('initMenu', []);
            this.$router.replace("/");
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }
      }
    }
  }
</script>

<style>
    .home-container {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .home-header {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }
    .home-header .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff
    }
    .home-header .user-info {
        cursor: pointer;
    }
    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
    .home-aside {
        background-color: #ECECEC;
    }
</style>