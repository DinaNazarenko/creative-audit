<script setup>
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
</script>
<template>
  <footer
    class="d-flex justify-content-between text-center bg-white footer_custom"
  >
    <div class="d-flex justify-content-center align-items-center">
      <div class="text-gray-600 div_custom">Строк на странице</div>
      <select class="form-select py-1 px-2" aria-label="Default select example">
        <option class="option_custom" value="1">20</option>
        <option class="option_custom" value="2">50</option>
        <option class="option_custom" value="3">Все</option>
      </select>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="div_custom">Показано 1-4 из 4</div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end m-0">
          <li class="page-item">
            <a class="page-link py-1 px-2">
              <ChevronLeftIcon />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link py-1 px-2" href="#">1</a>
          </li>
          <li class="page-item">
            <a class="page-link py-1 px-2" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link py-1 px-2" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link py-1 px-2" href="#">
              <ChevronRightIcon />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
<style scoped>
@import '../../assets/main.css';
.footer_custom {
  height: 56px !important;
  padding-top: 12px;
  padding-left: 32px;
  padding-bottom: 13px;
  padding-right: 32px;
}
select {
  width: 60px;
  height: 34px;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer !important;
}
option {
  font-size: 12px;
  line-height: 18px;
}
.option_custom:active {
  background-color: var(--custom-color) !important;
  border-color: var(--custom-color) !important;
}
a {
  height: 34px !important;
}
a:active,
a:focus {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
.div_custom {
  margin-right: 12px;
  color: #6c757d;
  font-size: 14px;
  line-height: 22px;
}
:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
</style>
