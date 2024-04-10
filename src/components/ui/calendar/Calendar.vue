<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { Calendar } from 'v-calendar';
import { DatePicker } from 'v-calendar';
import { computed, nextTick, onMounted, ref, useSlots } from 'vue';
import { isVCalendarSlot } from '.';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

/* Extracted from v-calendar */
type DatePickerModel = DatePickerDate | DatePickerRangeObject;
type DateSource = Date | string | number;
type DatePickerDate = DateSource | Partial<SimpleDateParts> | null;
interface DatePickerRangeObject {
  start: Exclude<DatePickerDate, null>;
  end: Exclude<DatePickerDate, null>;
}
interface SimpleDateParts {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | Date | DatePickerModel;
    modelModifiers?: object;
    columns?: number;
    type?: 'single' | 'range';
  }>(),
  {
    type: 'single',
    columns: 1,
  },
);

const emits = defineEmits<{
  (e: 'update:modelValue', payload: typeof props.modelValue): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
});

const datePicker = ref<InstanceType<typeof DatePicker>>();
// @ts-expect-error in this current version of v-calendar has the calendaRef instance, which is required to handle arrow nav.
const calendarRef = computed<InstanceType<typeof Calendar>>(() => datePicker.value.calendarRef);

const handleNav = (direction: 'prev' | 'next') => {
  if (!calendarRef.value) return;
  if (direction === 'prev') calendarRef.value.movePrev();
  else calendarRef.value.moveNext();
};

onMounted(async () => {
  await nextTick();
  if (modelValue.value instanceof Date && calendarRef.value)
    await calendarRef.value.focusDate(modelValue.value);
});

const $slots = useSlots();

const vCalendarSlots = computed(() => {
  return Object.keys($slots)
    .filter((name) => isVCalendarSlot(name))
    .reduce((obj: Record<string, any>, key: string) => {
      obj[key] = $slots[key];
      return obj;
    }, {});
});
</script>

<template>
  <div class="relative">
    <div
      v-if="$attrs.mode !== 'time'"
      class="absolute flex justify-between w-full px-4 top-3 z-[1]"
    >
      <button
        :class="
          cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          )
        "
        type="button"
        @click="handleNav('prev')"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button
        :class="
          cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          )
        "
        type="button"
        @click="handleNav('next')"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>

    <DatePicker
      ref="datePicker"
      v-bind="$attrs"
      v-model="modelValue"
      :model-modifiers="modelModifiers"
      class="calendar"
      trim-weeks
      :transition="'none'"
      :columns="columns"
    >
      <template v-for="(_, slot) of vCalendarSlots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>

      <template #nav-prev-button>
        <ChevronLeft />
      </template>

      <template #nav-next-button>
        <ChevronRight />
      </template>
    </DatePicker>
  </div>
</template>
