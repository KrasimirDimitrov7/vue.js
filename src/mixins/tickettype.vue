<script>
import axios from 'axios'
import authStore from '@/store/auth.js'

if(authStore.userToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.userToken}`
}
export default {
    methods: {
        getTickettypes(){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/ticket-types', {
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
        getATickettype(tickettypeId){
            return new Promise((resolve, reject) => {
                axios(`http://taskapi.digitalsliven.com/api/ticket-types/${tickettypeId}`, {
                    method: 'GET',
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        createTickettype(data){
            return new Promise((resolve, reject) => {
                axios(`http://taskapi.digitalsliven.com/api/ticket-types`, {
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
        deleteATickettype(tickettypeId){
            return new Promise((resolve, reject) => {
                axios(`http://taskapi.digitalsliven.com/api/ticket-types/${tickettypeId}`, {
                    method: 'DELETE',
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        editTickettype(tickettypeId, data){
            return new Promise((resolve, reject) => {
                axios(`http://taskapi.digitalsliven.com/api/ticket-types/${tickettypeId}`, {
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
        }
    }
}
</script>