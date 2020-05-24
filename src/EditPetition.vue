
<template>
<div >
<v-container>
<v-form>
<v-text-field
    v-model="petitionData.title"
    label="Title"
    ref="editedName"
></v-text-field>

<v-text-field
    v-model="petitionData.description"
    label="Description"
    ref="editedEmail"
    
></v-text-field>

<!-- <v-text-field
v-model="petitionData.category"
    label="Category"
    ref="editedCity"
></v-text-field> -->
<v-select
    :items = this.categories
    label="Category"
    v-model="petitionData.category"
    required
></v-select>
<v-date-picker no-title v-model="endDate"></v-date-picker>

 <v-text-field
    label="End 24hr time (optional)"
    ref="endTime"
    type="time"
    v-model="endTime"
    ></v-text-field>
<v-card>
    <img :src="profilePic" width="100" height="100" alt="User Image">
    
    <v-file-input v-model="heroFile" accept="image/*" label="Upload a hero Image" prepend-icon="mdi-camera"></v-file-input>
</v-card>
</v-form>
<br>
<v-btn @click="saveEdit()">Save Changes</v-btn>
<v-btn @click="cancelEdit()">Cancel</v-btn>
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
                    petitionData: [],
                    profilePic: "",
                    newData:{},
                    url: "",
                    newImage:'',
                    currentPassword:'',
                    password:'',
                    categories: [],
                    catWithID:[],
                    endTime:'',
                    endDate:'',
                    photoData: '',
                    heroFile: null
                }
            },

    mounted: function() {
    //this.validateUser();
    this.getPetitionData();
    
    this.getProfilePic();
    this.getCategories();
    

    },
    methods: { 
         saveEdit: function() {
             let newData = {
                 title :this.petitionData.title,
                  description :this.petitionData.description,
                  categoryId : this.catWithID.find(element => element.name === this.petitionData.category).categoryId,
                  closingDate: this.endDate + " " +this.endTime

             }
             console.log(newData)
                this.$http.patch('http://localhost:4941/api/v1/petitions/' + this.$route.params.id, newData,{
                    headers: {
                        "X-Authorization": this.$cookies.get('authToken')
                    }
                })

                .then((response) => {
                //back to user page
                this.uploadImage(this.$route.params.id)
                this.$router.push("/petitions/" + this.$route.params.id);
            })
            .catch((error) => {
                
                this.errorLabel = error;
                this.errorFlag = true;
            });
            // if(newImage){
            //     let formData = new FormData
            //     formData.append('file', this.newImage)
                
            //     this.$http.put('http://localhost:4941/api/v1/users/' + this.$route.params.id + 'photo', formData, 
            //     {headers:{'Content-Type': 'image.jpeg'}}
            //     )
            //     .then((response) => {
            //     //back to user page

            // })
            // .catch((error) => {
                
            //     this.error = error;
            //     this.errorFlag = true;
            // });
            // }
        },

        cancelEdit: function() {
            this.$router.push("/petitions/"+ this.$route.params.id);
        },


            getPetitionData: function() {
                this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.id,{
                headers: {
                        'Content-Type': 'application/json',
                        "X-Authorization": this.$cookies.get('authToken')
                    }
                    })
                
                .then((response) => {
                console.log(response.data);
                this.petitionData = response.data;
                console.log("HI")
                var splitDate = this.petitionData.closingDate.split("T")
                this.endDate = splitDate[0]
                var half = splitDate[1].split(".")
                console.log(half[0])
                var last = half[0].split(":")
                this.endTime = last[1] + ":" + last[2]
                this.validateUser();

            })
            .catch((error) => {
                
                this.error = error;
                this.errorFlag = true;
            });
        },
            getProfilePic: function() {
                console.log("LOWLADWA??")
                this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.id + "/photo", {responseType:'blob'})
                .then((response) => {
                this.profilePic = URL.createObjectURL(response.data);
            })
            .catch((error) => {
                this.profilePic = require('./assets/logo.png');

            });
        },
        validateUser: function() {
            if(!(this.petitionData.authorId == this.$cookies.get("userId"))){
                 this.$router.push("/users/" + this.$cookies.get("userId"));
            }
        },
        uploadImage: function(petId){
            if(this.heroFile){
                this.$http.put("http://localhost:4941/api/v1/petitions/" + petId + "/photo", this.heroFile, {
                    headers:{
                        'X-Authorization':this.$cookies.get('authToken'),
                        'Content-Type': "image/png"
                    }
                }).then((response) => {
                    console.log("Success");
                }).catch((error) =>{
                    console.log(error)
                })
        }
        },
        getCategories: function(){
            this.$http.get("http://localhost:4941/api/v1/petitions/categories")
            .then((response) =>{
                this.catWithID = response.data;
                response.data.forEach(element => {
                    this.categories.push(element.name);
                    
                });
            }).catch((error) => {

            });
        }
    },
}
</script>