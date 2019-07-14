<template>
  <div class="page-container">
    <b-container>
      <div class="block">
        <p class="title">Collections</p>
        <b-card-group deck>
          <b-card align="center"><b-link href="/movies">Movies</b-link></b-card>
          <b-card align="center"><b-link href="/celebs">Celebs</b-link></b-card>
          <b-card align="center"><b-link href="/polls">Polls</b-link></b-card>
        </b-card-group>
      </div>

      <div class="block">
        <p class="title">Scripts</p>
        <b-card-group deck>
          <b-card align="center"><b-link href="/database">Database</b-link></b-card>
          <b-card align="center"><b-link href="/firebase">Firebase</b-link></b-card>
          <b-card align="center"><b-link href="/algolia">Algolia</b-link></b-card>
        </b-card-group>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
