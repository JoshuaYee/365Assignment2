



<template>
<div >
<h1>Petition Title</h1>
<p>{{petitionData.title}}</p>
<h1>Petition Id</h1>
<p>{{petitionData.petitionId}}</p>
<h1>Petition description</h1>
<p>{{petitionData.description}}</p>
<h1>Author</h1>
<p>Author Picture</p>
<p>Author name</p>
<p>{{petitionData.authorName}}</p>
<p>Author city</p>
<p>{{petitionData.authorCity}}</p>
<p>Author country</p>
<p>{{petitionData.authorCountry}}</p>
<h1>Petition Photo</h1>
<h1>Signature Number </h1>
<p>{{petitionData.signatureCount}}</p>
<h1>Category</h1>
<p>{{petitionData.category}}</p>
<h1>Created Date</h1>
<p>{{petitionData.createdDate}}</p>
<h1>Closing Date</h1>
<p>{{petitionData.closingDate}}</p>
<h1>List of signatures</h1>

<ol><li v-for="item in petitionSigs"> name: {{ item.name }} city: {{ item.city }} country: {{ item.country }} on date: {{ item.signedDate }}</li></ol>

</div>
</template>

<script>
export default {
        data (){
                return{
                    error: "",
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
            getPetition: function() {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions/1')
                .then((response) => {
                this.petitionData = response.data;

            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },
        getSigs: function() {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions/1/signatures')
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