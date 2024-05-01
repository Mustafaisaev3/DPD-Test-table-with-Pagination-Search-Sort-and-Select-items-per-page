<template>
  <div 
    class="table-row__container" 
    @dragenter="dragged = true, disableChildPointerEvent = true"  
    @dragleave="dragged = false" 
    @dragend="disableChildPointerEvent = false"
    draggable="true"
    :class="{'stop-child-drag': disableChildPointerEvent}"
  >
    <div :class="'table-row', header ? 'header' : ''" :style="{'grid-template-columns': columnTemplates, maxHeight, height }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  columnTemplates: {
    type: String,
    required: false
  },
  maxHeight: {
    type: String,
    required: false
  },
  height: {
    type: String,
    required: false
  },
  header: {
    type: Boolean,
    required: false
  },
})

const dragged = ref(false)
const disableChildPointerEvent = ref(false)
</script>

<style lang="scss" scoped>

.table-row__container.stop-child-drag {
  * {
    pointer-events: none;
  }
}

.table-row {
  position: relative;
  display: grid;
  align-items: center;
  cursor: pointer;
}

.table-row:last-child{
  border-bottom: none;
}

</style>