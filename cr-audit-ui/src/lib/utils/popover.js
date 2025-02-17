import { ref } from 'vue'
import { Popover } from 'bootstrap'

export function usePopover() {
  const popoverTriggerList = ref([])
  const popoverList = ref([])

  // Функция для обновления popover
  function updatePopovers() {
    popoverTriggerList.value = [].slice.call(
      // Получаем все элементы с атрибутом data-bs-toggle="popover"
      document.querySelectorAll('[data-bs-toggle="popover"]'),
    )
    // Инициализируем новые popover
    popoverList.value = popoverTriggerList.value.map(el => {
      const customClass = el.getAttribute('data-bs-custom-class')
      return new Popover(el, {
        container: 'body',
        customClass: customClass || '',
      })
    })
    // Обновляем все существующие popover
    popoverList.value.forEach(popover => {
      popover.update()
    })
  }

  return { popoverTriggerList, popoverList, updatePopovers }
}
