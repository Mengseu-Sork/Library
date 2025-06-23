<template>
  <button
    :class="buttonClasses"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
  label: { type: String, required: true },
  color: { type: String, default: 'blue' }
})

const colors = {
  blue: {
    base: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    focusRing: 'focus:ring-blue-400',
  },
  red: {
    base: 'bg-red-500',
    hover: 'hover:bg-red-600',
    focusRing: 'focus:ring-red-400',
  },
  green: {
    base: 'bg-green-500',
    hover: 'hover:bg-green-600',
    focusRing: 'focus:ring-green-400',
  },
  yellow: {
    base: 'bg-yellow-400',
    hover: 'hover:bg-yellow-500',
    focusRing: 'focus:ring-yellow-300',
  }
}

const buttonClasses = computed(() => {
  const colorClasses = colors[props.color] || colors.blue
  return [
    'px-6 py-3 text-white font-semibold rounded-lg shadow-md',
    colorClasses.base,
    colorClasses.hover,
    'focus:outline-none focus:ring-2 focus:ring-opacity-75',
    colorClasses.focusRing,
    'transition duration-300',
  ].join(' ')
})
</script>
