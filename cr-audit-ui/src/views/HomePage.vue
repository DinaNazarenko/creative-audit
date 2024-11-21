<script setup>
import TableForm from '@/components/HomePage/TableForm.vue'
import SideBar from '@/components/HomePage/SideBar.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import FooterForm from '@/components/HomePage/FooterForm.vue'
import { GROUP_FIELDS } from '@/lib/constants'
import { onMounted, ref, reactive, watch } from 'vue'
import debounce from 'lodash.debounce'
import axios from 'axios'

const creatives = ref([])
const fields = ref([])
const pendingCreativesCount = ref(0)

const filters = reactive({
  sortBy: 'idApplication',
  status: 'На проверке',
  searchQuery: '',
  urlStatusParam: '',
})

const handleStatusSelection = event => {
  const tempStatus = event.currentTarget.textContent
    .replace(/[0-9]/g, '')
    .trim()

  if (tempStatus === 'На проверке') {
    filters.status = 'На проверке'
    filters.urlStatusParam = ''
  } else if (tempStatus === 'Проверено') {
    filters.status = ''
    filters.urlStatusParam = `?status[]=Согласовано&status[]=Отклонено&status[]=Частично согласовано`
  } else {
    filters.status = ''
    filters.urlStatusParam = ''
  }
}

// const onChangeSelect = (event) => {
//   filters.sortBy = event.target.value
// }

// TODO Время пока не ставлю, тк иначе в поиске лупа не сразу исчезает
const onChangeSearch = debounce(event => {
  filters.searchQuery = event.target.value
})

const getCreatives = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      status: filters.status || undefined,
    }

    if (filters.searchQuery) {
      params.nameAdGroup = `*${filters.searchQuery}*`
    }
    const url =
      filters.urlStatusParam.length > 0
        ? `https://596b6b27365a5903.mokky.dev/creatives${filters.urlStatusParam}`
        : 'https://596b6b27365a5903.mokky.dev/creatives'

    const { data } = await axios.get(url, {
      params,
    })
    if (filters.status === 'На проверке') {
      pendingCreativesCount.value = data.length
    }

    creatives.value = data
    fields.value = [...Object.keys(data[0]).slice(1)].map(
      field => GROUP_FIELDS[field],
    )
  } catch (error) {
    console.error('Ошибка получения креативов:', error.message)
  }
}

onMounted(async () => {
  await getCreatives()
})

watch(filters, getCreatives, pendingCreativesCount)
</script>
<template>
  <div v-auto-animate class="d-flex">
    <SideBar :count="pendingCreativesCount" />
    <div class="d-flex flex-column">
      <div class="container_custom">
        <h2 class="m-0">Креативы</h2>
        <ul class="nav nav-underline nav_custom">
          <li class="nav-item nav_item_custom">
            <a
              @click="handleStatusSelection"
              class="text-decoration-none nav-link px-3 py-2 a_custom"
              href="#"
              >На проверке
              <span class="badge text-bg-danger rounded-circle">{{
                pendingCreativesCount
              }}</span>
            </a>
          </li>
          <li class="nav-item nav_item_custom">
            <a
              @click="handleStatusSelection"
              class="text-decoration-none nav-link px-3 py-2 a_custom"
              href="#"
              >Проверено</a
            >
          </li>
          <li class="nav-item nav_item_custom">
            <a
              @click="handleStatusSelection"
              class="text-decoration-none nav-link px-3 py-2 a_custom"
              href="#"
              >Все</a
            >
          </li>
        </ul>
        <div class="d-flex mb-4">
          <form class="d-flex" role="search">
            <div class="position-relative search_custom">
              <input
                @input="onChangeSearch"
                class="form-control me-2 position-relative rounded-1"
                type="search"
                placeholder="Поиск по таблице"
                aria-label="Search"
              />
              <span
                v-if="!filters.searchQuery"
                class="position-absolute top-50 end-0 translate-middle"
              >
                <SearchIcon />
              </span>
            </div>
          </form>
          <button class="btn btn_custom">
            <DownloadIcon />
            CSV
          </button>
        </div>
        <TableForm :fields="fields" :creatives="creatives" />
      </div>
      <FooterForm />
    </div>
  </div>
</template>

<style scoped>
@import '../assets/main.css';
.container_custom {
  padding-top: 32px;
  padding-right: 32px;
  padding-left: 32px;
  background-color: #f8f9fa;
}
.nav_custom {
  margin-top: 24px !important;
  margin-bottom: 24px !important;
  border-bottom: 2px solid #dee2e6;
}
.nav_item_custom {
  height: 40px;
}
.a_custom {
  color: #6c757d !important;
}
.a_custom:hover {
  box-shadow: var(--focus-box-shadow) !important;
  border-color: var(--custom-color) !important;
  color: var(--custom-color) !important;
}
.btn_custom {
  color: var(--custom-color);
  border-color: var(--custom-color);
}
.search_custom {
  width: 294px;
  height: 38px;
}
:focus {
  box-shadow: var(--focus-box-shadow) !important;
  border-color: var(--custom-color) !important;
  color: var(--custom-color) !important;
}
</style>
