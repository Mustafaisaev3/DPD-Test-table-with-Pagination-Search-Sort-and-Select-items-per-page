<template>
  <div 
    class="table-header__column" 
    :style="{'justify-content': align, 'align-items': verticalAlign}"
    @click="handleSortClick"
  >
    <div class="table-header__column-content" :class="{'overflow-x-hidden': overflow_X_hidden}">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

enum SortType {
  ASC = 'ASC',
  DSC = 'DSC'
}

const props = defineProps({
  sortColumnString: {
    type: String,
    required: false
  },
  align: {
    type: String,
    required: false
  },
  verticalAlign: {
    type: String,
    required: false
  },
  overflow_X_hidden: {
    type: Boolean,
    required: false,
    default: true
  },
})

const route = useRoute()
const router = useRouter()

let sortType = ref<SortType>(SortType.ASC)

const handleSortClick = () => {
  sortType.value = sortType.value === SortType.ASC ? SortType.DSC : SortType.ASC

  const updatedQuery = {
    ...route.query,
    sortedCol: props.sortColumnString,
    sorted: sortType.value
  }

  router.replace({
    path: route.path, 
    query: updatedQuery
  })
}
</script>

<style lang="scss" scoped>
.table-header__column {
  height: 100%;
  width: 100%;
  padding: 5px;
  display: flex;
  position: relative;
  border-right: 1px solid #EEEFF4;

  &__content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
  }

}

.table-header__column:last-child{
  border-right: none;
}

</style>