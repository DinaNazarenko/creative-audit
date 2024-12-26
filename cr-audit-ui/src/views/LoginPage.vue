<script setup>
import LoginHeader from "@/components/LoginHeader.vue";
import LoginForm from "@/components/LoginForm.vue";
import AlertDanger from "@/components/AlertDanger.vue";
import AlertSuccess from '@/components/AlertSuccess.vue'
import SidebarLogo from "@/components/SidebarLogo.vue";
</script>

<template>
  <div class="row">
    <div class="col-8">
      <div class="vh-100 d-flex align-items-center justify-content-center" v-auto-animate>
        <div>
          <LoginHeader title="Audit Manager" />
          <LoginForm btn="Войти" />
        </div>
      </div>
      <AlertSuccess />
      <AlertDanger />
    </div>
    <SidebarLogo />
  </div>
</template>
