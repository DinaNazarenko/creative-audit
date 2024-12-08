<script setup>
const sceletonArray = Array(13)
  .fill()
  .map((_, i) => i + 1)
</script>
<template>
  <tbody>
    <tr class="placeholder-wave" v-for="item in sceletonArray" :key="item">
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
      <td><span class="placeholder col-12"></span></td>
    </tr>
  </tbody>
</template>
<style scoped>
@import '../../assets/main.css';
td {
  height: 41px;
  padding-right: 24px;
  padding-bottom: 6px;
  padding-top: 6px;
}
span {
  height: 24px;
  border-radius: 8px;
  background-color: #e9ecef;
}
</style>
