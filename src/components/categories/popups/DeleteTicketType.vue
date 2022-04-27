<template>
  <div class="new-category popup">
      <div class="popup-box">
          <div class="popup-header">
            <h4>Would you like to delete the ticket type</h4>
            <a class="close" @click="$emit('close')">X</a>
          </div>
          <div class="popup-content">
              <button @click="deleteTickettypeHandler()">Yes</button>
              <button @click="$emit('close')">No</button>
          </div>
      </div>
  </div>
</template>

<script>
import tickettypeMixin from '@/mixins/tickettype'

    export default {
        name: 'DeleteTicket',
        mixins: [tickettypeMixin],
        props: {
            tickettype: Object
        },
        methods: {  
            deleteTickettypeHandler() {
                this.deleteATickettype(this.tickettype.id)
                    .then(()=>{
                        this.$emit('updated');
                    })
            }
        },
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