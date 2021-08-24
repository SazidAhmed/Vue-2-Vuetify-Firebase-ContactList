<template>
  <v-app id="inspire">
    <!-- snackbar -->
    <v-snackbar v-model="snackbar" right top rounded="pill" color="green" >Logged In Successfully
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
    </v-snackbar>

    <!--Drawer Left-->
    <v-navigation-drawer app v-model="leftDrawer" >
        <!-- avater -->
        <v-layout column align-center>
          <v-avatar class="mt-5" size="50">
            <img class="text-lg-center" src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" />
          </v-avatar>
          <span class="mt-4" v-if="user">{{ user.displayName }}</span>
          <span class="mb-4 caption" v-if="user">{{ user.email }}</span>
        </v-layout>
        <v-divider></v-divider>
        <!-- list -->
        <v-list dense>
          <template v-for="item in items" >
              <v-list-group v-if="item.children" :key="item.text"
                  v-model="item.model" color="dark" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="" >
                <template v-slot:activator>
                    <v-list-item-content >
                        <v-list-item-title class="dark--text">
                        {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.url" >
                <v-list-item-action v-if="child.icon">
                    <v-icon class="dark--text">{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="dark--text">
                    {{ child.text }}
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-item v-else :key="item.text" :to="item.url" color="dark">
                <v-list-item-action>
                <v-icon class="dark--text">{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title class="dark--text">
                    {{ item.text }}
                </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </template>
          <v-divider></v-divider>
          <v-list-item @click="logout">
              <v-list-item-action>
                  <v-icon class="dark--text">mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title class="dark--text">Logout</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-footer absolute>
            <v-col class="text-center grey--text" cols="12">
                <strong >&copy;Techminate{{ new Date().getFullYear() }}</strong>
            </v-col>
        </v-footer>
    </v-navigation-drawer>

    <!--Drawer Right-->
    <v-navigation-drawer app v-model="rightDrawer" fixed right temporary width="300">
       <!-- avater -->
        <v-layout column align-center>
            <v-flex class="mt-4 mb-4">
                <v-icon class="grey--text" left size="31">mdi-bell-alert</v-icon>
                <span>Notification</span>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <!-- list -->
        <v-list dense>
          <v-list-item @click="notify">
            <v-list-item-action>
                <v-icon class="dark--text">mdi-bell-ring-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="dark--text">coming soon.</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <!--Navbar-->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="leftDrawer =!leftDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="font-weight-light">Techminate</span>
        <span></span>
      </v-app-bar-title>
     
      <v-spacer></v-spacer>
      <!-- dropdown menu -->
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on,attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon class="grey--text" size="24px">mdi-account-circle-outline</v-icon>
          </v-btn>
          </template>
          <v-list >
            <v-list-item @click="viewProfile">
              <v-icon class="grey--text" left>mdi-account-tie</v-icon>
              <v-list-item-title class="caption">Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-icon class="grey--text" left>mdi-logout</v-icon>
              <v-list-item-title class="caption">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!--end dropdown -->
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon class="grey--text" size="24px">mdi-bell-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <!--Floating btn -->
    <v-btn bottom color="grey" fab  small fixed right>
      <v-icon>mdi-ship-wheel</v-icon>
    </v-btn>

    <!-- Footer -->
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'App',

  components: {

  },
  data(){
    return{
      rightDrawer: false,
      leftDrawer: null,
      loggedIn:false,
      snackbar: false,
      theme: true,
      text:'',
      user: null,
      items: [
          { icon: "mdi-view-dashboard",  text: "Dashboard", url: '/adminportal',},
          { icon: "mdi-chevron-up", 'icon-alt': 'mdi-account-supervisor-circle',
              text: 'User', model: false,
              children: [
                { icon: "mdi-chevron-right", text: 'Register', url: '/register',},
              ],
          },
          { icon: "mdi-chevron-up", 'icon-alt': 'mdi-account-group',
              text: 'Contact', model: false,
              children: [
                { icon: "mdi-chevron-right", text: 'Contact', url: '/contact',},
              ],
          },
          { icon: "mdi-tune", text: "Settings", url: '/settings', },
      ],
    }
  },
  created(){
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })    
  },
  mounted(){
    this.snackbar = localStorage.getItem('loggedIn') ? true : false;
    localStorage.removeItem('loggedIn');
    this.$vuetify.theme.dark = true;
  },

  watch:{
    theme: function(old, newVal){
      this.$vuetify.theme.dark = old;
    }
  },
  methods: {
    viewProfile(){
      this.$router.push({ name: 'Profile' })
    },
    notify(){
      console.log("Notified")
    },
    logout(){
      firebase.auth().signOut().then(() => {
        console.log("logged out")
        this.$router.push({ name: 'Home' })
      })
    }
  }
};
</script>
<style scoped>
 span:hover {
  cursor: pointer;
  color: white;
}
</style>
