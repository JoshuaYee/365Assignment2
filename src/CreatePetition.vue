
<template>
<div >
<v-container>
<v-form>
    <h1>CREATE YA PETITITON</h1>
<v-text-field

    label="Title"
    v-model="createTitle"
    required
></v-text-field>

<v-text-field

    label="Description"
    v-model="createDescription"
    required
></v-text-field>
<v-select
    :items = this.categories
    label="Category"
    v-model="createCategory"
    required
></v-select>
<v-label>Upload new hero image:</v-label><v-file-input accept="image/*" v-model="heroFile"></v-file-input>

<v-date-picker no-title v-model="endDate"></v-date-picker>

 <v-text-field
    label="End time (optional)"
    ref="endTime"
    type="time"
    v-model="endTime"
    ></v-text-field>

</v-form>
<br>
<v-btn @click="saveEdit()">Save Changes</v-btn>
<v-btn @click="cancelEdit()">Cancel</v-btn>
<v-btn @click="test()">test</v-btn>
</v-container>
</div>
</template>

<script>
export default {
        data (){
                return{
                    error: "",
                    errorFlag: false,
                    userData: [],
                    profilePic: "",
                    newData:{},
                    url: "",
                    newImage:'',
                    categories: [],
                    catWithID:[],
                    tester : {},
                    createDescription:"",
                    createTitle:"",
                    createCategory: null,
                    endDate : "",
                    endTime : "",
                    heroFile: null

                }
            },

    mounted: function() {
    this.getCategories();
    },
    methods: { 
         saveEdit: function() {
             let newPetition = {
                 title : this.createTitle,
                  description :this.createDescription,
                  categoryId : this.catWithID.find(element => element.name === this.createCategory).categoryId,
                  closingDate: this.endDate + " " +this.endTime
             }
             console.log(newPetition)

                this.$http.post('http://localhost:4941/api/v1/petitions/', newPetition, 
                    {headers: {
                    'X-Authorization': this.$cookies.get('authToken')
                }}
                )

                .then((response) => {
                //back to user page
                this.signMyPetition(response.data.petitionId);
                this.uploadImage(response.data.petitionId)
                this.$router.push("/petitions/"+ response.data.petitionId);
            })
            .catch((error) => {
                
                this.error = error;
                this.errorFlag = true;
            });
            if(this.newImage){
                let formData = new FormData
                formData.append('file', this.newImage)
                
                this.$http.put('http://localhost:4941/api/v1/users/' + this.$route.params.id + 'photo', formData, 
                {headers:{'Content-Type': 'image.jpeg'}}
                )
                .then((response) => {
                //back to user page

            })
            .catch((error) => {
                
                this.error = error;
                this.errorFlag = true;
            });
            }
            
        },
            signMyPetition: function(id){
            this.$http.post('http://localhost:4941/api/v1/petitions/' + id + '/signatures/', {}, {
                headers: {
                    'X-Authorization': this.$cookies.get('authToken')
                }
            }).then((response) => {
                console.log("IVE SIGNED THE PETITION IVE CREATED YO")
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
            
        },
        test: function() {
            // let tester = {
            //      title :this.$refs.createTitle.value,
            //       description :this.$refs.createdDescription.value,
            //       Category :this.$refs.createdCategory.value,
            //  }
            console.log(this.endDate)
            //console.log(createCategory)
            
        },
        cancelEdit: function() {
            this.$router.push("/users/"+ this.$route.params.id);
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