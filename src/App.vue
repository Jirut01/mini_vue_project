<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    async verdifyuser() {
      try {
        var user = await JSON.parse(localStorage.getItem("users"));
      await this.axios
        .post(
          "http://localhost:3000/users/welcome",
          {},
          {
            headers: {
              auth: user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("suscress");
        })
        .catch((err) => {
          console.log(err);
          console.log("fail");
          this.$router.push("/login");
        });
        
      } catch (error) {
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.verdifyuser();
  },
};
</script>
