<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

defineProps<{ additionalClass?: ClassValue[] | ClassValue }>();
</script>

<template>
  <ScrollArea className="main-page-layout">
    <main :class="cn(additionalClass)">
      <slot />
    </main>
  </ScrollArea>
</template>

<style lang="scss" src="./main-page-layout.scss"></style>
