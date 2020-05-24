<template>
    <v-container>
        <h2>Your Profile</h2>
        <v-container>
            <h3>{{user.name}}</h3>
            <h4>Email: {{user.email}}</h4>
            <h4>From: {{user.city}}, {{user.country}}</h4>
            <img :src="userImage" width="100" height="100" alt="User Image">
            <v-btn color="orange darken-2" @click="editProfile()">Edit Profile</v-btn>
            <v-btn color="orange darken-2" @click="viewPetitions()">Checkout petitions</v-btn>
            <v-btn color="orange darken-2" @click="logout()">Logout</v-btn>
        </v-container>
        <h3>Petitions ive made:</h3>

                <v-list-item-content v-for="item in userPetitions">
                    <v-card>
                    <v-list-item-avatar>
                        <v-img :src="profilePic"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-title> My Petition: {{item.title}} </v-list-item-title>
                    <v-list-item-subtitle> Category: {{item.category}}</v-list-item-subtitle>
                    <v-list-item-subtitle>Total Signatures: {{item.signatureCount}}</v-list-item-subtitle>
                    <img :src="getPetitionImage(item.petitionId)" onerror="this.src='../src/assets/logo.png'" width="100" height="100" alt="User Image">
                    <v-btn @click="goToPetition(item.petitionId)"> Visit this petition</v-btn>
                    </v-card>
                </v-list-item-content>

    </v-container>
</template>


<script>
export default {
    //auth
    data() {
        return {
            error: "",
            errorFlag: false,
            user: {},
            userImage: "",
            userPetitions: {}
        }
    },
    mounted: function(){
        this.validateUser();
        this.getUser();
        this.getUserImage();
        this.getUsersCreatedPetition();
    },
    methods: {
        getUser: function(){
            this.$http.get('http://localhost:4941/api/v1/users/' + this.$route.params.id,{
                headers: {
                        'Content-Type': 'application/json',
                        "X-Authorization": this.$cookies.get('authToken')
                    }
                    })
            .then((response) => {
                this.user = response.data;
            })
            .catch((error) => {

            });
        },
        getPetitionImage: function(petitID){
          //this.isBusy = true
          console.log("HELLOOO")
            return 'http://localhost:4941/api/v1/petitions/' + petitID + "/photo";
        },
        getUsersCreatedPetition: function(){
            this.$http.get('http://localhost:4941/api/v1/petitions/?authorId=' + this.$route.params.id)
            .then((response) => {
                //bunch of error checking
                //needs images
                this.userPetitions = response.data;
            })
            .catch((error) => {

            });
        },
        goToPetition: function(id){
          this.$router.push("/petitions/" + id);//find user
            
        },
        getUserImage: function(){
            this.$http.get('http://localhost:4941/api/v1/users/' + this.$route.params.id + "/photo", {responseType:'blob'})
            .then((response) => {
                //bunch of error checking
                //needs images
                this.userImage = URL.createObjectURL(response.data);
            })
            .catch((error) => {
                this.userImage = require("./assets/defaultPP.png");
            });
        },
        editProfile: function(){
            this.$router.push("/usersedit/"+ this.$route.params.id);
            
        },
        viewPetitions: function(){
            this.$router.push("/viewpetitions/");
            
        },
        logout: function(){
            this.$http.post('http://localhost:4941/api/v1/users/logout', {}, {
                headers: {
                    'X-Authorization': this.$cookies.get('authToken')
                }
            }).then((response) => {
                this.$cookies.remove("userId")
                this.$cookies.remove("authToken")
                this.$router.push("/userslogin/");
            })
            
        },
        validateUser: function() {
            if(!(this.$route.params.id === this.$cookies.get("userId"))){
                 this.$router.push("/users/" + this.$cookies.get("userId"));
            }
        }
    }
}
</script>