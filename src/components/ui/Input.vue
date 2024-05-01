<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped lang="scss">
input {
  width: 100%;
  padding: 10px 15px;
  border-radius: 5px;
  border: solid 1px #ccc;
  background-color: #fff;
}
</style>
  