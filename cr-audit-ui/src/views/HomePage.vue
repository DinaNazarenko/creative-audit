<script setup>
import TableForm from '@/components/HomePage/TableForm.vue'
import SideBar from '@/components/HomePage/SideBar.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
</script>
<template>
  <div v-auto-animate class="d-flex flex-nowrap">
    <SideBar />
    <div class="table_custom">
      <h2>Креативы</h2>
      <ul class="nav nav-underline nav_custom">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"
            >На проверке
            <span class="badge text-bg-danger rounded-circle">3</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Проверено</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Все</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <div class="relative">
          <SearchIcon />
          <input
            class="form-control me-2"
            type="search"
            placeholder="Поиск по таблице"
            aria-label="Search"
          />
        </div>
      </form>
      <button class="btn btn_custom">
        <DownloadIcon />
        CSV
      </button>
      <TableForm />
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
    </div>
  </div>
</template>

<style scoped>
@import '../assets/main.css';
.table_custom {
  padding: 32px !important;
}

.nav_custom {
  padding-bottom: 32px !important;
}

.btn_custom {
  color: var(--custom-color);
  border-color: var(--custom-color);
}
</style>
