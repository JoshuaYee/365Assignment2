<template>
<div >

 <v-container>
<v-label for="emailInput">Email: </v-label><v-text-field type="text" v-model="emailPost" name="emailInput"></v-text-field>

<v-label for="passwordInput">Password: </v-label> <v-text-field type="password" v-model="passwordPost" name ="passwordInput"></v-text-field>

<v-btn type="button" v-on:click="Login()">Login</v-btn>
<v-btn type="button" v-on:click="Register()">Register</v-btn>

<label> {{ errorLabel }} </label>
 </v-container>


</div>
</template>

<script>
export default {
        data (){
                return{
                    errorLabel: "",
                    errorFlag: false,
                    petitionData: [],
                    emailPost: "",
                    passwordPost: ""
                }
            },
    mounted: function() {
     this.checkLoggedStatus();
    },
    methods: { 
            Login: function() {
                console.log(this.emailPost)
                this.$http.post('http://localhost:4941/api/v1/users/login', {email: this.emailPost, password: this.passwordPost})
                .then((response) => {
                this.$cookies.set("userId", response.data.userId);
                this.$cookies.set("authToken", response.data.token);
                this.$router.push("/users/" + this.$cookies.get("userId"));

            })
            .catch((error) => {
                this.errorLabel = error;
                this.errorFlag = true;
            });
        },
        checkLoggedStatus: function() {
            if(this.$cookies.get("authToken")) {
                this.$router.push("/users/" + this.$cookies.get("userId"));
            }
        },
            Register: function() {
                this.$router.push("/usersregister/")
            }
    },
}
</script>