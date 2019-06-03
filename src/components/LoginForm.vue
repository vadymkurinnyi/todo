<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person" v-model="login" label="Login"></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  v-model="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onLogin" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import {auth} from '@/fb'
window.auth = auth;//for test
export default {
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    onLogin() {
        console.log(this.login);
        console.log(this.password);

      auth.signInWithEmailAndPassword(this.login, this.password).then(cred => {
          
          console.log(cred);
        const url = this.$route.query.redirect || "/dashboard";
        console.log(url);
        this.$router.push(url);
      });
    }
  }
};
</script>

