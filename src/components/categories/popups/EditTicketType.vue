<template>
  <div class="new-category popup">
      <div class="popup-box">
          <div class="popup-header">
            <h4>Add new category</h4>
            <a class="close" @click="$emit('close')">X</a>
          </div>
          <div class="popup-content">
              <form @submit.prevent="editTickettypeHandler()">
                  <div class="field">
                      <label for="name">Title:</label>
                      <input type="text" id="title" placeholder="Title..." v-model="tickettype.title">
                  </div>
                  <button >Update Ticket Type</button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import tickettypeMixin from '@/mixins/tickettype'

    export default {
        name: 'NewTickettype',
        mixins: [tickettypeMixin],
        props: {
            tickettype: Object
        },
        methods: {
            editTickettypeHandler() {
                let dataToSend = {
                    title: this.tickettype.title
                }

                this.editTickettype(this.tickettype.id, dataToSend)
                    .then(()=>{
                        this.$emit('updated');
                    });
            }
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
</style>