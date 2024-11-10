<template>
  <div class="flex flex-col">
    <!-- tOP MENU-->
    <TopMenu />
    <main class="flex flex-row">
      <!-- Side Menu -->
      <SideMenu />
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';
</script>
