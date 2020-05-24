
<template>
<div >
<v-container>
<v-form>
<v-text-field
    v-model="userData.name"
    label="Name"
    ref="editedName"
></v-text-field>

<v-text-field
    v-model="userData.email"
    label="Email"
    ref="editedEmail"
    
></v-text-field>
<v-text-field
v-model="userData.city"
    label="City"
    ref="editedCity"
></v-text-field>
<v-text-field
    v-model="userData.country"
    label="Country"
    ref="editedCountry"
></v-text-field>
<v-text-field
    v-model="currentPassword"
    type = Password
    label="Old Password"
    
    ref="editedCountry"
></v-text-field>
<v-text-field
    v-model="password"
    label="New Password"
    type= Password

    ref="editedCountry"
></v-text-field>
<v-card>
    <img :src="profilePic" width="100" height="100" alt="User Image">
    <v-file-input v-model="newImage" accept="image/*" label="Edit Profile Picture" prepend-icon="mdi-camera"></v-file-input>
</v-card>
</v-form>
<br>
<v-btn @click="saveEdit()">Save Changes</v-btn>
<v-btn @click="cancelEdit()">Cancel</v-btn>
<v-btn @click="clearPP()">Clear profile picture (will not save changes)</v-btn>
<v-label {{errorLabel}}></v-label>
</v-container>
</div>
</template>

<script>
export default {
        data (){
                return{
                    errorLabel: "",
                    errorFlag: false,
                    userData: [],
                    profilePic: "",
                    newData:{},
                    url: "",
                    newImage : null,
                    currentPassword:'',
                    password:null,
                    fileTypePatch: null
   
                }
            },

    mounted: function() {
    this.validateUser();
    this.getUserData();
    this.getProfilePic();
    },
    methods: { 
         saveEdit: function() {
             var newData;
             if (this.password){
                 console.log("PASSWORD FOUND")
             newData = {
                 name :this.userData.name,
                  email :this.userData.email,
                  city :this.userData.city,
                  country :this.userData.country,
                   password: this.password,
                currentPassword: this.currentPassword
             };
             } else {
                console.log("NO PASSWORD FOUND")
                 newData = {
                 name :this.userData.name,
                  email :this.userData.email,
                  city :this.userData.city,
                  country :this.userData.country,
                 };
             }
            
            this.uploadImage();
             console.log("new data below")
             console.log(newData)
                this.$http.patch('http://localhost:4941/api/v1/users/' + this.$route.params.id, newData,{
                    headers: {
                        "X-Authorization": this.$cookies.get('authToken')
                    }
                })

                .then((response) => {
                //back to user page
                this.$router.push("/users/" + this.$cookies.get("userId"));
            })
            .catch((error) => {
                
                this.errorLabel = error;
                this.errorFlag = true;
            });

        },    
        uploadImage: function(){
            const fileType = this.newImage.name.split(".")[1]
            this.fileTypePatch = fileType
            if(this.newImage){
                this.$http.put("http://localhost:4941/api/v1/users/" + this.$route.params.id + "/photo", this.newImage, {
                    headers:{
                        'X-Authorization':this.$cookies.get('authToken'),
                        'Content-Type': "image/" + this.fileTypePatch
                    }
                }).then((response) => {
                    console.log("Success");
                }).catch((error) =>{
                    console.log(error)
                })
        }
        },

        cancelEdit: function() {
            this.$router.push("/users/"+ this.$cookies.get('userId'));
        },

            getUserData: function() {
                this.$http.get('http://localhost:4941/api/v1/users/' + this.$route.params.id,{
                headers: {
                        'Content-Type': 'application/json',
                        "X-Authorization": this.$cookies.get('authToken')
                    }
                    })
                
                .then((response) => {
                console.log(response.data);
                this.userData = response.data;

            })
            .catch((error) => {
                
                this.error = error;
                this.errorFlag = true;
            });
        },
            getProfilePic: function() {
                this.$http.get('http://localhost:4941/api/v1/users/' + this.$route.params.id + "/photo", {responseType:'blob'})
                .then((response) => {
                this.profilePic = URL.createObjectURL(response.data);
            })
            .catch((error) => {
                this.profilePic = require('./assets/defaultPP.png');
            });
        },
        clearPP: function(){
            this.$http.delete('http://localhost:4941/api/v1/users/' + this.$cookies.get('userId') + '/photo/', {
                headers: {
                    'X-Authorization': this.$cookies.get('authToken')
                }
            }).then((response) => {
                this.$router.push("/users/" + this.$cookies.get('userId'));
            })
            .catch((error) => {
                this.error = error.response.statusText;
                this.errorFlag = true;
            });
            
        },
        validateUser: function() {
            if(!(this.$route.params.id === this.$cookies.get("userId"))){
                 this.$router.push("/usersedit/" + this.$cookies.get("userId"));
            }
        }
    },
}
</script>