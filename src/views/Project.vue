<template>
  <v-card>
    <v-card-title>
      <h2>Add a New Projectt</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3" ref="form">
        <v-text-field
          label="Title"
          v-model="project.title"
          prepend-icon="folder"
          :rules="inputRules"
        ></v-text-field>
        <v-textarea
          label="Information"
          v-model="project.content"
          prepend-icon="edit"
          :rules="inputRules"
        ></v-textarea>
        <v-menu>
          <v-text-field
            :value="project.due"
            slot="activator"
            label="Due date"
            prepend-icon="date_range"
            :rules="inputRuleDate"
          ></v-text-field>
          <v-date-picker v-model="project.due"></v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn
          flat
          class="success mx-0 mt-3"
          v-on:click="updateProject"
          :loading="loading"
        >Save project</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import format from "date-fns/format";
import db from "@/fb";
export default {
  name: "Project",
  props: {
    project: {
      type: Object,
      'default': {
        title: "",
        content: "",
        due: null
      }
    },
    onChange: { type: Function }
  },
  data() {
    return {
      id: 0,
      project0: {
        title: "",
        content: "",
        due: null
      },
      inputRules: [v => v.length >= 3 || "Minimum length is  characters"],
      inputRuleDate: [v => v.length >= 6 || "Data not picked"],
      loading: false
    };
  },
  async created() {
    this.id = this.project.id;
    const res = await db
      .collection("projects")
      .doc(this.id)
      .get();
    if (res.exists) {
      Object.assign(this.project, res.data());
    }
  },
  methods: {
    async updateProject() {
      this.loading = true;
      const res = await db
        .collection("projects")
        .doc(this.id)
        .update({
          ...this.project
        });
      this.loading = false;
      console.log(this.onChange);
      this.$emit('onChange', res);
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(this.project.due, "Do MMM YYYY") : "";
    }
  }
};
</script>

