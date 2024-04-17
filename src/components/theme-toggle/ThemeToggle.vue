<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mode = useColorMode({ initialValue: 'dark' });

const changeColorMode = (modeToChange: 'light' | 'dark' | 'auto') => {
  mode.value = modeToChange;
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        <Icon
          icon="radix-icons:moon"
          class="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0"
        />
        <Icon
          icon="radix-icons:sun"
          class="absolute h-[1.2rem] w-[1.2rem] dark:rotate-90 dark:scale-0 transition-all rotate-0 scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="changeColorMode('light')"> Light </DropdownMenuItem>
      <DropdownMenuItem @click="changeColorMode('dark')"> Dark </DropdownMenuItem>
      <DropdownMenuItem @click="changeColorMode('auto')"> System </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
