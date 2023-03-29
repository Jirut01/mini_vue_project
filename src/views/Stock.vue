  <template>
  <div>
    <h1 class="subheading grey--text text-center mt-3 mb-2">สต๊อกสินค้า</h1>
    <v-divider class="mb-3"></v-divider>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="items"
        class="table-responsive no-warp text-center"
        ref="vuetable"
      >
        <template slot="item.action" slot-scope="props">
          <v-btn small color="grey white--text" @click="actionBtn(props.item)"
            >เพิ่ม-ลด</v-btn
          >
        </template>
        <template slot="item.pic" slot-scope="props">
          <v-img
            :src="props.item.pic"
            style="width: 50px; height: 50px"
          ></v-img>
        </template>
      </v-data-table>

      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{ product_name }} {{ product_id }}
            </v-card-title>

            <v-card-text>
              <v-row class="mt-2">
                <v-img :src="pic"></v-img>
                <div class="mt-4"></div>
                <v-radio-group v-model="row" row>
                  <v-radio label="เพิ่ม" value="add"></v-radio>
                  <v-radio label="ลด" value="reduce"></v-radio>
                </v-radio-group>
                <v-text-field
                  label="จำนวน"
                  outlined
                  dense
                  id="fill-input-amount"
                  type="number"
                  min="0"
                  class="mt-4"
                  value="1"
                ></v-text-field>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="add_reduce_stock(product_id)">
                บันทึก
              </v-btn>
              <v-btn color="red" text @click="dialog = false"> ปิด </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      product_name: "",
      product_id: "",
      pic: "",
      amount: "",
      uuid: "",
      column: null,
      row: null,
      headers: [
        { text: "รูป", value: "pic" },
        { text: "รหัสสินค้า", value: "product_code" },
        { text: "ชื่อสินค้า", value: "product_name" },
        { text: "จำนวนทั้งหมด", value: "amount" },
        { text: "ประเภท", value: "action", sortable: false },
      ],
      items: [],
      productList: [],
    };
  },
  methods: {
    doSomething(item) {
      console.log(item);
      // Do something with the selected item
    },
    doSomething2(item) {
      console.log(item);
      // Do something with the selected item
      console.log("ball");
    },
    getData() {
      this.axios.get("http://localhost:3000/products").then((response) => {
        this.productList = response.data.data;
        this.productList.forEach((el) => {
          this.items.push({
            pic: el.image,
            product_code: el.product_id,
            product_name: el.product_name,
            amount: this.format_number(el.amount),
            _id: el._id,
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
    actionBtn(products) {
      this.dialog = true;
      this.product_name = products.product_name;
      this.product_id = products.product_code;
      this.pic = products.pic;
      this.amount = products.amount;
      this.uuid = products._id;
    },
    async add_reduce_stock(product_code) {
      var id = document.getElementById("fill-input-amount");
      var text = Number(id.value);

      if (this.row == "reduce") {
        if (text > this.amount) {
          alert("สินค้าไม่สามารถติดลบได้");
          return false;
        }
      }

      if (this.row == null) {
        alert("กรุณาเลือกเพิ่มหรือลบ");
        return false;
      }

      if (text <= 0 || isNaN(text)) {
        alert("กรุณากรอกให้ถูกต้อง");
        return false;
      }
      var datas = {
        amount: Number(text),
        type: this.row,
      };
      try {
        const { data } = await this.axios.put(
          "http://localhost:3000/products/stock/" + this.uuid,
          datas
        )
        alert(data.message);
        this.getData();
        this.$ref.vuetable.reload()
        console.log(this.getData())
        id.value = 1;
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>