<template>
  <b-container fluid class="page-container">
    <div class="header-container">
      <b-breadcrumb :items="[{ text: 'Home', href: '/' }, { text: 'Polls', active: true }]"></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col cols="3">
            <div class="title">Polls</div>
          </b-col>
          <b-col align="right" class="info-container">
            <b-btn size="sm" href="/polls/new">Add Poll</b-btn>
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
        >
          <template slot="title" slot-scope="data">
            <router-link :to="'/polls/'+data.item.id">{{data.item.title}}</router-link>
          </template>
          <template slot="timestamp" slot-scope="data">
            {{new Date(data.item.timestamp).toLocaleDateString()}}
          </template>
        </b-table>
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
