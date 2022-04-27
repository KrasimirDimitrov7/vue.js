<script>
import axios from 'axios'

export default {
    methods: {
        getProfile(){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/me', {
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
        editProfile(data){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/me', {
                    method: 'PATCH',
                    data: data
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        getAllUsers(){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/users', {
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
        assignToUser(id, data){
            return new Promise((resolve, reject) => {
                axios(`http://taskapi.digitalsliven.com/api/tickets/assign/${id}`, {
                    method: 'POST',
                    data: data
                })
                    .then(res => {
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
    }
}
</script>