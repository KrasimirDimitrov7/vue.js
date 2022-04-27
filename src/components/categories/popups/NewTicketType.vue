<template>
  <div class="new-category popup">
      <div class="popup-box">
          <div class="popup-header">
            <h4>Add new category</h4>
            <a class="close" @click="$emit('close')">X</a>
          </div>
          <div class="popup-content">
              <form @submit.prevent="createTickettypeHandler()">
                  <div class="field">
                      <label for="name">Category Name:</label>
                      <input type="text" id="name" placeholder="Title..." v-model="title">
                  </div>
                  <button >Create Ticket Type</button>
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
        data() {
            return {
                title: null,
            }
        },
        methods: {
            createTickettypeHandler() {
                let dataToSend = {
                    title: this.title,
                }

                this.createTickettype(dataToSend)
                    .then(()=>{
                        this.$emit('created');
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