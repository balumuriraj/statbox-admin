<template>
  <b-container class="page-container" fluid>
    <div class="header-container">
      <b-breadcrumb
        :items="[{ text: 'Home', href: '/' }, { text: 'Celebs', href: '/celebs' }, { text: item.name || 'New Celeb', active: true }]"
      ></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="title">
              {{ isNew ? 'New Celeb' : item.name }}
              <span></span>              
            </div>
          </b-col>
          <b-col align="right" class="buttons-container">
            <b-btn :disabled="isBusy" variant="outline-danger" size="sm" @click="deleteCeleb()">Delete</b-btn>
            <b-btn :disabled="isBusy" variant="primary" size="sm" @click="saveCeleb()"><b-spinner small v-show="isBusy" /> Save</b-btn>
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
                    v-model="item.name"
                    required
                    placeholder="Enter celeb name"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-3" label="Date of Birth" label-for="input-3">
                  <Datepicker
                    :bootstrap-styling="true"
                    name="dob"
                    v-model="item.dob"
                    input-class="form-control"
                    :typeable="true"
                  ></Datepicker>
                </b-form-group>
              </b-col>
            </b-row>

            <div>
              <div class="group">
                <b-row>
                  <b-col>
                    <div class="label">Roles</div>
                  </b-col>
                  <b-col align="right">
                    <b-link @click="showMovieModal($event.target)" class="text-success">Add</b-link>
                  </b-col>
                </b-row>
                <b-table bordered :items="roles" :fields="fields" v-if="roles.length">
                  <template slot="movie.poster" slot-scope="row">
                    <img :src="row.item.movie.poster || 'https://via.placeholder.com/196X245.png'" />
                  </template>
                  <template slot="movie.title" slot-scope="row">
                    <router-link :to="'/movies/'+row.item.movie.id">{{row.item.movie.title}}</router-link>
                  </template>
                  <template slot="actions" slot-scope="row">
                    <div class="action-buttons">
                      <b-link @click="editRole(row.item.id, $event.target)">Edit</b-link>
                      <b-link @click="deleteRole(row.item.id)" class="text-danger">Delete</b-link>
                    </div>
                  </template>
                </b-table>

                <div v-if="deletedRoles.length">
                  <p>Deleted Roles</p>
                  <b-table bordered :items="deletedRoles" :fields="fields">
                    <template slot="movie.poster" slot-scope="row">
                      <img :src="row.item.movie.poster || 'https://via.placeholder.com/196X245.png'" />
                    </template>
                    <template slot="movie.title" slot-scope="row">
                      <router-link :to="'/movies/'+row.item.movie.id">{{row.item.movie.title}}</router-link>
                    </template>
                    <template slot="actions" slot-scope="row">
                      <div class="action-buttons">
                        <b-link @click="addRole(row.item.id)" class="text-success">Add</b-link>
                      </div>
                    </template>
                  </b-table>
                </div>
              </div>
            </div>
          </b-form>
        </b-col>

        <b-col class="photo">
          <b-card
            :img-src="item.photo || preview || 'https://via.placeholder.com/196X245.png'"
            img-alt="Image"
          >
            <div v-if="item.id">
              <b-btn
                block
                variant="outline-danger"
                v-if="item.photo"
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
    <b-modal id="jsonModal" hide-footer title="Celeb JSON">
      <pre>{{ item }}</pre>
    </b-modal>

    <b-modal
      id="movieModal"
      scrollable
      :title="movieModal.header"
      header-bg-variant="primary"
      header-text-variant="light"
    >
      <div>
        <b-row>
          <b-col>
            <p>Search Existing</p>
          </b-col>
          <b-col align="right">
            <router-link :to="'/movies/new'" class="text-success">Add New</router-link>
          </b-col>
        </b-row>

        <div v-if="movieModal.id">
          <b-card no-body class="overflow-hidden" style="max-width: 510px;">
            <b-row no-gutters>
              <b-col cols="2" style="min-width: 100px">
                <b-card-img
                  :src="movieModal.poster || 'https://via.placeholder.com/196X245.png'"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col>
                <b-card-body>
                  <h4>{{movieModal.title}}</h4>
                  <b-link
                    @click="movieModal.id = null; movieModal.poster = ''; movieModal.title = ''"
                    class="text-danger"
                  >Remove</b-link>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <div v-else>
          <b-input-group>
            <b-form-input placeholder="Enter Movie Title" v-model="modalSearchTerm"></b-form-input>

            <b-input-group-append>
              <b-button variant="outline-secondary">Search</b-button>
            </b-input-group-append>
          </b-input-group>

          <b-list-group v-show="movieHits.length">
            <b-list-group-item v-for="movieHit of movieHits" :key="movieHit.id">
              <b-link
                href="#"
                @click="movieModal.id = movieHit.id; movieModal.title = movieHit.title; movieModal.poster = movieHit.poster"
              >{{ movieHit.title }}</b-link>
            </b-list-group-item>
          </b-list-group>
        </div>

        <div v-show="movieModal.id">
          <br />
          <b-row>
            <b-col>
              <b-form-group id="input-group-type" label="Type" label-for="input-type">
                <b-form-select
                  id="input-type"
                  v-model="movieModal.type"
                  :options="[null, 'Actor', 'Director']"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-index" label="Priority" label-for="input-index">
                <b-form-input
                  id="input-index"
                  v-model="movieModal.index"
                  type="number"
                  placeholder="Enter index"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </div>
      <br />
      <template slot="modal-footer" slot-scope="{ cancel }">
        <b-button variant="outline-secondary" @click="cancel()">Cancel</b-button>
        <b-button variant="outline-success" @click="saveModal($event.target)">Save</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
