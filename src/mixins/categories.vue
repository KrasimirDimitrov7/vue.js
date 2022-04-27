<script>
import axios from 'axios'
import authStore from '@/store/auth.js'

if(authStore.userToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.userToken}`
}
export default {
    methods: {
        getCategories(){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/categories', {
                    method: 'GET'
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        createCategory(data){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/categories', {
                    method: 'POST',
                    data:data
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        editCategory(categoryId, data){
            return new Promise((resolve, reject) => {
                axios(`http://taskapi.digitalsliven.com/api/categories/${categoryId}`, {
                    method: 'PATCH',
                    data:data
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        deleteCategory(categoryId){
            return new Promise((resolve, reject) => {
                axios(`http://taskapi.digitalsliven.com/api/categories/${categoryId}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }
    }
}
</script>