<template>
  <div class="tickets">
      <h1>Tickets</h1>
      <div class="tickets-list">
          <button @click="createTicketHandler()">Create</button>
          <div v-for="ticket in tickets" :key="ticket.id" class="ticket">
                <button @click="completeTaskHandler(ticket)">
                  <span v-if="ticket.status == 1">Complete</span>
                  <span v-else>Incomplete</span>
                </button>
                <router-link :to="`tickets/${ticket.id}`">
                    <span class="status">
                        {{ticket.status | statusFormat}}
                    </span>
                    <span class="ticket-name">{{ticket.description}}</span>
                    <span class="ticket-date">
                        {{ticket.created_at | formatDate}}
                    </span>
                    <span>
                        {{ticket.assign}}
                    </span>
                </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import ticketsMixin from '@/mixins/tickets.vue'
export default {
    name: 'Tickets',
    mixins: [ticketsMixin],
    data() {
        return {
           tickets: null 
        }
    },
    methods: {
        getTicketsHandler() {
            this.getTickets()
                .then(res => {
                    this.tickets = res.data.tickets;
                    console.log(res.data.tickets);
                })
        },
        completeTaskHandler(ticket) {
            console.log(ticket.status);
            let dataToSend = {};

            if(ticket.status == 0){
                dataToSend.status = 1;
            }else{
                dataToSend.status = 0;
            }
            this.changeTicketStatus(ticket.id, dataToSend)
                .then(()=>{
                    this.getTicketsHandler();
                })
        },
        createTicketHandler() {
            let dataToSend = {
                category_id: 1
            }
            this.createTicket(dataToSend)
                .then(()=>{
                    this.getTicketsHandler();
                    var id = this.tickets[this.tickets.length - 1].id;
                    this.$router.push('/tickets/'+`${id + 1}`);
                })
        }
    },
    filters: {
        statusFormat(status) {
            if(status == 0){
                return 'Incompleted'
            }else{
                return 'Complated'
            }
        }
    },
    mounted() { 
        this.getTicketsHandler();
    }
}
</script>

<style>
    .ticket-link{
        text-decoration: none;
    }

    .tickets{
        margin-left: 300px;
    }

    #app > div > div > div > a{
        text-decoration: none;
        margin-bottom: 15px;
    }

    .ticket{
        margin-top: 15px;
    }

    #app > div > div > div > a > span{
        margin-left: 10px;
    }
</style>