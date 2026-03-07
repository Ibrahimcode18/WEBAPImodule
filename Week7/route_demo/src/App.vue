<script setup></script>

<template>
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">

    <nav style="padding: 20px; background: #e0e0e0; margin-bottom: 20px; border-radius: 8px;">
      <router-link to="/" style="margin-right: 15px; font-weight: bold;">Home</router-link>
      <router-link to="/about" style="font-weight: bold;">About</router-link>
    </nav>
    <main style="border: 2px dashed #aaa; padding: 20px; min-height: 200px;">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
