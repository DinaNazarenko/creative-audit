import { ref } from 'vue'
import { Popover } from 'bootstrap'

export function usePopover() {
  const popoverTriggerList = ref([])
  const popoverList = ref([])

  // Функция для обновления popover
  function updatePopovers() {
    // Получаем все элементы с атрибутом data-bs-toggle="popover"
    popoverTriggerList.value = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]'),
    )

    // Инициализируем новые popover
    popoverList.value = popoverTriggerList.value.map(el => new Popover(el))

    // Обновляем все существующие popover
    popoverList.value.forEach(popover => {
      popover.update()
    })
  }

  return { popoverTriggerList, popoverList, updatePopovers }
}
