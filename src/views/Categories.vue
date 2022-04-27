<template>
  <div class="categories">
    <h1>Categories</h1>
    <button style="margin: 20px 0" @click="addCategoryHandler()">Add categories</button>
    <div class="categories-list">
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Location</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
          >
            <td>{{category.id}}</td>
            <td>{{category.name}}</td>
            <td>{{category.location}}</td>
            <td>{{category.description}}</td>
            <td>{{category.created_at | formatDate}}</td>
            <td>
              <button @click="editCategoryHandler(category)">Edit</button>
              <button @click="deleteCategoryHandler(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <NewCategory
      v-if="newPopup"
      @close = "newPopup = false"
      @created="createdCategoryHandler()"
    />
    <EditCategory
      v-if="editItem"
      :category="editItem"
      @close="editItem = null"
      @updated="updatedCategoryHandler()"
    />
  </div>
</template>

<script>
import categoriesMixin from '@/mixins/categories'
import NewCategory from '@/components/categories/popups/NewCategory.vue'
import EditCategory from '@/components/categories/popups/EditCategory.vue'


export default {
    name: 'Categories',
    mixins: [categoriesMixin],
    components: {
      NewCategory,
      EditCategory
    },
    data() {
      return {
        categories: null,
        newPopup: false,
        editItem: null
      }
    },
    methods: {
      getCategoriesHandler() {
        this.getCategories()
        .then( res => {
          this.categories = res.data.categories;
        });

      },
      addCategoryHandler(){
        this.newPopup = true;
      },
      createdCategoryHandler() {
        this.newPopup = false;
        this.getCategoriesHandler();
      },
      deleteCategoryHandler(categoryId) {
        this.deleteCategory(categoryId) 
          .then(()=>{
            this.getCategoriesHandler();
          })
      },
      editCategoryHandler(category) {
        this.editItem = category;
      },
      updatedCategoryHandler() {
        this.editItem = null;
        this.getCategoriesHandler();
      }
    },
    mounted() {
      this.getCategoriesHandler();
    }
}
</script>

<style>

</style>