<template>
  <div class="table-wrapper">
    <div class="table">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  head: {
    type: Array,
    required: false
  },
  columnTemplates: {
    type: String,
    required: false
  },
})
</script>

<style scoped>
.table {
  background-color: #fff;
  width: 100%;
}

.table-wrapper {
  display: flex;
  justify-content: center;
}

.table-head {
  display: grid;
  align-items: center;
  border-top: 1px solid #eeeff1;
  border-bottom: 1px solid #eeeff1;

}

.table-head__name {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: MyriadPro;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
  cursor: pointer;
  border-right: 1px solid #eeeff1;
  padding: 5px 14px;
}

</style>