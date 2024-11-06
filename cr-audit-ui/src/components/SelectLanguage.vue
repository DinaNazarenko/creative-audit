<template>
  <div class="d-flex justify-content-center">
    <p class="d-flex align-items-center justify-content-end text_custom">
      Язык:
    </p>

    <select
      class="form-select select_custom"
      aria-label="Default select example"
    >
      <option value="1">Русский</option>
      <option value="2">Английский</option>
    </select>
  </div>
</template>
<style scoped>
@import "../assets/main.css";

.text_custom {
  height: var(--custom-height);
  margin-bottom: var(--custom-zero);
  margin-right: 12px;
  color: #adb5bd;
}

.select_custom {
  width: 128px;
  height: var(--custom-height);
  padding-right: var(--custom-zero);
  padding-left: 6px;
  border-color: white;
}
:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
</style>

