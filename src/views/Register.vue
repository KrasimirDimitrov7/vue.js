<template>
    <div class="register">
        <form @submit.prevent="registerHandler()">
            <div class="field">
                <label for="name">Name:</label>
                <input type="text" id="name" placeholder="Name..." v-model.trim="name" @input="$v.name.$touch()">
                <div class="field-error" v-if="!$v.name.required">Field is required</div>
                <div class="field-error" v-if="!$v.name.minLength">Name should be at least 4 characters long</div>
                <template v-if="errors && errors.name">
                    <div class="field-error" v-for="(error, index) in errors.name" :key="index">
                        {{error}}
                    </div>
                </template>
            </div>
            <div class="field">
                <label for="email">email:</label>
                <input type="email" id="email" placeholder="Email..." v-model.trim="email" @input="$v.email.$touch()">
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
                <input type="password" id="password" placeholder="Password..." v-model.trim="password" @input="$v.password.$touch()">
                <div class="field-error" v-if="!$v.password.required">Field is required</div>
                <div class="field-error" v-if="!$v.password.minLength">Password should be at least 8 characters long</div>
                <template v-if="errors && errors.password">
                    <div class="field-error" v-for="(error, index) in errors.password" :key="index">
                        {{error}}
                    </div>
                </template>
            </div>
            <div class="field">
                <label for="confirm-password">confirm-password:</label>
                <input type="password" id="confirm-password" placeholder="Confirm Password..." v-model="confirmPassword">
                <div class="field-error" v-if="!$v.confirmPassword.required">Field is required</div>
                <div class="field-error" v-if="!$v.confirmPassword.sameAsPassword">Same as password</div>
            </div>
            <button :disabled="$v.$invalid">Register</button>
        </form>
    </div>
</template>

<script>
import authMixin from '@/mixins/auth.vue'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'Register',
    mixins: [authMixin],
    data(){
        return {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            errors: null
        }
    },
    methods: {
        registerHandler(){
            let dataToSend = {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.confirmPassword,
            }
            this.register(dataToSend)
            .then(()=>{
                this.$router.push('/login');
            })
            .catch(err => {
                this.errors = err.response.data.errors;
                setTimeout(()=> {
                    this.errors = null
                }, 5000);
            });
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        },
        confirmPassword: {
            required,
            sameAsPassword: sameAs('password')
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