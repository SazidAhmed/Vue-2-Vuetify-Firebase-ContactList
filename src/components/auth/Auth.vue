<template>
    <div class="container">
        <!-- login form -->
        <div>
            <v-card elevation="0">
                <v-img src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" alt="" contain height="60"></v-img>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="email" label="Email" name="email" prepend-inner-icon="mdi-account" type="email" class="rounded-0" outlined></v-text-field>
                        <v-text-field v-model="password" label="Password" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
                        <div>
                            <p v-if="error" class="red--text">*** {{ error }} ***</p>
                        </div>
                        <div class="white--text">
                            <v-btn color="primary" block tile @click="submitLogin">Login</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/config'
export default {
    name: 'Auth',
    data(){
        return{
            loggedIn:false,
            displayName:null,
            email:null,
            password:null,
            password2:null,
            feedback: null,
            error: null,
        }
    },
    mounted(){

    },
    methods:{
        toggleAuth(){
            console.log("toggle clicked")
            this.showLogin = !this.showLogin
        },
        submitLogin(){
            console.log(this.email, this.password)
            if(this.email && this.password){
                this.error = null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                console.log(user)
                if(user){
                    this.loggedIn = true;
                    this.$router.push({ name: 'Dashboard' })
                }
                }).catch(err => {
                    console.log(err)
                    if(err.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
                        this.error = "There is no user record corresponding to this identifier. The user may have been deleted."    
                    }
                    else if(err.message == "The email address is badly formatted."){
                        this.error = "The email address is badly formatted."    
                    }
                    else if(err.message == "The password is invalid or the user does not have a password."){
                        this.error = "The password is invalid or the user does not have a password." 
                    }
                    else{
                        this.error = err.message
                    }
                })
            } else {
                this.error = 'Fill All'
            }
        }
    }
}
</script>

<style>

</style>