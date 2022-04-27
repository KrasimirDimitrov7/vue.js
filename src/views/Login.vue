<template>
    <div class="login">
        <form @submit.prevent="loginHandler()">
            <template v-if="checkUserError">
                <div class="field-error">
                    {{checkUserError}}
                </div>
            </template>
            <div class="field">
                <label for="email">email:</label>
                <input type="email" id="email" placeholder="Email..." v-model="email">
                <div class="field-error" v-if="!$v.email.required">Field is required</div>
                <div class="field-error" v-if="!$v.email.email">Need to be email</div>
                <template v-if="errors && errors.email">
                    <div class="field-error" v-for="(error, index) in errors.email" :key="index">
                        {{error}}
                    </div>
                </template>
            </div>
            <div class="field">
                <label for="password">password:</label>
                <input type="password" id="password" placeholder="Password..." v-model="password">
                <div class="field-error" v-if="!$v.password.required">Field is required</div>
                <div class="field-error" v-if="!$v.password.minLength">Password should be at least 8 characters long</div>
                <template v-if="errors && errors.password">
                    <div class="field-error" v-for="(error, index) in errors.password" :key="index">
                        {{error}}
                    </div>
                </template>
            </div>
            <button :disabled="$v.$invalid">Login</button>
        </form>
    </div>
</template>

<script>
import authMixin from '@/mixins/auth.vue'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    mixins: [authMixin],
    data(){
        return {
            email: null,
            password: null,
            errors: null,
            checkUserError: null
        }
    },
    methods: {
        loginHandler(){
            let dataToSend = {
                email: this.email,
                password: this.password,
            }
            this.login(dataToSend)
            .then(()=>{
                this.$router.push('/my-profile');
            })
            .catch(err => {
                this.checkUserError = err.response.data.data;
                setTimeout(()=> {
                    this.checkUserError = null
                }, 5000);

                this.errors = err.response.data.errors;
                setTimeout(()=> {
                    this.errors = null
                }, 5000);
            });
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
    }
}
</script>

<style scoped>
    form{
        width: 800px;
        margin: 50px auto;
    }

    .field{
        width: 100%;
        margin-bottom: 20px;
    }

    .field label{
        display: block;
        font-size: 18px;
    }

    .field input{
        width: 100%;
        font-size: 18px;
    }

    .field-error{
        border-radius: 8px;
        border: 1px solid red;
        background: rgb(255, 235, 235);
        color: red;
        padding: 5px 10px;
        font-size: 18px;
        margin: 5px;
    }

    button{
        font-size: 18px;
    }
</style>