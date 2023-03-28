<template>
  <v-row justify="center">
    <v-btn color="error" dark @click.stop="dialog = true" small>
      <v-icon color="black">mdi-delete</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Are you sure? </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            CANCLE
          </v-btn>

          <v-btn color="green darken-1" text @click="clickAc(data, datas)">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: ["data", "datas"],
  methods: {
    clickAc(data, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].title == data) {
          arr.splice(i, 1);
          this.dialog = false
          break;
        }
      }
    },
  },
};
</script>

<style>
</style>