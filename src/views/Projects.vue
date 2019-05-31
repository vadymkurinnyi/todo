<template>
  <EditProject
    v-if="editProject"
    :project="editProject"
    @onChange="(res) => editProject = null"
  />
  <div class="projects" v-else>
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="project in myProjects" :key="project.id">
          <template v-slot:header>
            <div>{{ project.title }}</div>
          </template>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">due by {{project.due}}</div>
              <div>{{project.content}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab @click="editProject = project">
               <!-- <span>Edit project</span>-->
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn v-on:click="deleteProject(project.id)" class="mx-4 mb-3 mt-3" :loading="deletedLoading">
                <span>Delete project</span>
                <v-icon right>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";
import {auth} from '@/fb'
import EditProject from "./Project";
import config from "../../package.json";
const { serverUrl } = config;


export default {
  data() {
    return {
      projects: [],
      editProject: null,
      deletedLoading: false,
    };
  },
  computed: {
    myProjects() {
     /* return this.projects.filter(project => {
        return project.person === "The Net Ninja";
      });*/
      return this.projects;
    }
  },
  created() {
    db.collection("projects").where('uid', '==', auth.currentUser.uid).onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        //(this.myMethod[change.type] || defFn) ();
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }else if(change.type==='removed'){
            const index = this.projects.findIndex(proj => proj.id === change.doc.id);
            this.projects.splice(index, 1);
        }
      });
    });
  },
  methods: {
    deleteProject(prop) {
      this.deletedLoading = true;
      setTimeout(()=>{
      db.collection("projects")
        .doc(prop)
        .delete().then(()=>{
          this.deletedLoading = false;
        });}, 1000);
    }
  },
  components: { EditProject },
};
</script>
