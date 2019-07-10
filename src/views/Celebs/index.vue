<template>
  <b-container fluid class="page-container">
    <div class="header-container">
      <b-breadcrumb :items="[{ text: 'Home', href: '/' }, { text: 'Celebs', active: true }]"></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col cols="3">
            <div class="title">Celebs</div>
          </b-col>
          <b-col align="right" class="info-container">
            <b-form-input v-model="searchTerm" placeholder="search celeb" style="max-width: 250px;"></b-form-input>
            <b-btn size="sm" href="/celebs/new">Add Celeb</b-btn>
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
          <template slot="name" slot-scope="data">
            <router-link :to="'/celebs/'+data.item.id">{{data.item.name}}</router-link>
          </template>
          <template slot="photo" slot-scope="data">
            <img
              :src="data.item.photo || 'https://via.placeholder.com/196X245.png'"
              class="table-img"
            />
          </template>
          <template slot="dob" slot-scope="data">
            {{new Date(data.item.dob).toLocaleDateString()}}
          </template>
        </b-table>
        <b-card-group deck v-else>
          <router-link v-for="(item, index) in items" :key="index" :to="'/celebs/'+item.id">
            <b-card
              :key="index"
              :img-src="item.photo || 'https://via.placeholder.com/196X245.png'"
              img-alt="Image"
              img-top
              style="min-width:10rem;max-width:10rem;"
              class="mb-1"
            >
              <div class="title">{{item.name}}</div>
              <div class="date">{{new Date(item.dob).toLocaleDateString()}}</div>
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
