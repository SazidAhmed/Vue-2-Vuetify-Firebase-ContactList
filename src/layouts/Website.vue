<template>
  <v-app id="inspire">
    <!--Drawer Left-->
    <v-navigation-drawer app v-model="left" left width="300">
      <v-list dense>
      </v-list>
    </v-navigation-drawer>
    <!--Drawer Right-->
    <v-navigation-drawer app v-model="right" right width="344">
      <v-list dense>
        <Auth />
      </v-list>
    </v-navigation-drawer>

    <!--Navbar-->
    <v-app-bar app color="primary" dark>
      <!-- <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="left = !left"></v-app-bar-nav-icon>
      <v-spacer></v-spacer> -->
      <router-link :to="{ name: 'Home' }">
        <div class="d-flex align-center">
          <v-btn text rounded color="white">Techminate</v-btn>
        </div>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn color="white" text class="hidden-md-and-up" v-if="!loggedIn" @click.stop="right = !right"><v-icon>mdi-login</v-icon></v-btn>
      <v-btn color="white" text rounded class="hidden-sm-and-down" v-if="!loggedIn" @click.stop="right = !right">Login<v-icon>mdi-login</v-icon></v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- Footer -->
      <Footer />
  </v-app>
</template>

<script>
import Auth from '../components/auth/Auth.vue'
import Footer from '../layouts/website/Footer.vue'
export default {
  name: 'App',

  components: {
    Auth,
    Footer
  },
  data(){
    return{
      right: null,
      right: false,
      left: null,
      left: false,
      loggedIn:false,
    }
  },
};
</script>
<style >
.removeLine{
    text-decoration: none;
    color: white;
 }
 span:hover {
  cursor: pointer;
  
}
</style>
