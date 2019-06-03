<template>
  <v-container>
   
      <upload-btn title="Button With Icon" @file-update="update">
        <template slot="icon">
          <v-icon>add</v-icon>
        </template>
      </upload-btn>
  </v-container>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import UploadButton from 'vuetify-upload-button';

export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  computed: {
    formIsValid() {
      return this.imageUrl;
    }
  },
  components: {
      'upload-btn': UploadButton
    },
  methods: {
    onUpdateUser() {}
    ,
    update (file) {
        console.log('file');
        // handle file here. File will be an object.
        // If multiple prop is true, it will return an object array of files.
      }
  }
};
</script>
