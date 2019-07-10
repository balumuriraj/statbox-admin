<template>
  <b-container fluid class="page-container">
    <div class="header-container">
      <b-breadcrumb :items="[{ text: 'Home', href: '/' }, { text: 'Movies', active: true }]"></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col sm="12" md="3">
            <div class="title">Movies</div>
          </b-col>
          <b-col align="right" class="info-container" sm="12" md="9">
            <b-form-input v-model="searchTerm" placeholder="search movie" style="max-width: 250px;"></b-form-input>
            <b-btn size="sm" href="/movies/new">Add Movie</b-btn>
            <b-form-radio-group
              id="btn-radios-1"
              v-model="layout"
              :options="['table', 'grid']"
              buttons
              button-variant="outline-primary"
              size="sm"
              name="radio-btn-outline"
            ></b-form-radio-group>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="body-container">
      <b-container fluid>
        <b-table
          hover
          :items="items"
          :fields="fields"
          :busy.sync="isBusy"
          bordered
          class="table"
          v-if="layout === 'table'"
        >
          <template slot="title" slot-scope="data">
            <router-link :to="'/movies/'+data.item.id">{{data.item.title}}</router-link>
          </template>
          <template slot="poster" slot-scope="data">
            <img
              :src="data.item.poster || 'https://via.placeholder.com/196X245.png'"
              class="table-img"
            />
          </template>
          <template slot="releaseDate" slot-scope="data">
            {{new Date(data.item.releaseDate).toLocaleDateString()}}
          </template>
        </b-table>
        <b-card-group deck v-else>
          <router-link v-for="(item, index) in items" :key="index" :to="'/movies/'+item.id">
            <b-card
              :key="index"
              :img-src="item.poster || 'https://via.placeholder.com/196X245.png'"
              img-alt="Image"
              img-top
              style="min-width:10rem;max-width:10rem;"
              class="mb-1"
            >
              <div class="title">{{item.title}}</div>
              <div class="date">{{new Date(item.releaseDate).toLocaleDateString()}}</div>
            </b-card>
          </router-link>
        </b-card-group>
      </b-container>

      <b-container fluid>
        <b-row>
          <b-col>
            <b-spinner variant="primary" type="grow" label="Spinning" v-show="isBusy" />
            <span v-show="isBusy">Loading</span>
          </b-col>
          <b-col align="right">
            <b-pagination
              align="right"
              v-model="currentPage"
              :total-rows="count"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
