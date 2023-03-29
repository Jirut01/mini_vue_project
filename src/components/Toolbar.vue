<template>
  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="show = !show"> </v-app-bar-nav-icon>
      <h2>Shop</h2>

      <v-spacer></v-spacer>

      <v-btn href="/" text>
        <span class="mr-2">Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <!-- <v-btn href="/" text>
        <span class="mr-2">History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn> -->

    </v-app-bar>
    <v-navigation-drawer app dark v-model="show">
      <v-list-item class="mt-5">
        <v-avatar size="36">
          <img
            src="https://scontent.fbkk27-1.fna.fbcdn.net/v/t1.6435-9/128214291_3531073590312573_8876833349761757286_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHF9U0HAAA6gXbkwykWitSa-pfS2nP-gVD6l9Lac_6BUBu5XS-WmJErpRqxKO4nwT9Cjemvh6JtvtcFTTU_mnaN&_nc_ohc=7BnB9FCenOMAX_qSW5e&_nc_ht=scontent.fbkk27-1.fna&oh=00_AfCk5rL5zvGJE548lrD3DfBg7_nfzMjp1rQ-5TFkc6xkeQ&oe=644381FF"
            alt="Avatar"
          />
        </v-avatar>
        <v-list-item-content class="ms-2">
          <v-list-item-title>Ball 66040</v-list-item-title>
          <v-list-item-subtitle>jirutsang.sa@inet.co.th</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <br />

      <v-list v-for="list in lists" :key="list.text">
        <router-link class="my-link white--text" :to="list.route">
          <v-list-item>
            <v-list-item-action>
              <v-icon>{{ list.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              {{ list.text }}
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";
export default {
  name: "Toolbars",
  data() {
    return {
      show: true,
      cart: 2,
      lists: [
        { icon: "mdi-warehouse", text: "รายการสินค้า", route: "/" },
        { icon: "mdi-order-bool-descending", text: "ออเดอร์", route: "/order" },
        // {
        //   icon: "mdi-calculator",
        //   text: "Calculator",
        //   route: "/calculator",
        // },
        // { icon: "mdi-account", text: "Profile", route: "/profile" },
        // {
        //   icon: "mdi-file-document-multiple-outline",
        //   text: "Project",
        //   route: "/project",
        // },
        // { icon: "mdi-account-group", text: "Team", route: "/team" },
        {
          icon: "mdi-store-edit-outline",
          text: "จัดการสินค้า",
          route: "/manageproduct",
        },
         {
          icon: "mdi-database-plus",
          text: "สต๊อก",
          route: "/stock",
        },
      ],
    };
  },
  methods: {
    callSection() {
      // this.cart = EventBus.$emit("addCart");
      // console.log(this.cart);
    },
  },
  props: [""],
  mounted() {
    // EventBus.$emit("addCart")
  },
  created() {
    this.callSection();
  },
  computed: {
    //ประมวณผลแบบเรียลทาม //
    // cart() {
    //   var a = 2
    //   return a
    // },
  },
  components: {
  }
};
</script>

<style>
.my-link {
  text-decoration: none;
}
</style>