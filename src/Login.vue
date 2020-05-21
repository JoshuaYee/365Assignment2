

<template>
<div >

 <v-container>
<v-card-title>About Me</v-card-title>
<v-label for="emailInput">Email: </v-label><v-text-field type="text" ref="emailPost" name="emailInput"></v-text-field>

<v-label for="passwordInput">Password: </v-label> <v-text-field type="password" ref="passwordPost" name ="passwordInput"></v-text-field>

<v-btn type="button" v-on:click="Login()">Click Me!</v-btn>

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
                    petitionSigs: []
                }
            },
    mounted: function() {

    },
    methods: { 
            Login: function() {
                this.$http.post('http://localhost:4941/api/v1/users/login', {email: this.$refs.emailPost.value,password: this.$refs.passwordPost.value})
                .then((response) => {
                this.petitionData = response.data;
                Cookies.set("X-Authorization", response.headers.get("X-Authorization"))

            })
            .catch((error) => {
                this.errorLabel = error;
                this.errorFlag = true;
            });
        }
    },
}
</script>