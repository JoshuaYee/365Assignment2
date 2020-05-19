<template>
<div >
<label for="emailInput">Email: </label><input type="text" ref="emailPost" name="emailInput">
<br>
<br>
<label for="passwordInput">Password: </label> <input type="password" ref="passwordPost" name ="passwordInput">
<br>
<button type="button" v-on:click="Login()">Click Me!</button>
<br>
<label> {{ errorLabel }} </label>


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
    this.getPetition();
    this.getSigs();
    },
    methods: { 
            Login: function() {
                this.$http.post('http://csse-s365.canterbury.ac.nz:4001/api/v1/users/login', {email: this.$refs.emailPost.value,password: this.$refs.passwordPost.value})
                .then((response) => {
                this.petitionData = response.data;

            })
            .catch((error) => {
                this.errorLabel = error;
                this.errorFlag = true;
            });
        }
    },
}
</script>