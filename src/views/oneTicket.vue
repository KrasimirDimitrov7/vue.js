<template>
    <div v-if="ticket" class="one-ticket">
        <div>
            <a @click="$router.go(-1)">Back</a>
        </div>
        <div class="mark-and-delete">
            <button @click="completeTaskHandler(ticket)">
                <span v-if="ticket.status == 1">Complete</span>
                <span v-else>Incomplete</span>
            </button>
            <div class="assigned">
                <!-- <span v-if="ticket.assignee_id == 0">Unassigned</span>
                <span v-else>{{ isAssigned }}</span> -->

                <!-- <div class="block" v-for="user in users" :key="user.id">
                    <div @click="assignToUserHandler(user)">
                        {{user.name}}
                    </div>
                </div> -->
            </div>
             <select @change="assignToUserHandler($event)" class="form-control">
                <option v-if="ticket.assignee_id == 0">Unassigned</option>
                <option v-else>{{ isAssigned }}</option>
                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
            <button @click="deleteTicketHandler()">
                Delete Ticket
            </button>
        </div>

        <div>
            <DeleteTicket
                v-if="newPopup"
                @close = "newPopup = false"
                @created="createdCategoryHandler()"
            />
        </div>
        <div>
            <form @submit.prevent="editTicketHandler(ticket)" v-if="ticket">
                <div class="field">
                    <label for="name">Add Title </label>
                    <input type="text" id="title" v-model="ticket.description">
                </div>
                <select @change="selectCategory($event)" class="form-control">
                    <option>{{ticket.category.name}}</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
                <div class="field">
                    <label for="name">Notes </label>
                    <input type="text" id="note" v-model="ticket.notes">
                </div>
                <button>Submit</button>
            </form>
             <span class="ticket-date">
                {{ticket.created_at | formatDate}}
            </span>
        </div>
    </div>
</template>

<script>
import ticketsMixin from '@/mixins/tickets.vue'
import userMixin from '@/mixins/user.vue'
import categoriesMixin from '@/mixins/categories.vue'
import DeleteTicket from '@/components/categories/popups/DeleteTicket.vue'

export default {
    name: 'oneTicket',
    mixins: [ticketsMixin, userMixin, categoriesMixin],
    components: {
      DeleteTicket
    },
    data(){
        return {
            ticket: null,
            users: [],
            categories: null,
            newPopup: false,
            value: null,
            value2: null       
        }
    },
    computed: {
        isAssigned: function () {
            var users = this.users;
            var ticket = this.ticket;
            for (let i = 0; i < users.length; i++){
                if(users[i].id == ticket.assignee_id){
                    return users[i].name
                }
            }
        }
    },
    methods: {
        getATicketHandler() {
            this.getATicket(this.$route.params.ticket_id)
                .then(res => {
                    this.ticket = res.data.ticket;
                    console.log(res.data.ticket)
                })
        },
        getUsersHandler() {
            this.getAllUsers()
                .then(res => {
                    //console.log(res.data.users)
                    this.users = res.data.users;
                })
        },
        getCategoriesHandler() {
            this.getCategories()
                .then(res => {
                    this.categories = res.data.categories;
                })
        },
        assignToUserHandler(event) {
            this.value2 = event.target.value;
            console.log(this.value2);
            
            let dataToSend = {};
            dataToSend.user_id = this.value2;
            this.assignToUser(this.$route.params.ticket_id, dataToSend)
                .then(()=>{
                    this.getATicketHandler();
                })

        },
        completeTaskHandler(ticket) {
            //console.log(ticket.status);
            let dataToSend = {};

            if(ticket.status == 0){
                dataToSend.status = 1;
            }else{
                dataToSend.status = 0;
            }
            this.changeTicketStatus(ticket.id, dataToSend)
                .then(()=>{
                    this.getATicketHandler();
                })
        },
        deleteTicketHandler(){
            this.newPopup = true;
        },
        selectCategory(event) {
            this.value = event.target.value;
        },
        editTicketHandler(ticket) {
            if(this.value == null){
                var id = 1;
            }else{
                var id = this.value;
            }
            
            console.log(id);
            let dataToSend = {
                ...this.ticket,
                category_id: id,
                ticket_type_id: 1
            }
            this.editTicket(ticket.id, dataToSend);
        },
    },
    mounted() {
        this.getATicketHandler();
        this.getUsersHandler();
        this.getCategoriesHandler();
    }
}
</script>

<style>
    .mark-and-delete{
        display: flex;
        margin-top: 30px;
        align-items: center;
        justify-content: center;
    }
    .assigned{
        position: relative;
    }

    label {
        display: block;
    }
    .field{
        margin: 20px 20px 20px 0;
    }
    
    #app > div > div.mark-and-delete > select{
        margin: 0 30px 0 30px !important;
    }

    input{
        width: 350px;
    }
    
    #app > div > div:nth-child(4) > form > button{
        margin-bottom: 30px;
    }

    .one-ticket{
        text-align: center;
        align-items: center;
        justify-content: center;

    }
</style>