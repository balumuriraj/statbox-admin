<template>
  <b-container class="page-container" fluid>
    <div class="header-container">
      <b-breadcrumb
        :items="[{ text: 'Home', href: '/' }, { text: 'Movies', href: '/movies' }, { text: item.title || 'New Movie', active: true }]"
      ></b-breadcrumb>
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="title">
              {{ isNew ? 'New Movie' : item.title }}
              <span></span>              
            </div>
          </b-col>
          <b-col align="right" class="buttons-container">
            <b-btn :disabled="isBusy" variant="outline-danger" size="sm" @click="deleteMovie()">Delete</b-btn>
            <b-btn :disabled="isBusy" variant="primary" size="sm" @click="saveMovie()"><b-spinner small v-show="isBusy" /> Save</b-btn>
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
                    placeholder="Enter movie title"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-3" label="Release Date" label-for="input-3">
                  <Datepicker
                    :bootstrap-styling="true"
                    name="releaseDate"
                    v-model="item.releaseDate"
                    input-class="form-control"
                    :typeable="true"
                  ></Datepicker>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group id="input-group-4" label="Cert" label-for="input-4">
                  <b-form-select id="input-4" v-model="item.cert" :options="certs"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-5" label="Runtime" label-for="input-5">
                  <b-form-input
                    id="input-5"
                    v-model="item.runtime"
                    type="number"
                    placeholder="Enter movie runtime"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group id="input-group-2" label="Description" label-for="input-2">
              <b-form-textarea
                id="input-2"
                v-model="item.description"
                placeholder="Enter description"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-6" label="Genre" label-for="input-6">
              <vue-tags-input
                v-model="tag"
                :tags="tags"
                :autocomplete-items="allGenres"
                :add-only-from-autocomplete="true"
                @tags-changed="newTags => tags = newTags"
              />
            </b-form-group>

            <div>
              <div class="group">
                <b-row>
                  <b-col>
                    <div class="label">Cast</div>
                  </b-col>
                  <b-col align="right">
                    <b-link @click="showCelebModal('cast', $event.target)" class="text-success">Add</b-link>
                  </b-col>
                </b-row>
                <b-table bordered :items="cast" :fields="fields" v-if="cast.length">
                  <template slot="celeb.photo" slot-scope="row">
                    <img :src="row.item.celeb.photo || 'https://via.placeholder.com/196X245.png'" />
                  </template>
                  <template slot="celeb.name" slot-scope="row">
                    <router-link :to="'/celebs/'+row.item.celeb.id">{{row.item.celeb.name}}</router-link>
                  </template>
                  <template slot="actions" slot-scope="row">
                    <div class="action-buttons">
                      <b-link @click="editRole(row.item.id, $event.target)">Edit</b-link>
                      <b-link @click="deleteRole(row.item.id)" class="text-danger">Delete</b-link>
                    </div>
                  </template>
                </b-table>

                <div v-if="deletedCast.length">
                  <p>Deleted Cast</p>
                  <b-table bordered :items="deletedCast" :fields="fields">
                    <template slot="celeb.photo" slot-scope="row">
                      <img :src="row.item.celeb.photo || 'https://via.placeholder.com/196X245.png'" />
                    </template>
                    <template slot="celeb.name" slot-scope="row">
                      <router-link :to="'/celebs/'+row.item.celeb.id">{{row.item.celeb.name}}</router-link>
                    </template>
                    <template slot="actions" slot-scope="row">
                      <div class="action-buttons">
                        <b-link @click="addRole(row.item.id)" class="text-success">Add</b-link>
                      </div>
                    </template>
                  </b-table>
                </div>
              </div>

              <hr />

              <div class="group">
                <b-row>
                  <b-col>
                    <div class="label">Crew</div>
                  </b-col>
                  <b-col align="right">
                    <b-link @click="showCelebModal('crew', $event.target)" class="text-success">Add</b-link>
                  </b-col>
                </b-row>
                <b-table bordered :items="crew" :fields="fields" v-if="crew.length">
                  <template slot="celeb.photo" slot-scope="row">
                    <img :src="row.item.celeb.photo || 'https://via.placeholder.com/196X245.png'" />
                  </template>
                  <template slot="celeb.name" slot-scope="row">
                    <router-link :to="'/celebs/'+row.item.celeb.id">{{row.item.celeb.name}}</router-link>
                  </template>
                  <template slot="actions" slot-scope="row">
                    <div class="action-buttons">
                      <b-link @click="editRole(row.item.id, $event.target)">Edit</b-link>
                      <b-link @click="deleteRole(row.item.id)" class="text-danger">Delete</b-link>
                    </div>
                  </template>
                </b-table>
                <div v-if="deletedCrew.length">
                  <p>Deleted Crew</p>
                  <b-table bordered :items="deletedCrew" :fields="fields">
                    <template slot="celeb.photo" slot-scope="row">
                      <img :src="row.item.celeb.photo || 'https://via.placeholder.com/196X245.png'" />
                    </template>
                    <template slot="celeb.name" slot-scope="row">
                      <router-link :to="'/celebs/'+row.item.celeb.id">{{row.item.celeb.name}}</router-link>
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

        <b-col class="poster">
          <b-card
            :img-src="item.poster || preview || 'https://via.placeholder.com/196X245.png'"
            img-alt="Image"
          >
            <div v-if="item.id">
              <b-btn
                block
                variant="outline-danger"
                v-if="item.poster"
                size="sm"
                @click="removePoster"
              >Remove Poster</b-btn>
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
    <b-modal id="jsonModal" hide-footer title="Movie JSON">
      <pre>{{ item }}</pre>
    </b-modal>

    <b-modal
      id="celebModal"
      scrollable
      :title="celebModal.title"
      header-bg-variant="primary"
      header-text-variant="light"
    >
      <div>
        <b-row>
          <b-col>
            <p>Search Existing</p>
          </b-col>
          <b-col align="right">
            <router-link :to="'/celebs/new'" class="text-success">Add New</router-link>
          </b-col>
        </b-row>

        <div v-if="celebModal.id">
          <b-card no-body class="overflow-hidden" style="max-width: 510px;">
            <b-row no-gutters>
              <b-col cols="2" style="min-width: 100px">
                <b-card-img
                  :src="celebModal.photo || 'https://via.placeholder.com/196X245.png'"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col>
                <b-card-body>
                  <h4>{{celebModal.name}}</h4>
                  <b-link
                    @click="celebModal.id = null; celebModal.photo = ''; celebModal.name = ''"
                    class="text-danger"
                  >Remove</b-link>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <div v-else>
          <b-input-group>
            <b-form-input placeholder="Enter Celeb name" v-model="modalSearchTerm"></b-form-input>

            <b-input-group-append>
              <b-button variant="outline-secondary">Search</b-button>
            </b-input-group-append>
          </b-input-group>

          <b-list-group v-show="celebHits.length">
            <b-list-group-item v-for="celebHit of celebHits" :key="celebHit.id">
              <b-link
                href="#"
                @click="celebModal.id = celebHit.id; celebModal.name = celebHit.name; celebModal.photo = celebHit.photo"
              >{{ celebHit.name }}</b-link>
            </b-list-group-item>
          </b-list-group>
        </div>

        <div v-show="celebModal.id">
          <br />
          <b-row>
            <b-col>
              <b-form-group id="input-group-type" label="Type" label-for="input-type">
                <b-form-select
                  id="input-type"
                  v-model="celebModal.type"
                  :options="[null, 'Actor', 'Director']"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-index" label="Priority" label-for="input-index">
                <b-form-input
                  id="input-index"
                  v-model="celebModal.index"
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
