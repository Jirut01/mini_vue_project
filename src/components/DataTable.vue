  <template>
  <v-data-table :headers="headers" :items="items">
     <template slot="item.action" slot-scope="props">
      <v-btn @click="doSomething(props.item)">Action</v-btn>
      <v-btn @click="doSomething2(props.item)">Action2</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Age', value: 'age' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      items: [
        { name: 'John', email: 'john@example.com', age: 25 },
        { name: 'Jane', email: 'jane@example.com', age: 30 },
      ],
    };
  },
  methods: {
    doSomething(item) {
      console.log(item);
      // Do something with the selected item
      console.log('ball');
    },
     doSomething2(item) {
      console.log(item);
      // Do something with the selected item
      console.log('ball');
    },
  },
};
</script>

<style>

</style>