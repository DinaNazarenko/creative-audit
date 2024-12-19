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
  count: Number,
})
const router = useRouter()
const activeItem = ref('Креативы')

function setActive(item) {
  activeItem.value = item
}

function isActive(item) {
  return activeItem.value === item
}

const handleLogout = () => {
  localStorage.removeItem('userToken')
  router.push('/')
}
</script>
<template>
  <div
    class="d-flex flex-column flex-shrink-0 bg-body-tertiary vh-100 sidebar_custom"
  >
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="li_custom">
        <a
          href="#"
          class="d-block p-3 border-bottom a_custom"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Icon-only"
        >
          <SidebarLogoIcon />
        </a>
      </li>
      <li class="li_custom">
        <a
          href="#"
          class="nav-link py-3 border-bottom rounded-0"
          aria-current="page"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          aria-label="Home"
          data-bs-original-title="Home"
          @click="setActive('Креативы')"
          :class="{ active: isActive('Креативы') }"
        >
          <ImagesIcon />
          <span
            class="position-absolute translate-middle badge text-bg-danger rounded-pill"
            >{{ count }}</span
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
          @click="setActive('Аккаунты')"
          :class="{ active: isActive('Аккаунты') }"
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
          @click="setActive('Отчёты')"
          :class="{ active: isActive('Отчёты') }"
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
        class="dropdown-toggle d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none a_custom"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <PersonIcon />
        <CaretDownFillIcon />
      </a>
      <ul class="dropdown-menu text-small dropdown-menu-custom">
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
.sidebar_custom {
  background-color: #ffffff !important;
}
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
.active,
a:active,
a:focus,
.dropdown-item:active {
  background-color: var(--custom-color) !important;
  border-color: var(--custom-color) !important;
  color: white !important;
}
.dropdown-menu-custom {
  min-width: 91px !important;
  position: absolute;
  inset: auto auto 0px 0px;
  margin: 0px;
  transform: translate(0px, -58px);
}
.dropdown-item {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
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
.a_custom:active,
.a_custom:focus {
  background-color: initial !important;
  color: initial !important;
}
.a_custom::after {
  content: none;
}
</style>
