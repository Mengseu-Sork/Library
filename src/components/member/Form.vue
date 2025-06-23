<template>
  <form @submit.prevent="onSubmit" class="mb-6 space-y-3">
    <input v-model="form.name" type="text" placeholder="Name" class="border p-2 w-full rounded" required />
    <input v-model="form.age" type="number" placeholder="Age" class="border p-2 w-full rounded" required />
    <input v-model="form.email" type="email" placeholder="Email" class="border p-2 w-full rounded" required />
    <input v-model="form.password" type="password" placeholder="Password" class="border p-2 w-full rounded" required />
    
    <div class="flex gap-4 items-center">
      <Button
        :label="isEditing ? 'Update Member' : 'Add Member'"
        color="blue"
        type="submit"
      />

      <Button
        v-if="isEditing"
        label="Cancel"
        color="red"
        @click="cancelEdit"
      />
    </div>
  </form>
</template>


<script setup>
import { ref, watch } from "vue";
import { toRefs } from "vue";

const props = defineProps({
  formData: Object,
  isEditing: Boolean,
});

const emits = defineEmits(["submitForm", "cancelEdit"]);
const form = ref({ name: "", age: "", email: "", password: "" });

watch(
  () => props.formData,
  (newVal) => {
    form.value = { ...newVal };
  },
  { immediate: true }
);

const onSubmit = () => {
  emits("submitForm", form.value);
};

const cancelEdit = () => {
  emits("cancelEdit");
};
</script>
