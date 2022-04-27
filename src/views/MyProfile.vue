<template>
    <div class="my-profile" v-if="profile">
        <div class="image-holder">
            <img 
                v-if="profile.avatar || imageToUpload" 
                :src="profile.avatar ? 'http://taskapi.digitalsliven.com' + profile.avatar : imageToUpload"
            >
            <img v-else src="@/assets/profile-image.png">
            <input type="file" @change="addFile($event)" accept="image/*">
        </div>
        <div class="form-holder">
            <form @submit.prevent="editProfileHandler()" v-if="profile">
                <div class="field">
                    <label for="name">Name: </label>
                    <input type="text" id="name" v-model="profile.name">
                </div>
                <div class="field">
                    <label for="email">Email: </label>
                    <input type="email" id="email" v-model="profile.email">
                </div>
                <div class="field">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="profile.password">
                </div>
                <div class="field">
                    <label for="phone">Phone: </label>
                    <input type="tel" id="phone" v-model="profile.phone">
                </div>
                <button>Update Profile</button>
                <div class="success-message" v-if="requestSuccess">
                    Your profile has been updated successfully
                </div>
            </form>
            <button @click="logoutHandler()">Logout</button>
        </div>
    </div>
</template>

<script>
import userMixin from '@/mixins/user.vue'
import authMixin from '@/mixins/auth.vue'
    export default {
        name: 'MyProfile',
        mixins: [userMixin, authMixin],
        data(){
            return {
                profile: null,
                requestSuccess: false,
                selectedFile: null,
                fileExt: null,
                fileName: null,
                imageToUpload: null
            }
        },
        methods: {
            getProfileHandler() {
                this.getProfile()
                    .then(res => {
                        this.profile = res.data.user;
                    })
            },
            editProfileHandler() {
                let dataToSend = {
                    ...this.profile,
                    workspace_id: 199,
                    workspace_language: 'bg'
                }

                this.editProfile(dataToSend)
                    .then(()=>{
                        this.requestSuccess = true;
                        setTimeout(()=> {
                            this.requestSuccess = false;
                        }, 5000);
                    })
            },
            addFile(event) {
                this.selectedFile = event.target.files[0];
                
                const file = event.target.files[0];
                this.fileExt = file.name.split('.').pop();
                const pattern = /image-*/;
                const reader = new FileReader();
                if (!file.type.match(pattern)) {
                    alert('Invalid format');
                    return;
                }

                this.fileName = file.name;
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsDataURL(file);
            },
            _handleReaderLoaded(e) {
                const reader = e.target;
                this.imageToUpload = reader.result;

                const dataToSend = {
                    name: this.profile.name,
                    email: this.profile.email,
                    avatar: this.imageToUpload
                }

                this.editProfile(dataToSend);
                },
            logoutHandler() {
                this.logout();
            }
        },
        mounted(){
            this.getProfileHandler();
        }
    }
</script>

<style scoped>
    .my-profile {
        display: flex;
    }

    .image-holder img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
</style>