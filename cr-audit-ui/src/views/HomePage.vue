<script setup>
import TableForm from '@/components/HomePage/TableForm.vue'
import SideBar from '@/components/HomePage/SideBar.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import { GROUP_FIELDS } from '@/lib/constants'
import { onMounted, ref, reactive, watch } from 'vue'
import debounce from 'lodash.debounce'
import axios from 'axios'

const creatives = ref([])
const fields = ref([])

const filters = reactive({
  sortBy: 'idApplication',
  searchQuery: '',
})

// const onChangeSelect = (event) => {
//   filters.sortBy = event.target.value
// }

// TODO Время пока не ставлю, тк иначе в поиске лупа не сразу исчезает
const onChangeSearch = debounce(event => {
  filters.searchQuery = event.target.value
})

const fetchCreatives = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }
    if (filters.searchQuery) {
      params.nameAdGroup = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(
      `https://596b6b27365a5903.mokky.dev/creatives`,
      {
        params,
      },
    )
    creatives.value = data
    fields.value = [...Object.keys(data[0]).slice(1)].map(
      field => GROUP_FIELDS[field],
    )
  } catch (error) {
    console.error('Ошибка получения креативов:', error.message)
  }
}

onMounted(async () => {
  await fetchCreatives()
})

watch(filters, fetchCreatives)
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
        <div class="position-relative search_custom">
          <input
            @input="onChangeSearch"
            class="form-control me-2 position-relative rounded-1"
            type="search"
            placeholder="Поиск по таблице"
            aria-label="Search"
          />
          <span v-if="!filters.searchQuery" class="position-absolute top-50 end-0 translate-middle">
            <SearchIcon />
          </span>
        </div>
      </form>
      <button class="btn btn_custom">
        <DownloadIcon />
        CSV
      </button>
      <TableForm :fields="fields" :creatives="creatives" />
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
.search_custom {
  width: 294px;
  height: 38px;
}
:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
</style>
