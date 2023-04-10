<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="dark">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert dense outlined type="error" v-model="error" >
              ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง <strong>กรุณา</strong> กรอกใหม่
              <strong>อีกครั้ง</strong>
            </v-alert>
            <v-text-field
              v-model="login.username"
              label="Login"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              name="password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary" @click="submit()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      error: false
    };
  },
  methods: {
    async submit() {
      try {
        const data = await this.axios.post(
          "http://localhost:3000/users/login",
          this.login
        );
        delete data.data.password;
        delete data.data.__v;
        localStorage.setItem("users", JSON.stringify(data.data));
        this.$router.push("/");
      } catch (error) {
        // alert("รหัสหรือยูสเซอร์เนมไม่ถูกต้อง");
        this.error = true
      }
    },
    check() {
      var user = JSON.parse(localStorage.getItem("users"));
      if (user) {
        this.$router.push("/");
      }
    },
  },
  // created() {
  //   this.check();
  // },
};
</script>

<style></style>
