<template>
  <div class="custom-select">
    <select v-model="selectedOption" @change="onOptionChange">
      <option 
        v-for="option in options" 
        :key="option" 
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const { activeValue, defaultValue, options } = defineProps({
  activeValue: {
    type: Number,
    required: false
  },
  defaultValue: {
    type: Number,
    default: 20,
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:selectedOption'])

const selectedOption = ref(activeValue);

const onOptionChange = (event) => {
  selectedOption.value = event.target.value;
  emit('update:selectedOption', selectedOption.value);
};

</script>

<style scoped>
.custom-select {
  width: auto;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-select select {
  width: 100%;
  height: 100%;
  padding: 8px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  border: none;
  box-shadow: none;
  outline: none;
}
</style>