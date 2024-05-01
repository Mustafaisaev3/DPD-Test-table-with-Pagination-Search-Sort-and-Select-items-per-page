<template>
  <div class="logistic">
    <div class="logistic__inner">
      <div class="card">
        <div style="width: 100%; padding: 8px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <Input placeholder="поиск" v-model="seacrQueryValue" />
          </div>
          <div class="perpage-wrapper">
            <p>На странице:</p>
            <Select 
              v-model="itemsPerPageValue" 
              @update:selectedOption="handleChangeItemsPerPage" 
              :defaultValue="20"
              :activeValue="route.query.perPage" 
              :options="[5, 10, 15, 20]" 
            />
          </div>
        </div>
        <SortableTable 
          :users="data" 
          :pagination="pagination" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import Select from '@/components/ui/Select.vue';
import SortableTable from '@/components/SortableTable.vue'
import Users from '@/data/api.json'
import { useData } from '@/composables/useData.ts'

let { results: users } = Users

const route = useRoute()
const router = useRouter()

let data = ref()
let pagination = ref()

const itemsPerPageValue = ref(null)
const seacrQueryValue= ref(null)

let response = useData(users, route.query)
data = response.data
pagination = response.pagination

const handleChangeItemsPerPage = (value) => {

  const updatedQuery = {
    ...route.query,
    perPage: value
  }

  router.replace({
    path: route.path, 
    query: updatedQuery
  })
}

watch(route, () => {
  const response = useData(users, route.query)
  data = response.data
  pagination = response.pagination

}, { deep: true });

watch(seacrQueryValue, () => {
  const updatedQuery = {
    ...route.query,
    page: 1,
    q: seacrQueryValue.value
  }

  router.replace({
    path: route.path, 
    query: updatedQuery
  })
})

</script>


<style scoped lang="scss">
.logistic  {
  width: 100%;
  height: auto;
  padding: 25px;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 25px;

      .title {
        font-family: MyriadPro;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 26px;
        letter-spacing: normal;
        color: #000;
      }
  }

  &__tabs {
    display: flex;
    justify-content: space-between;

    & .settings {
      margin-right: 15px;
    }
  }

  .add-item {
    // margin-top: 50px;
    padding: 20px 25px;
  }
}

.perpage-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;

  & > p {
    font-size: 14px;
  }
}
</style>