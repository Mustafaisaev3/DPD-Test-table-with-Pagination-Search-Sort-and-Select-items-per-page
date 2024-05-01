<template>
    <Table id="sortable" :column-templates="tableSizeColumns">
      <TableHeader>
        <TableRow :column-templates="tableSizeColumns">
          <TableHeaderColumn :align="'center'" :border="true">
            Аватар
          </TableHeaderColumn>
          <TableHeaderColumn :align="'center'" :border="true" :sortColumnString="'name.first'">
            ФИО
          </TableHeaderColumn>
          <TableHeaderColumn :border="true" :sortColumnString="'gender'">
            Пол
          </TableHeaderColumn>
          <TableHeaderColumn :border="true" :sortColumnString="'location.country'">
            Страна
          </TableHeaderColumn>
          <TableHeaderColumn :border="true" :sortColumnString="'dob.age'">
            Дата рождения
          </TableHeaderColumn>
          <TableHeaderColumn :border="true" :sortColumnString="'email'">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn :border="true" :align="'center'" :sortColumnString="'phone'">
            Телефон
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableRow v-for="user in users" :key="user.id" :column-templates="tableSizeColumns">
        <TableColumn :align="'center'">
          <img :src="user.picture.medium" alt="menu">
        </TableColumn>
        <TableColumn :align="'center'">
          {{ user.name.title }} {{ user.name.first }} {{ user.name.lust }}
        </TableColumn>
        <TableColumn >
          {{ user.gender }}
        </TableColumn>
        <TableColumn >
          {{ user.location.country }}
        </TableColumn>
        <TableColumn >
          {{ new Date(user.dob.date).toLocaleDateString('ru-RU') }}
        </TableColumn>
        <TableColumn >
          {{ user.email }}
        </TableColumn>
        <TableColumn :align="'center'">
          {{ user.phone }}
        </TableColumn>
      </TableRow>
      <TableRow :column-templates="'1fr'">
        <Pagination 
          :hasPrevPage="pagination.hasPrevPage"
          :hasNextPage="pagination.hasNextPage"
          :pageCount="pagination.pageCount"
          :currentPage="pagination.currentPage"
        />
      </TableRow>
    </Table>
</template>
<script setup lang="ts">
import Table from './table/Table.vue'
import TableRow from './table/TableRow.vue';
import TableColumn from './table/TableColumn.vue';
import TableHeader from './table/TableHeader.vue'
import TableHeaderColumn from './table/TableHeaderColumn.vue';
import Pagination from './Pagination.vue'


const tableSizeColumns = '100px 2fr 1fr 1fr 2fr 3fr 2fr'

const { users, pagination } = defineProps(['users', 'pagination'])

</script>