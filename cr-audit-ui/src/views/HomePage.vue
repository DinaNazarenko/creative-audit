<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userInfo'
import { ref } from 'vue'

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
  <div v-auto-animate>
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
            class="nav-link py-3 border-bottom rounded-0 li_active_custom li_custom"
            aria-current="page"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            aria-label="Home"
            data-bs-original-title="Home"
          >
            <svg
              class="bi pe-none"
              width="24"
              height="24"
              role="img"
              aria-label="Home"
            >
              <use xlink:href="#home"></use>
            </svg>
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
              class="bi pe-none"
              width="24"
              height="24"
              role="img"
              aria-label="Dashboard"
            >
              <use xlink:href="#speedometer2"></use>
            </svg>
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
              class="bi pe-none"
              width="24"
              height="24"
              role="img"
              aria-label="Orders"
            >
              <use xlink:href="#table"></use>
            </svg>
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
          <img
            src="/avatar.png"
            alt="mdo"
            width="24"
            height="24"
            class="rounded-circle"
          />
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
  </div>
</template>

<style scoped>
@import '../assets/main.css';
.li_active_custom {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
}

.li_custom {
  height: 78px;
}

.dropdown-item:active {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
}
</style>
