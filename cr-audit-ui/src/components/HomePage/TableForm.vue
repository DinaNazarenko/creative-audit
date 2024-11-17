<script setup>
// import { v4 as uuidv4 } from "uuid";

defineProps({
  fields: Array,
  creatives: Array
});
</script>
<template>
  <div class="v-auto-animate">
    <table class="table table-hover mt-3">
      <thead>
        <tr>
          <th v-for="item in fields" :key="item">
            {{ item }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-gray-600"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
              />
            </svg>
          </th>
          <th class="border_custom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-gear"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"
              />
              <path
                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
              />
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in creatives" :key="item.id">
          <td>{{ item.idApplication }}</td>
          <td>{{ item.nameAdGroup }}</td>
          <td class="border_custom">
            <span
              :class="{
                'badge rounded-pill': true,
                'text-bg-info': true,
                'badge_success_custom': item.status === 'Согласовано',
                'badge_danger_custom': item.status === 'Отклонено',
                'badge_warning_custom': item.status === 'На проверке',
                'badge_info_custom': item.status === 'Частично согласовано',
              }"
              >{{ item.status }}</span
            >
          </td>
          <td>{{ item.type }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.cabinet }}</td>
          <td>{{ item.advertiser }}</td>
          <td>{{ item.timeToConfirm }}</td>
          <td>{{ item.dateStart }}</td>
          <td>{{ item.dateCreat }}</td>
          <td>{{ item.dateAudit }}</td>
          <td>{{ item.timeBeforeStart }}</td>
          <td>{{ item.comment }}</td>
          <td>{{ item.link }}</td>
          <td class="border_custom"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
svg:hover {
  color: var(--custom-color);
  cursor: pointer;
}
.border_custom {
  border-left-width: 1px;
}
.badge_success_custom {
  background-color: #d1e7dd !important;
  color: #198754 !important;
}
.badge_danger_custom {
  background-color: #f8d7da !important;
  color: #dc3545 !important;
}
.badge_warning_custom {
  background-color: #fff3cd !important;
  color: #ffc107 !important;
}
.badge_info_custom {
  background-color: #e0cffc !important;
  color: #6f42c1 !important;
}
</style>
