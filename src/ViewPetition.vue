

<template>
<div >
<v-container>
<h1>Petition Title</h1>
<p>{{petitionData.title}}</p>
<h1>Petition Id</h1>
<p>{{petitionData.petitionId}}</p>
<h1>Petition description</h1>
<p>{{petitionData.description}}</p>
<h1>Author</h1>
<p>Author Picture</p>
<img :src="userImage" width="100" height="100" alt="User Image">
<p>Author name</p>
<p>{{petitionData.authorName}}</p>
<p>Author ID</p>
<p>{{petitionData.authorId}}</p>
<p>Author city</p>
<p>{{petitionData.authorCity}}</p>
<p>Author country</p>
<p>{{petitionData.authorCountry}}</p>
<h1>Petition Photo</h1>
<img :src="photoData" width="100" height="100" alt="NO IMG HERE">
<h1>Signature Number </h1>
<p>{{petitionData.signatureCount}}</p>
<h1>Category</h1>
<p>{{petitionData.category}}</p>
<h1>Created Date</h1>
<p>{{petitionData.createdDate}}</p>
<h1>Closing Date</h1>
<p>{{petitionData.closingDate}}</p>
<h1>List of signatures</h1>
<v-label v-if= this.errorFlag> {{error}}</v-label>

                <v-list-item-content v-for="item in petitionSigs">
                    <v-card>

                    <v-list-item-title> {{item.name}} at {{item.signedDate}}</v-list-item-title>
                    <v-list-item-subtitle>From {{item.city}} {{item.country}}</v-list-item-subtitle>
                    <img :src="getSignatoryImage(item.signatoryId)" onerror="this.src='../src/assets/defaultPP.png'" width="100" height="100" alt="User Image">
                    </v-card>
                </v-list-item-content>

<v-btn @click="signThisPetition()">Sign This petition</v-btn>
<v-btn @click="removeSignature()">Remove your signature</v-btn>
<v-btn @click="backToPetitions()">Back to all Petitions</v-btn>
<v-btn @click="toUser()">Back to my Profile</v-btn>
<v-btn @click="editPetition()">Edit your Petition</v-btn>
<v-btn @click="deletePetition()">Delete your Petition</v-btn>
</v-container>
</div>
</template>

<script>
export default {
        data (){
                return{
                    error: "",
                    errorFlag: false,
                    petitionData: [],
                    petitionSigs: [],
                    photoData: "",
                    profilePic: "",
                    userImage: "",
                }
            },
    mounted: function() {
    this.getPetition();
    this.getSigs();
    this.getPhoto();
    // this.getProfilePic();
    // this.getUserImage();
    },
    methods: { 
            getPetition: function() {
                this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.id)
                .then((response) => {
                this.petitionData = response.data;
                this.getUserImage();

            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },
            backToPetitions: function() {
            this.$router.push("/viewpetitions/");
        },
            toUser: function() {
            this.$router.push("/users/"+ this.$cookies.get('userId'));
        },
        signThisPetition: function(){
            this.$http.post('http://localhost:4941/api/v1/petitions/' + this.$route.params.id + '/signatures/', {}, {
                headers: {
                    'X-Authorization': this.$cookies.get('authToken')
                }
            }).then((response) => {
                this.$router.push("/viewpetitions/");
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
            
        },
        editPetition: function(){
            if(this.petitionData.authorId == this.$cookies.get("userId")) {
                this.$router.push("/editpetition/" + this.petitionData.petitionId);
            }
            else {
                console.log("not ur petition to edit")
            }
        },
        deletePetition:function() {
        this.$http.delete('http://localhost:4941/api/v1/petitions/' + this.$route.params.id, {
                headers: {
                    'X-Authorization': this.$cookies.get('authToken')
                }
            }).then((response) => {
                this.$router.push("/viewpetitions/");
            })
            .catch((error) => {
                this.error = error.response.statusText;
                this.errorFlag = true;
            });
            
        },
        removeSignature: function(){
            this.$http.delete('http://localhost:4941/api/v1/petitions/' + this.$route.params.id + '/signatures/', {
                headers: {
                    'X-Authorization': this.$cookies.get('authToken')
                }
            }).then((response) => {
                this.$router.push("/viewpetitions/");
            })
            .catch((error) => {
                this.error = error.response.statusText;
                this.errorFlag = true;
            });
            
        },
    
    
        getUserImage: function(){
            this.$http.get('http://localhost:4941/api/v1/users/' + this.petitionData.authorId + "/photo", {responseType:'blob'})
            .then((response) => {
                //bunch of error checking
                //needs images
                this.userImage = URL.createObjectURL(response.data);
            })
            .catch((error) => {
                this.userImage = require("./assets/defaultPP.png");
            });
        },
            getPhoto: function() {
                this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.id + "/photo", {responseType:'blob'})
                .then((response) => {
                this.photoData = URL.createObjectURL(response.data);
            })
            .catch((error) => {
                this.photoData = require("./assets/logo.png"); //default pic
            });
        },        
        getSignatoryImage: function(SigID){
          //this.isBusy = true
          console.log("HELLOOO")
            return 'http://localhost:4941/api/v1/users/' + SigID + "/photo";
        },
        getSigs: function() {
                this.$http.get('http://localhost:4941/api/v1/petitions/'+ this.$route.params.id + '/signatures')
                .then((response) => {
                this.petitionSigs = response.data;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        }
    },
}
</script>