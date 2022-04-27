<template>
  <div class="tickettype">
      <h1>Ticket Type</h1>
    <button style="margin: 20px 0" @click="addTickettypeHandler()">Add Ticket Type</button>
    <div class="categories-list">
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tickettype in tickettypes"
            :key="tickettype.id"
          >
            <td>{{tickettype.id}}</td>
            <td>{{tickettype.title}}</td>
            <td>{{tickettype.created_at | formatDate}}</td>
            <td>
              <button @click="editTickettypeHandler(tickettype)">Edit</button>
              <button @click="deleteTickettypeHandler(tickettype)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <NewTicketType
      v-if="newPopup"
      @close = "newPopup = false"
      @created="createdTickettypeyHandler()"
    />
    <EditTicketType
       v-if="editItem"
      :tickettype="editItem"
      @close="editItem = null"
      @updated="updatedTickettypeHandler()"
    />
    <DeleteTicketType
       v-if="editItemDel"
      :tickettype="editItemDel"
      @close="editItemDel = null"
      @updated="updateDeleteTickettypeHandler()"
    />
    
  </div>
</template>

<script>
import tickettypeMixin from '@/mixins/tickettype.vue'
import EditTicketType from '@/components/categories/popups/EditTicketType.vue'
import NewTicketType from '@/components/categories/popups/NewTicketType.vue'
import DeleteTicketType from '@/components/categories/popups/DeleteTicketType.vue'
export default {
    name: 'Tickettype',
    mixins: [tickettypeMixin],
    components: {
      EditTicketType,
      NewTicketType,
      DeleteTicketType
    },
    data() {
        return {
           tickettypes: null,
           newPopup: false,
           editItem: null,
           editItemDel: null
        }
    },
    methods: {
        getTickettypesHandler() {
            this.getTickettypes()
                .then(res => {
                    console.log(res.data.ticket_types);
                    this.tickettypes = res.data.ticket_types;
                })
        },
        addTickettypeHandler(){
            this.newPopup = true;
        },
        createdTickettypeyHandler() {
            this.newPopup = false;
            this.getTickettypesHandler();
        },

        editTickettypeHandler(tickettype) {
            this.editItem = tickettype;
        },
        deleteTickettypeHandler(tickettype) {
            this.editItemDel = tickettype;
        },
        updatedTickettypeHandler() {
            this.editItem = null;
            this.getTickettypesHandler();
        },
        updateDeleteTickettypeHandler() {
             this.editItemDel = null;
            this.getTickettypesHandler();
        }
    },
    mounted() {
        this.getTickettypesHandler();
    }
}
</script>

<style>

</style>