<script setup lang="ts">
import AccordionExample from '@/components/examples/accordion-example';
import AlertExample from '@/components/examples/alert-example';
import MainPageLayout from '@/layouts/main-page-layout/MainPageLayout.vue';
import DropdownMenuExample from '@/components/examples/dropdown-menu-example';
import AspectRatioExample from '@/components/examples/aspect-ratio-example';
import AvatarExample from '@/components/examples/avatar-example';
import BadgeExample from '@/components/examples/badge-example';
</script>

<template>
  <MainPageLayout additionalClass="flex flex-col gap-7 items-center justify-center">
    <section id="accordions" class="flex flex-col items-center justify-center">
      <h2>Accordions</h2>
      <AccordionExample />
    </section>
    <section id="alerts" class="flex flex-col items-center justify-center gap-5">
      <h2>Alerts</h2>
      <div class="flex gap-5 justify-center items-center">
        <AlertExample />
      </div>
    </section>
    <section id="dropdown-menus" class="flex flex-col items-center justify-center gap-5">
      <h2>Alerts</h2>
      <div class="flex gap-5 justify-center items-center">
        <DropdownMenuExample />
      </div>
    </section>
    <section id="aspect-ratio" class="flex flex-col items-center justify-center gap-5">
      <h2>Aspect Ratio</h2>
      <div class="flex gap-5 justify-center items-center w-[450px]">
        <AspectRatioExample />
      </div>
    </section>
    <section id="avatar" class="flex flex-col items-center justify-center gap-5">
      <h2>Avatar</h2>
      <div class="flex gap-5 justify-center items-center w-[450px]">
        <AvatarExample />
      </div>
    </section>
    <section id="badge" class="flex flex-col items-center justify-center gap-5">
      <h2>Badge</h2>
      <div class="flex gap-5 justify-center items-center w-[450px]">
        <BadgeExample />
      </div>
    </section>
  </MainPageLayout>
</template>
