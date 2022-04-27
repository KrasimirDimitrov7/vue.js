<template>
  <div class="edit-category popup">
      <div class="popup-box">
          <div class="popup-header">
            <h4>Edit category</h4>
            <a class="close" @click="$emit('close')">X</a>
          </div>
          <div class="popup-content">
              <form @submit.prevent="editCategoryHandler()">
                  <div class="field">
                      <label for="name">Category Name:</label>
                      <input type="text" id="name" placeholder="Category Name..." v-model="category.name">
                  </div>
                  <div class="field">
                      <label for="name">Location:</label>
                      <input type="text" id="name" placeholder="Location..." v-model="category.location">
                  </div>
                  <div class="field">
                      <label for="name">Description:</label>
                      <input type="text" id="name" placeholder="Description..." v-model="category.description">
                  </div>
                  <button >Update category</button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import categoriesMixin from '@/mixins/categories'

    export default {
        name: 'EditCategory',
        mixins: [categoriesMixin],
        props: {
            category: Object
        },
        methods: {
            editCategoryHandler() {
                let dataToSend = {
                    name: this.category.name,
                    location: this.category.location,
                    description: this.category.description
                }

                this.editCategory(this.category.id, dataToSend)
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