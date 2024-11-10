<template>
  <button @click="$emit('click')" :class="['btn btn-circle btn-secondary fixed', position]">
    <!-- Recibe la prop que se le pasa desde el componente hijo -->
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
});

defineEmits(['click']);
</script>

<style scoped>
.top-left {
  @apply top-10 left-10;
}
.top-right {
  @apply top-10 right-10;
}
.bottom-left {
  @apply bottom-10 left-10;
}
.bottom-right {
  @apply bottom-10 right-10;
}
</style>
