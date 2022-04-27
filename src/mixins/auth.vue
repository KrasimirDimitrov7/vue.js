<script>
import axios from 'axios'
import authStore from '@/store/auth.js'

export default {
    methods: {
        register(data){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/register', {
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
        login(data){
            return new Promise((resolve, reject) => {
                axios('http://taskapi.digitalsliven.com/api/login', {
                    method: 'POST',
                    data: data
                })
                    .then(res => {
                        let authToken = res.data.token;
                        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                        localStorage.setItem('auth-token', res.data.token);
                        authStore.setToken(res.data.token);
                        resolve(res); 
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        logout() {
            return new Promise((resolve) => {
                localStorage.setItem('auth-token', null);
                authStore.setToken(null);
                this.$router.push('/login');
            })
        }
    }
}
</script>