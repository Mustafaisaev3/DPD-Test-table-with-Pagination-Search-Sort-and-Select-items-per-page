<template>
  <div class='pagination-wrapper'>
    <nav class='pagination'>
      <ul class='pagination__list'>
          <li v-if="hasPrevPage" class="pagination__list-prev">
            <li @click="() => goToPage(currentPage - 1)">
              <span class='pagination__item'>
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="10" height="10" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"/></svg>
              </span>
            </li>
            <li @click="() => goToPage(currentPage - 1)">
              <span class='pagination__item'>{{ currentPage - 1 }}</span>
            </li>
          </li>

          <li>
            <span class='pagination__item active'>{{ currentPage }}</span>
          </li>

          <li v-if="hasNextPage" class="pagination__list-prev">
            <li @click="() => goToPage(currentPage + 1)">
              <span class='pagination__item'>{{ currentPage + 1 }}</span>
            </li>
            <li @click="() => goToPage(currentPage + 1)">
              <span class='pagination__item'>
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="10" height="10" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"/></svg>
              </span>
            </li>
          </li>
           
          <li class="pagination__toPage">
            <div>
              {{ currentPage }} / {{pageCount}}
            </div>
            <Input v-model="GoToPageInputValue" type="number" :min="1" :max="pageCount" />
            <Button @click="goToPage(GoToPageInputValue)">
              Перейти
            </Button>
          </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Input from './ui/Input.vue';
import Button from '@/components/ui/Button.vue';

const GoToPageInputValue = ref()

const route = useRoute()
const router = useRouter()

const { hasPrevPage, hasNextPage, pageCount, currentPage } = defineProps(['hasPrevPage', 'hasNextPage', 'pageCount', 'currentPage'])

const goToPage = (page: number) => {
  let currentQuery = route.query

  let targetPage = page > pageCount ? 1 : page

  const updatedQuery: any = {
    ...currentQuery,
    page: targetPage
  }

  router.replace({
    path: route.path, 
    query: updatedQuery
  })
}

</script>


<style lang="scss" scoped>
.pagination-wrapper {
  margin: 10px 0px;
}

.pagination {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    align-items: center;
    list-style: none;
    gap: 20px;

    &-prev {
      display: flex;
      gap: 20px;
    }
  }

  &__item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 30px;
    width: 30px;
    padding: 0;
    text-decoration: none;
    background-color: #fff;
    color: #2f2f2f;
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:hover {
      border: 1px solid #2f8cff;
    }

    &.active {
      background-color: #2f8cff;
      border: 1px solid #2f8cff;
      color: white;
    }
  }

  &__toPage {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 20px;

    & > input {
      width: 80px;
    }
  }
}
</style>