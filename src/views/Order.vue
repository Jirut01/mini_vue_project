<template>
  <div>
    <!-- <h1 class="subheading grey--text">ออเดอร์</h1> -->
    <v-container>
      <v-data-table
        :headers="Headers"
        :items="details"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        show-expand
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="subheading grey--text"
              >รายการออเดอร์</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-switch
              v-model="singleExpand"
              label="Single expand"
              class="mt-2"
            ></v-switch>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <!-- <td :colspan="headers.length">{{ item.details}}</td> -->
          <td :colspan="headers.length">
            <v-list-item three-line v-for="(lists, index) in item.details" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{index + 1}}. <i>{{lists.product_name}}</i></v-list-item-title>
                <v-list-item-subtitle>
                  ราคา <b>{{format_number(lists.price)}}</b> บาท จำนวน <b>{{format_number(lists.amount)}}</b> ชิ้น
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <b>รวม {{format_number(lists.price)}} x {{format_number(lists.amount)}} = {{format_number(lists.sum)}} บาท</b>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getdata: [],
      expanded: [],
      singleExpand: false,
      Headers: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "order_no",
        },
        { text: "id", value: "id", align: " d-none" },
        { text: "วัน-เวลาที่สั่งซื้อ", value: "date" },
        { text: "มูลค่าทั้งหมด", value: "amount" },
        { text: "", value: "data-table-expand" },
      ],
      details: [],
    };
  },
  methods: {
    getData() {
      var token = this.getToken();
      this.axios.get("http://localhost:3000/orders",
      { 
            headers:{
              auth: token
            }
        }).then((response) => {
        response.data.data.forEach((el, index) => {
          this.details.push({
            order_no: index + 1,
            date: this.convertDate(el.date),
            amount: el.total,
            id: el._id,
            details: el.detail,
          });
        });
      });
    },
    format_number(number) {
      const formattedNumber = number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedNumber;
    },
    convertDate(date) {
      var date1 = new Date(date).toLocaleString("en-US", {
        timeZone: "Asia/Bangkok", hour12:false
      });
      return date1;
    },
    getToken() {
      var user = JSON.parse(localStorage.getItem("users"));
      return user.token
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>