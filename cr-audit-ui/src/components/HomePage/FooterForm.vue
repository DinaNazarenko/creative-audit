<script setup>
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
</script>
<template>
  <footer class="text-center bg-white footer_custom">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item">
          <a class="page-link">
            <ChevronLeftIcon />
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">
            <ChevronRightIcon />
          </a>
        </li>
      </ul>
    </nav>
  </footer>
</template>
<style scoped>
.footer_custom {
    height: 56px !important;
    padding-top: 12px;
    padding-left: 32px;
    padding-bottom: 13px;
    padding-right: 32px;
}
</style>
