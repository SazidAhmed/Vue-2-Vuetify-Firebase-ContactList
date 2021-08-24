<template>
    <v-app >
        <v-container fluid>
            <!-- breadcrumbs -->
            <v-breadcrumbs :items="breadcrumbItems" class="dark--text">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
            </v-breadcrumbs>
            <!-- breadcrumbs End-->

            <!-- Cards -->
            <v-row dense>
              <v-col>
                <h2 class="text-center pb-5">Register New User</h2>
                <v-card elevation="0">
                  <v-card-text>
                      <v-form>
                          <v-text-field v-model="displayName" label="Display Name" name="displayName" prepend-inner-icon="mdi-account" type="text" class="rounded-0" outlined></v-text-field>
                          <v-text-field v-model="email" label="Email" name="email" prepend-inner-icon="mdi-account" type="email" class="rounded-0" outlined></v-text-field>
                          <v-text-field v-model="password" label="Password" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
                          <v-text-field v-model="password2" label="Confirm Password" name="password2" prepend-inner-icon="mdi-lock" type="password"  class="rounded-0" outlined></v-text-field>
                          <div>
                              <p v-if="feedback" class="red--text">*** {{ feedback }} ***</p>
                          </div>
                          <div class="white--text">
                              <v-btn color="primary" block tile @click="handleSignup">Submit</v-btn>
                          </div>
                      </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <!-- Cards Ends-->
            <br>
        </v-container>
    </v-app>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/config'
  export default {
    data () {
      return{
        breadcrumbItems: [
          {
            text: 'Dashboard',
            disabled: false,
            href: '/adminportal',
          },
          {
            text: 'User',
            disabled: true,
          },
        ],
        displayName:null,
        email:null,
        password:null,
        password2:null,
        feedback: null,
        error: null,
    }
  },
  mounted(){
    document.title = 'Techminate | User'
  },

  methods:{
    handleSignup(){
      const displayName = this.displayName;
      console.log(this.password2)
      if(this.password !== this.password2){
        this.feedback = 'Confirm Password does not match'
      }
      else{
          if(this.displayName && this.email && this.password){
              this.feedback = null
              
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                  .then(res => {
                      console.log(res)
                      res.user.updateProfile({ displayName })
                      console.log("registered")
                      this.$router.push({ name: 'Dashboard' })
                  })
                  .catch(err => {
                      console.log(err)
                      if(err.message == "The email address is already in use by another account."){
                          this.feedback = "The email address is already in use by another account."    
                      }
                      else if(err.message == "The email address is badly formatted."){
                          this.feedback = "The email address is badly formatted." 
                      }
                      else if(err.message == "Password should be at least 6 characters"){
                          this.feedback = "Password should be at least 6 characters." 
                      }
                      else{
                          this.feedback = err.message
                      }
                  })
          } else {
              this.feedback = 'Fill All'
          }
      }
    },
  }
}
</script>