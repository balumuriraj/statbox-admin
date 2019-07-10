<template>
  <b-container fluid class="page-container">
    <div class="header-container">
      <b-breadcrumb :items="[{ text: 'Home', href: '/' }, { text: 'Database', active: true }]"></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="title">Database</div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="body-container">
      <b-container fluid>
        <div class="form-container">

          <b-form-group id="input-group-1" label="Years" label-for="input-1">
            <vue-tags-input
              v-model="yearTag"
              :tags="yearTags"
              :autocomplete-items="allYearTags"
              :add-only-from-autocomplete="true"
              @tags-changed="newTags => yearTags = newTags"
            />
            <b-link style="margin-left: 1em; float: right;" @click="yearTags = [];">Remove All</b-link>
            <b-link style="float: right;" @click="addAllYearTags">Include All</b-link>
          </b-form-group>

          <b-form-group id="input-group-3" label="Months" label-for="input-3">
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              :autocomplete-items="allTags"
              :add-only-from-autocomplete="true"
              @tags-changed="newTags => tags = newTags"
            />            
            <b-link style="margin-left: 1em; float: right;" @click="tags = [];">Remove All</b-link>
            <b-link style="float: right;" @click="addAllTags">Include All</b-link> 
          </b-form-group>

          <b-btn :disabled="isBusy" variant="primary" @click="submit()">
            <b-spinner small v-show="isBusy" /> Create Database
          </b-btn>
        </div>

        <br />

        <div class="form-container">
          <b-table hover :items="metas" :fields="fields" :busy.sync="isBusy" bordered class="table">
            <template slot="years" slot-scope="data">
              <p v-if="data.item.years && data.item.years.length > 1">{{data.item.years[0]}}-{{data.item.years[data.item.years.length - 1]}}</p>
              <p v-else>{{data.item.years && data.item.years[0]}}</p>
            </template>
            <template slot="moviesCount" slot-scope="data">{{data.item.movieIds.length}}</template>
            <template slot="celebsCount" slot-scope="data">{{data.item.celebIds.length}}</template>
            <template
              slot="databaseUpdatedAt"
              slot-scope="data"
            >{{data.item.databaseUpdatedAt && new Date(data.item.databaseUpdatedAt).toLocaleDateString() || '-'}}</template>
          </b-table>
        </div>
      </b-container>
    </div>
  </b-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
