<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="yellow accent-4" dark v-bind="attrs" v-on="on" small @click="editData(data,datas)"
          ><v-icon color="black">mdi-text-search</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit</span>
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
                <v-text-field label="Title*" v-model="edit_title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Team*"
                  v-model="edit_team"
                  required
                ></v-text-field>
              </v-col>
              
               <v-col cols="12" sm="6">
                <v-text-field
                  label="Status*"
                  v-model="edit_status"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Code*"
                  v-model="edit_code"
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
          <v-btn color="blue darken-1" text @click="saveData(edit_title,edit_status,edit_code,edit_team,datas)">
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
    edit_team: '',
    edit_title: '',
    edit_status: '',
    edit_code: ''
  }),
  props:['data','datas'],
  methods: {
    editData(title, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].title == title) {
          this.edit_team = arr[i].team
          this.edit_title = arr[i].title
          this.edit_status = arr[i].status
          this.edit_code = arr[i].code
          break;
        }
      }
    },
    saveData(title, status, code,team, arr){
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].title == title) {
          arr[i].title = title
          arr[i].status = status
          arr[i].code = code
          arr[i].team = team
          this.dialog = false
          break;
        }
      }

    }
  },
};
</script>

<style>
</style>