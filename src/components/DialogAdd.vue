<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            small
            class=""
          >
            <v-icon>mdi-plus-box-multiple-outline</v-icon>
            <span>เพิ่มโปรเจค</span>
          </v-btn>
        </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col> -->
              <v-col cols="12">
                <v-text-field label="Title*" v-model="add_title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Team*"
                  v-model="add_team"
                  required
                ></v-text-field>
              </v-col>
              
               <v-col cols="12" sm="6">
                <v-text-field
                  label="Status*"
                  v-model="add_status"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Code*"
                  v-model="add_code"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col> -->
              <!-- <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col> -->
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="Add(add_title,add_status,add_code,add_team,arr)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    add_team: '',
    add_title: '',
    add_status: '',
    add_code: ''
  }),
  props:['arr'],
  methods: {
    Add(title, status, code,team, arr){
        arr.push({
            title: title,
            status: status,
            code: code,
            team: team
        })
        this.dialog =false
    }
  },
};
</script>

<style>
</style>