import Vue from 'vue'

const authStore = new Vue({
    data() {
        return {
            userToken: localStorage.getItem('auth-token') || null
        }
    },
    methods: {
        setToken(token) {
            this.userToken = token;
        }
    }
})

export default authStore;