<script setup>
import CopyIcon from '@/components/icons/CopyIcon.vue'
import { defineProps } from 'vue'
defineProps({})
</script>

<template>
  <div
    class="offcanvas offcanvas-end p-4 wrapper_custom"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header p-0 mb-4">
      <h4 class="offcanvas-title" id="offcanvasRightLabel">Все комментарии</h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div
      class="offcanvas-body alert alert-secondary m-0 rounded-1 overflow-auto d-flex justify-content-between alert_custom"
      role="alert"
    >
      <div>
        <h4 class="alert-heading">Well done!</h4>
        <p>
          Aww yeah, you successfully read this important alert message. This
          example text is going to run a bit longer so that you can see how
          spacing within an alert works with this kind of content.
        </p>
        <hr />
        <p class="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things
          nice and tidy.
        </p>
      </div>
      <div>
        <CopyIcon width="24px" height="24px" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
.wrapper_custom {
  width: 900px;
}
h4 {
  line-height: 28.8px;
}
button:focus {
  box-shadow: none;
}
button {
  height: 24px;
  width: 24px;
}
.alert_custom {
  scrollbar-width: thin;
}
</style>
