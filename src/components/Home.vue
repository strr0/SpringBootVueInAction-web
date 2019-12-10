<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header"></el-header>
      <el-container>
        <el-aside width="180px" class="home-aside">
          <div>
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
          </div>
        </el-aside>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.state.user;
      },
      routes() {
        return this.$store.state.routes;
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
        background-color: #20a0ff;
        color: #333;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: content-box;
        padding: 0;
    }
    .home-aside {
        background-color: #ECECEC;
    }
</style>