<template>
  <v-container fluid fill-height>
    <h1 class="subheading grey--text">Calculate</h1>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <br />
        <ul>
          <li>- 80 - 100 เกรด A</li>
          <li>- 70 - 79 เกรด B</li>
          <li>- 60 - 69 เกรด C</li>
          <li>- 50 - 59 เกรด D</li>
          <li>- 0 - 49 เกรด F</li>
        </ul>
        <div class="row">
          <div class="col-md-9">
            <v-text-field
              id="display"
              name="display"
              label="Input"
              hide-details="auto"
              v-model="alert_message"
            ></v-text-field>
            <mark
              ><small><i>กรุณากรอกตัวเลขเท่านั้น 1-100</i></small></mark
            >
          </div>
          <div class="col-md-3">
            <v-btn color="cyan lighten-5" @click="cal(alert_message)"
              >calculate</v-btn
            >
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-12">
            <!-- <p id="result"></p> -->
            <v-alert dense text>
              <p id="result"></p>
            </v-alert>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert_message: "",
    };
  },
  methods: {
    cal(no) {
      const result = document.getElementById("result");
      if (no > 100 || no < 0) {
        result.innerHTML = "";
        alert("กรุณากรอก 1-100");
        return false;
      } else if (isNaN(no)) {
        result.innerHTML = "";
        alert("กรุณากรอกแต่ตัวเลข");
        return false;
      } else {
        if (no >= 80 && no <= 100) {
          result.innerHTML = `คุณได้เกรด A &#127881;`;
        } else if (no >= 70 && no <= 79) {
          result.innerHTML = `คุณได้เกรด B &#127881;`;
        } else if (no >= 60 && no <= 69) {
          result.innerHTML = `คุณได้เกรด C &#127881;`;
        } else if (no >= 50 && no <= 59) {
          result.innerHTML = `คุณได้เกรด D &#127881; `;
        } else if (no >= 0 && no <= 49) {
          result.innerHTML = `คุณได้เกรด F &#127881;`;
        }
      }
    },
  },
};
</script>

<style>
/* .body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>