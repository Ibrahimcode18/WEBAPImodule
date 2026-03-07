<script setup>
  import BlogGrid from './components/BlogGrid.vue'
  //import PlayGroundView from './views/PlayGroundView.vue';
  import { RouterView, RouterLink } from 'vue-router'
  import { Layout, LayoutHeader, LayoutContent, LayoutFooter, Menu, MenuItem } from 'ant-design-vue'
  import { useUserStore } from '@/stores/user' // Import Store

  const userStore = useUserStore()
</script>

<!-- <template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">My Blog</div>
      <div style="color: white; float: right;">Welcome User</div>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px">
      <div class="site-layout-content">
        <h1>Latest Posts</h1>
        <PlayGroundView />
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Web API Development ©2026 Created by You
    </a-layout-footer>
  </a-layout>
</template>

 -->

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">My Blog</div>

      <a-menu theme="dark" mode="horizontal" :selectable="false">
        <a-menu-item key="1"><RouterLink to="/">Home</RouterLink></a-menu-item>

        <template v-if="!userStore.user.loggedIn">
          <a-menu-item key="2"><RouterLink to="/login">Login</RouterLink></a-menu-item>
          <a-menu-item key="3"><RouterLink to="/register">Register</RouterLink></a-menu-item>
        </template>

        <template v-else>
          <a-menu-item key="4">Hello, {{ userStore.user.username }}</a-menu-item>
          <a-menu-item key="5"><RouterLink to="/profile">Profile</RouterLink></a-menu-item>
          <a-menu-item key="6"><RouterLink to="/login" @click="userStore.logout">Logout</RouterLink></a-menu-item>
        </template>
      </a-menu>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px; margin-top: 20px">
      <div class="site-layout-content">
        <RouterView />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Web API Development ©2026 Created by You
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
  /* Specific overrides for Ant Design components */
  .site-layout-content {
  background: #fff;
  padding: 24px;
  min-height: 280px;
  margin-top: 24px;
  }
  .logo {
  float: left;
  width: 120px;
  height: 31px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 64px; /* Vertically center in header */
  }
</style>