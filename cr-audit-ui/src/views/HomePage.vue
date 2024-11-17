<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userInfo'
import { ref } from 'vue'
import TableForm from '@/components/TableForm.vue'

const isDropdownOpen = ref(false)

const router = useRouter()
const userStore = useUserStore()
userStore.setUser({
  token: '',
  user_id: '',
  email: '',
})

const handleLogout = () => {
  localStorage.removeItem('userToken')
  router.push('/')
}

const handleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>
<template>
  <div v-auto-animate class="d-flex flex-nowrap">
    <h1 class="visually-hidden">Sidebars examples</h1>

    <div
      class="d-flex flex-column flex-shrink-0 bg-body-tertiary vh-100"
      style="width: 91px"
    >
      <a
        href="#"
        class="d-block p-3 link-body-emphasis text-decoration-none d-flex align-items-center justify-content-center"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        data-bs-original-title="Icon-only"
      >
        <img
          class="bi pe-none"
          width="40px"
          height="40px"
          src="/Vector.png"
          alt="sidebar_logo"
        />
        <span class="visually-hidden">Icon-only</span>
      </a>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
          <a
            href="#"
            class="nav-link py-3 border-bottom rounded-0 li_active_custom"
            aria-current="page"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            aria-label="Home"
            data-bs-original-title="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-images"
              viewBox="0 0 16 16"
            >
              <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              <path
                d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"
              />
            </svg>
            <use xlink:href="#home"></use>
            Креативы
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link py-3 border-bottom rounded-0 li_custom"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            aria-label="Dashboard"
            data-bs-original-title="Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
              />
            </svg>
            <use xlink:href="#home"></use>
            Аккаунты
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link py-3 border-bottom rounded-0 li_custom"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            aria-label="Orders"
            data-bs-original-title="Orders"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-megaphone"
              viewBox="0 0 16 16"
            >
              <path
                d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z"
              />
            </svg>
            <use xlink:href="#home"></use>
            Отчёты
          </a>
        </li>
      </ul>
      <div class="dropdown border-top">
        <a
          href="#"
          class="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle show"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click="handleDropdown"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-person-circle svg_custom"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              ></path>
            </svg>
        </a>
        <ul
          v-if="isDropdownOpen"
          class="dropdown-menu text-small shadow show"
          style="
            position: absolute;
            inset: auto auto 0px 0px;
            margin: 0px;
            transform: translate(0px, -58px);
          "
          data-popper-placement="top-start"
          data-popper-reference-hidden=""
        >
          <li><a class="dropdown-item" href="#">Настройки</a></li>
          <li><a class="dropdown-item" href="#">Профиль</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a @click="handleLogout" class="dropdown-item" href="#">Выйти</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="table_custom">
      <h2>Креативы</h2>
      <ul class="nav nav-underline nav_custom">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"
            >На проверке
            <span class="badge text-bg-danger rounded-circle">3</span></a
          >
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
            />
          </svg>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Поиск по таблице"
            aria-label="Search"
          />
        </div>
      </form>
      <button class="btn btn_custom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-download"
          viewBox="0 0 16 16"
        >
          <path
            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
          />
          <path
            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
          />
        </svg>
        CSV
      </button>
      <TableForm />
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item">
            <a class="page-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/main.css';
a {
  color: black;
}

.dropdown-item:active {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
}
a:hover,
a:active {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}

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
