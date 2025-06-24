<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div >
      <button 
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-900" 
        @click="$emit('close')"
        aria-label="Close modal"
      >
        ✕
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

