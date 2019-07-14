<template>
  <div id="app" class="h-100">
    <!-- <Menu /> -->
    <b-container fluid class="container-height" v-if="isUserLoggedIn">
      <b-row class="h-100">
        <b-col class="h-100 side-menu" v-show="showMenu">
          <div class="logo">
            <img src="https://statbox89.firebaseapp.com/img/logo.6eed5441.svg" />
            <p>statbox <span>ADMIN</span></p>  
          </div>
          <div class="group">
            <router-link to="/"><font-awesome-icon icon="home" /> Overview</router-link>
          </div>
          <div class="group">
            <p>Collections</p>
            <router-link to="/movies"><font-awesome-icon icon="film" /> Movies</router-link>
            <router-link to="/celebs"><font-awesome-icon icon="users" /> Celebs</router-link>
            <router-link to="/polls"><font-awesome-icon icon="poll-h" /> Polls</router-link>
          </div>
          <div class="group">
            <p>Scripts</p>
            <router-link to="/database"><font-awesome-icon icon="database" /> Database</router-link>
            <router-link to="/firebase"><font-awesome-icon icon="image" /> Firebase</router-link>
            <router-link to="/algolia"><font-awesome-icon icon="search" /> Algolia</router-link>
          </div>
        </b-col>
        <b-col class="h-100 main-container">
          <b-row class="top-menu">
            <b-col>
              <div class="menu-icon" @click="showMenu = !showMenu"><font-awesome-icon icon="bars" /></div>
            </b-col>
            <b-col align="right">
              <b-btn size="sm" variant="outline-primary" @click="logout()"><font-awesome-icon icon="sign-out-alt" /> Logout</b-btn>
            </b-col>
          </b-row>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
    <div v-else class="h-100">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Menu from "@/components/common/Menu";
import { logoutFirebaseUser } from './support/firebaseUtils';

@Component({
  components: {
    Menu
  }
})
export default class App extends Vue {
  public showMenu = false;

  get isUserLoggedIn() {
    return this.$store.state.isLoggedIn;
  }

  public async logout() {
    await logoutFirebaseUser();
  }

  private mounted() {
    const width = document.body.clientWidth;

    if (width > 950) {
      this.showMenu = true;
    }
  }
}
</script>

<style lang="scss">
@import url(
  https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700
);

html,
body {
  font-size: 0.95em;
  font-family: "Roboto";
  margin: 0;
  padding: 0;
  background: #100e17;
  width: 100%;
  height: 100%;
}

.container-height {
  height: 100%;
}

.side-menu {
  background: #100e17;
  min-width: 250px !important;
  max-width: 250px !important;
  padding: 0 !important;
  color: rgba(255, 255, 255, 0.75);

  .logo {
    display: flex;
    color: #fff;
    align-content: center;
    padding: 1em;
    border-bottom: 1px solid #333;

    img {
      width: 35px;
    }

    p {
      margin: 0;
      margin-left: 10px;
      font-size: 1.75em;
      font-weight: bold;

      span {
        font-size: 0.5em;
        opacity: 0.5;
      }
    }
  }

  .group {

    p {
      margin: 0;
      padding: 1em;
      font-weight: bold;
      font-size: 1em;
      text-transform: uppercase; 
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
    }

    a {
      display: block;
      width: 100%;
      font-size: 0.9em;
      padding: 0.75em 1em;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.5);
      // background: #171522;

      &:hover {
        text-decoration: none;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }  
}

.main-container {
  overflow: auto;
  background: #FAFAFB;

  .top-menu {
    background: #fff;
    color: #201e2e;
    box-shadow: 0 1px 2px 0 rgba(40, 42, 49, 0.16);
    padding: 1.5em 2em;
    height: 70px;

    .menu-icon {
      cursor: pointer;
    }
  }

  .form-control, .custom-select, .ti-input {
    border: 1px solid #eee !important;
    font-size: 0.9em !important;
  }

  .ti-input {
    font-size: 1em !important;
    padding: 0.5em !important;
    border-radius: 4px !important;
  }  
}
</style>
