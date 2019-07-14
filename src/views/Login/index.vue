<template>
  <div class="page-container">
    <div class="body-container">
      <div class="logo">
        <img src="https://statbox89.firebaseapp.com/img/logo.6eed5441.svg" />
        <p>statbox <span>ADMIN</span></p>  
      </div>
      <b-btn variant="light" @click="login()"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />Sign in with Google</b-btn>
      <br><br>
      <p v-show="isLoading"><b-spinner type="grow" label="Spinning" small></b-spinner> Loading...</p>
      <p v-show="error" class="text-danger">{{error}}</p>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
