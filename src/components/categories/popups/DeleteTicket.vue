<template>
  <div class="new-category popup">
      <div class="popup-box">
          <div class="popup-header">
            <h4>Would you like to delete the ticket</h4>
            <a class="close" @click="$emit('close')">X</a>
          </div>
          <div class="popup-content">
              <button @click="deleteTicketHandler(ticket)">Yes</button>
              <button @click="$emit('close')">No</button>
          </div>
      </div>
  </div>
</template>

<script>
import ticketsMixin from '@/mixins/tickets'

    export default {
        name: 'DeleteTicket',
        mixins: [ticketsMixin],
        data() {
            return {
                ticket: []
            }
        },
        methods: {
            getATicketHandler() {
                this.getATicket(this.$route.params.ticket_id)
                    .then(res => {
                        this.ticket = res.data.ticket;
                    })
            },
            deleteTicketHandler(ticket) {
                console.log(ticket.id);
                this.deleteATicket(ticket.id)
                    .then(()=>{
                        this.$router.push({ name: 'Tickets' })
                    })
            }
        },
        mounted() {
        this.getATicketHandler();
    }
    }
</script>

<style scoped>
    form {
        margin-bottom: 30px;
    }
    .field {
        margin-bottom: 20px;
    }
    .field label {
        display: block;
    }
    .field input {
        width: 400px;
    }

    .popup-content{
        display: flex;
        justify-content: space-around;
        margin-top: 50px;
    }
</style>