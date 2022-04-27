<template>
  <div class="new-category popup">
      <div class="popup-box">
          <div class="popup-header">
            <h4>Add new category</h4>
            <a class="close" @click="$emit('close')">X</a>
          </div>
          <div class="popup-content">
              <form @submit.prevent="createCategoryHandler()">
                  <div class="field">
                      <label for="name">Category Name:</label>
                      <input type="text" id="name" placeholder="Category Name..." v-model="name">
                  </div>
                  <div class="field">
                      <label for="name">Location:</label>
                      <input type="text" id="name" placeholder="Location..." v-model="location">
                  </div>
                  <div class="field">
                      <label for="name">Description:</label>
                      <input type="text" id="name" placeholder="Description..." v-model="description">
                  </div>
                  <button >Create category</button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import categoriesMixin from '@/mixins/categories'

    export default {
        name: 'NewCategory',
        mixins: [categoriesMixin],
        data() {
            return {
                name: null,
                location: null,
                description: null
            }
        },
        methods: {
            createCategoryHandler() {
                let dataToSend = {
                    name: this.name,
                    location: this.location,
                    description: this.description
                }

                this.createCategory(dataToSend)
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