<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import PeopleIcon from '@/components/icons/PeopleIcon.vue'
import ImagesIcon from '@/components/icons/ImagesIcon.vue'
import MegaphoneIcon from '@/components/icons/MegaphoneIcon.vue'
import PersonIcon from '@/components/icons/PersonIcon.vue'
import SidebarLogoIcon from '@/components/icons/SidebarLogoIcon.vue'
import CaretDownFillIcon from '@/components/icons/CaretDownFillIcon.vue'

 defineProps({
  count: Number
})
const router = useRouter()
const isDropdownOpen = ref(false)

const handleLogout = () => {
  localStorage.removeItem('userToken')
  router.push('/')
}

const handleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>
<template>
  <div class="d-flex flex-column flex-shrink-0 bg-body-tertiary vh-100">
    <a
      href="#"
      class="d-block p-3 link-body-emphasis text-decoration-none d-flex align-items-center justify-content-center a_custom"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-original-title="Icon-only"
    >
      <SidebarLogoIcon />
    </a>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="li_custom">
        <a
          href="#"
          class="nav-link py-3 border-bottom rounded-0"
          aria-current="page"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          aria-label="Home"
          data-bs-original-title="Home"
        >
          <ImagesIcon />
          <span
            class="position-absolute translate-middle badge rounded-pill bg-danger"
            >{{count}}</span
          >
          <use xlink:href="#home"></use>
          Креативы
        </a>
      </li>
      <li class="li_custom">
        <a
          href="#"
          class="nav-link py-3 border-bottom rounded-0"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          aria-label="Dashboard"
          data-bs-original-title="Dashboard"
        >
          <PeopleIcon />
          <use xlink:href="#home"></use>
          Аккаунты
        </a>
      </li>
      <li class="li_custom">
        <a
          href="#"
          class="nav-link py-3 border-bottom rounded-0"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          aria-label="Orders"
          data-bs-original-title="Orders"
        >
          <MegaphoneIcon />
          <use xlink:href="#home"></use>
          Отчёты
        </a>
      </li>
    </ul>
    <div class="dropdown border-top">
      <a
        href="#"
        class="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none show a_custom"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="handleDropdown"
      >
        <PersonIcon />
        <CaretDownFillIcon />
      </a>
      <ul
        v-if="isDropdownOpen"
        class="dropdown-menu text-small shadow show dropdown-menu-custom"
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
</template>
<style scoped>
@import '../../assets/main.css';
.li_custom {
  width: 91px;
  height: 78px;
  padding: 0;
  font-size: 12px;
  line-height: 18px;
}
a {
  color: black;
}
a:hover,
a:active {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
.dropdown-menu-custom {
  min-width: 91px !important;
}
.dropdown-item {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}
.dropdown-item:active {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
}
span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-weight: 400;
  font-size: 12px;
  padding: 0;
}
.a_custom:hover,
.a_custom:active {
  background-color: initial !important;
  border-color: initial !important;
  color: initial !important;
}
</style>
