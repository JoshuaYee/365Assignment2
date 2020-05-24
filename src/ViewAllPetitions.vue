<template>
<div >
<v-container>
<h1>Petitions</h1>
</v-container>
 <v-container fluid>
      <v-data-iterator
        
        :items="allPetitions"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>

              <!-- sort by stuff! -->
              <v-select 
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                >
                  ↑
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                >
                  ↓
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
  
        <template v-slot:default="props">
          <v-row>
            
            <v-col
              v-for="item in props.items"
              :key="item.title"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">{{ item.title }}</v-card-title>
                <v-btn @click="goToPetition(item.petitionId)"> Visit this petition</v-btn>
                <v-divider></v-divider>

                Signature count: {{item.signatureCount}}
                <br>
                Category: {{item.category}}
                <br>
                Authors Name: {{item.authorName}}
                <br>
                <img :src="getPetitionImage(item.petitionId)" onerror="this.src='../src/assets/logo.png'" width="100" height="100" alt="User Image">
              </v-card>
            </v-col>
          </v-row>
        </template>
  
        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
  
            <v-spacer></v-spacer>
  
            <span
              class="mr-4
              grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
              <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="firstPage"
            >
              ⇇
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              ←
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              →
            </v-btn>
              <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="lastPage"
            >
              ⇉
            </v-btn>

          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
    <v-btn color="orange darken-2" @click="viewUser()">Back to My profile</v-btn>
    <v-btn color="orange darken-2" @click="goToCreatePetition()">Create a Petition</v-btn>
</div>
</template>

<script>
export default {
    data (){
        return {
            petitionImage: "",
            error: "",
            errorFlag: false,
           
            allPetitions: [],
            itemsPerPageArray: [4, 8, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 4,
            sortBy: 'title',
            keys: [
                'title',
                'signatureCount'
            ],
            allPetitions: [],

        }
    },
    mounted: function() {
    this.getPetitions();

    },
    computed: {
    numberOfPages () {
      return Math.ceil(this.allPetitions.length / this.itemsPerPage)
    },
    // filteredKeys () {
    //   return this.keys.filter(key => key !== `title`)
    // },
    },
    methods: { 

        getPetitions: function() {
                this.$http.get('http://localhost:4941/api/v1/petitions/')
                .then((response) => {
                this.allPetitions = response.data;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },
        goToCreatePetition: function(){
          this.$router.push("/createpetition");
            
        },
        goToPetition: function(id){
          this.$router.push("/petitions/" + id);//find user
            
        },
        getPetitionImage: function(petitID){
          //this.isBusy = true
          console.log("HELLOOO")
            return 'http://localhost:4941/api/v1/petitions/' + petitID + "/photo";
        },
        viewUser: function(id){
          this.$router.push("/users/" + this.$cookies.get('userId'));//find user
            
        },
        nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        lastPage () {
          this.page = this.numberOfPages
        },
        firstPage () {
          this.page = 1
        },
        formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage (number) {
        this.itemsPerPage = number
        }
    },
}
</script>