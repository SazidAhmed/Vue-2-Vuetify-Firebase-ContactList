<template>
    <v-app id="inspire">
        <v-snackbar v-model="snackbar" right top rounded="pill" :color="color" >{{text}}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbar = false">X</v-btn>
            </template>
        </v-snackbar>
        <v-container fluid>
            <!-- breadcrumbs -->
            <v-breadcrumbs :items="breadcrumbItems">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
            <!-- breadcrumbs End-->
            <!-- Data Table-->
            <v-card>
               <v-toolbar flat >
                    <v-toolbar-title>List</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" color="dark" single-line hide-details ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-btn color="cyan" small dark class="mb-2">Print</v-btn>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-btn color="red" small dark class="mb-2">Delete Selected</v-btn>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-btn color="deep-purple" small dark class="mb-2" @click="createBtn"><v-icon dark small> mdi-plus </v-icon>Add New</v-btn>
                </v-toolbar>
                <!-- datatable -->                        
                <v-data-table class="elevation-1" :headers="headers" :items="dataIndex" :search="search" :loading="loading"
                    loading-text="Loading... Please wait" :footer-props="{itemsPerPageOptions: [5,10,15],itemsPerPageText: 'Data Per Page','show-current-page': true,'show-first-last-page': true}">
                    <template v-slot:[`item.actions`]="{ item }" >
                        <v-icon small color="green" class="mr-2" @click="phoneBtn(item.phone)">mdi-phone-forward</v-icon>
                        <v-icon small color="cyan" class="mr-2" @click="editBtn(item.id)"> mdi-pencil </v-icon>
                        <v-icon small color="red"  @click="deleteBtn(item.id)"> mdi-delete </v-icon>
                    </template>
                </v-data-table>
                <!-- End datatable -->
            </v-card>
            <!-- Delete Modal -->
            <v-row justify="center">
                <v-dialog
                    v-model="deleteDialog"
                    persistent
                    max-width="290"
                >
                <form @submit.prevent="deleteData()" enctype="multipart/form-data">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Warning !!!</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                <v-row>
                                    <h3>Delete all</h3>
                                </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="deleteDialog = false">Cancel</v-btn>
                                <v-btn type="submit" color="green darken-1" text>Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </form>
                </v-dialog>
            </v-row>

            <!-- Update Modal -->
            <v-row justify="center">
                <v-dialog
                    v-model="updateDialog"
                    persistent
                    max-width="600px"
                >
                 <form @submit.prevent="updateData()" enctype="multipart/form-data">
                    <v-card>
                        <v-card-title>
                            <span class="headline">View</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" >
                                    <v-text-field label="Name" v-model="actionData.name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" >
                                    <v-text-field label="Email" type="email" v-model="actionData.email"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" >
                                    <v-text-field label="Phone" type="number" :counter="11" v-model="actionData.phone"></v-text-field>
                                </v-col>
                            </v-row>
                             <v-row class="ml-1">
                                <p v-if="feedback" class="red--text">{{ feedback }}</p>
                            </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="updateDialog = false">Cancel</v-btn>
                            <v-btn type="submit" color="green darken-1" text>Save</v-btn>
                        </v-card-actions>
                    </v-card>
                 </form>
                </v-dialog>
            </v-row>
            
            <!-- Create Modal -->
            <v-row justify="center">
                <v-dialog
                    v-model="createDialog"
                    persistent
                    max-width="600px"
                >
                 <v-form @submit.prevent="createData()" enctype="multipart/form-data" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add new</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" >
                                    <v-text-field label="Name" v-model="name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" >
                                    <v-text-field label="Email" type="email" v-model="email" ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" >
                                    <v-text-field label="Phone" type="number" :counter="11" v-model="phone"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="ml-1">
                                <p v-if="feedback" class="red--text">{{ feedback }}</p>
                            </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="createDialog = false">Cancel</v-btn>
                            <v-btn type="submit" color="green darken-1" text :disabled="!valid">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
                </v-dialog>
            </v-row>
        </v-container>
        <!-- index name serial amount phone -->
    </v-app>
</template>

<script>
import db from '@/firebase/config'

// components
import Spinner from '@/components/Spinner.vue'

export default {
    components: { Spinner },
    data () {
        return {
            name:'',
            email:'',
            phone: '',
            search: '',
            color:'',
            loading: false,
            snackbar: false,
            text: '',
            createDialog:false,
            updateDialog:false,
            deleteDialog: false,
            headers: [
                { text: 'Index', align: 'start', sortable: true, value: 'index'},
                { text: 'Name', align: 'start', sortable: false, value: 'name'},
                { text: 'Email', align: 'start', sortable: true, value: 'email'},
                { text: 'Phone', align: 'start', sortable: false, value: 'phone'},
                { text: 'Action', value: 'actions', sortable: false },
            ],
            dataList: [],
            actionData:[],
            actionId:'',
            tempId:'',
            feedback: null,
            breadcrumbItems: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/adminportal',
                },
                {
                    text: 'Contact',
                    disabled: true,
                },
                {
                    text: 'Contact',
                    disabled: true,
                },
            ],
            valid: true,
            titleRules: [],
        }
    },

    mounted() {
        document.title = 'Techminate | Contact'
        this.getData();
    },
    computed: {
        dataIndex() {
        return this.dataList.map(
            (dataList, index) => ({
            ...dataList,
            index: index + 1
            }))
        }
    },
    methods:{
        getData(){
             // fetch data from firestore
            db.collection('contact').get()
            .then(snapshot => {
            snapshot.forEach(doc => {
                let resData = doc.data()
                resData.id = doc.id
                this.dataList.push(resData)
            })
            })
        },
        phoneBtn(p){
            window.location.href = 'tel:' + p;
        },
        createBtn() {
            this.createDialog = true;
        },
        createData() {
            this.loading = true;
            if(this.name && this.email && this.phone){
                this.feedback = null
            db.collection('contact').add({
                name: this.name,
                email: this.email,
                phone: this.phone,
            })
            .then((res) => {
                this.tempId = res.id;
                this.color = 'green';
                this.snackbar = true;
                this.text = "successfully added";
                let newdata = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    id: this.tempId,
                };
                this.dataList.push(newdata)
                this.name='';
                this.email='';
                this.phone='';
                this.createDialog=false;
                this.loading = false;
                
            })
            .catch((err) => {
                console.log(err)
                this.color = 'red';
                this.snackbar = true;
                this.text = "try again";
                this.createDialog=false;
                this.loading = false;
            });
            }else{
                this.feedback = 'fill all'
            }
        },

        editBtn(id) {
            this.actionId = id;
            db.collection('contact').doc(id).get()
            .then((res) => {
                this.actionData = res.data();
                this.updateDialog = true;
            })
            .catch((error) => {
                console.log(error)
                alert("unable to get action data");
            });
        },
        updateData() {
            this.loading = true;
            let id = this.actionId
            if(this.actionData.name && this.actionData.email && this.actionData.phone){
            this.feedback = null
            db.collection('contact').doc(id).update({
                name: this.actionData.name,
                email: this.actionData.email,
                phone: this.actionData.phone
            })
            .then(() => {
                this.color = 'green';
                this.snackbar = true;
                this.text = "done";
               
                let newdata = {
                    name: this.actionData.name,
                    email: this.actionData.email,
                    phone: this.actionData.phone,
                    id: this.actionId,
                };

                let arr = this.dataList;
                arr.slice(0).forEach((obj) => {
                    if(obj.id == id)
                        arr.splice(arr.indexOf(obj), 1, newdata);
                });
                this.updateDialog=false;
                this.loading = false;
                
            })
            .catch((err) => {
                console.log(err)
                this.color = 'red';
                this.snackbar = true;
                this.text = "try again";
                this.updateDialog=false;
                this.loading = false;
            });
            }else{
                this.feedback = 'fill all'
            }
        },

        spliceArray(){
            var arr = [{0:0},{i:1},{i:"test"},{i:"Something else"},{i:"Test"},5];
            arr.slice(0).forEach(function(item) {
                if(item != 5)
                arr.splice(arr.indexOf(item), 1);
            });
            console.log(arr);
        },

        deleteBtn(id) {
            this.actionId = id;
            this.deleteDialog = true;
        },
        deleteData(){
            this.loading = true;
            let id = this.actionId
            db.collection('contact').doc(id).delete()
            .then(() => {
                this.color = 'green';
                this.snackbar = true;
                this.text = "deleted";
                this.dataList = this.dataList.filter(data => {
                    return data.id !== id
                })
                this.deleteDialog = false;
                this.loading = false;
            })
            .catch((err) => {
                console.log(err)
                this.color = 'red';
                this.snackbar = true;
                this.text = "try again";
                this.deleteDialog = false;
                this.loading = false;
            })
        }
    }
}
</script>

<style>

</style>