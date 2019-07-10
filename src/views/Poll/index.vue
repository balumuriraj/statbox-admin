<template>
  <b-container class="page-container" fluid>
    <div class="header-container">
      <b-breadcrumb
        :items="[{ text: 'Home', href: '/' }, { text: 'Polls', href: '/polls' }, { text: item.title || 'New Poll', active: true }]"
      ></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="title">
              {{ isNew ? 'New Poll' : item.title }}
              <span></span>              
            </div>
          </b-col>
          <b-col align="right" class="buttons-container">
            <b-btn :disabled="isBusy" variant="outline-danger" size="sm" @click="deletePoll()">Delete</b-btn>
            <b-btn :disabled="isBusy" variant="primary" size="sm" @click="savePoll()"><b-spinner small v-show="isBusy" /> Save</b-btn>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container fluid class="body-container">
      <b-row>
        <b-col>
          <b-form class="form-container">
            <b-row>
              <b-col>
                <b-form-group id="input-group-1" label="Title" label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="item.title"
                    required
                    placeholder="Enter poll title"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group id="input-group-2" label="Type" label-for="input-2">
                  <b-form-select id="input-2" v-model="item.type" :options="types"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-3" label="filter" label-for="input-3">
                  <b-form-input
                    id="input-3"
                    v-model="item.filter"
                    placeholder="Enter filter"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </b-col>

        <b-col class="photo">
          <b-card
            :img-src="item.image || preview || 'https://via.placeholder.com/196X245.png'"
            img-alt="Image"
          >
            <div v-if="item.id">
              <b-btn
                block
                variant="outline-danger"
                v-if="item.image"
                size="sm"
                @click="removePhoto"
              >Remove Photo</b-btn>
              <div v-else>
                <b-form-file
                  v-model="file"
                  placeholder="Choose.."
                  drop-placeholder="Drop file here..."
                  v-if="!preview"
                ></b-form-file>
                <div v-else-if="file">
                  <b-button-group>
                    <b-btn variant="outline-danger" size="sm" @click="file = null; preview = null;">Cancel Upload</b-btn>
                  </b-button-group>
                </div>
              </div>
            </div>
            <div v-else>
              Image upload available after creating the movie
            </div>
          </b-card>

          <br />

          <b-card no-body>
            <div slot="header">Settings</div>
            <b-list-group flush>
              <b-list-group-item>
                <b-link @click="showJSONModal($event.target)">show { JSON }</b-link>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Info modal -->
    <b-modal id="jsonModal" hide-footer title="Poll JSON">
      <pre>{{ item }}</pre>
    </b-modal>
  </b-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
