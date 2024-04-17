<script setup lang="ts">
import ThemeToggle from '@/components/theme-toggle';
import Sidebar from '@/components/sidebar';
</script>

<template>
  <header class="flex justify-end items-center p-4">
    <div class="md:hidden lg:hidden xl:hidden">
      <Sidebar />
    </div>
    <ThemeToggle />
  </header>
</template>
