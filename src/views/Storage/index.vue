<template>
  <b-container fluid class="page-container">
    <div class="header-container">
      <b-breadcrumb
        :items="[{ text: 'Home', href: '/' }, { text: 'Firebase Storage', active: true }]"
      ></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="title">Firebase Storage</div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="body-container">
      <b-container fluid>
        <div class="form-container">
          <b-table responsive hover :items="metas" :fields="fields" :busy.sync="isBusy" bordered class="table">
            <template slot="details" slot-scope="data">
              <b-link
                size="sm"
                @click="data.toggleDetails"
                class="mr-2"
              >{{ data.detailsShowing ? 'Hide' : 'Show'}} Details</b-link>
            </template>
            <template slot="row-details" slot-scope="data">              
              <p
                v-if="data.item.years && data.item.years.length > 1"
              >{{data.item.years[0]}}-{{data.item.years[data.item.years.length - 1]}}</p>
              <p v-else>{{data.item.years && data.item.years[0]}}</p>
              {{data.item.months}}
            </template>
            <template slot="moviesCount" slot-scope="data">{{data.item.movieIds.length}}</template>
            <template slot="celebsCount" slot-scope="data">{{data.item.celebIds.length}}</template>
            <template
              slot="timestamp"
              slot-scope="data"
            >{{data.item.firebaseUpdatedAt && new Date(data.item.firebaseUpdatedAt).toLocaleString() || '-'}}</template>
            <template slot="action" slot-scope="data">
              <p v-if="data.item.firebaseUpdatedAt" class="text-success">Updated!</p>
              <b-btn
                v-else
                :disabled="isBusy || data.item.firebaseUpdatedAt"
                variant="primary"
                @click="submit(data.item.id, data.item.type)"
                size="sm"
              >
                <b-spinner small v-show="isBusy" /> Update
              </b-btn>
            </template>
          </b-table>
        </div>
      </b-container>
    </div>
  </b-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
