const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    // data: {
    //     userSearch: '',
    // },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
                // .catch(error => {
                //     this.$refs.error.setError(error);
                // })
        },
        // postJson(url, data) {
        //     return fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             "Content-type": "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     })
        //         .then(result => result.json())
        //         .catch(error => {
        //             this.$refs.error.setError(error);
        //         })
        // },

        // putJson(url, data) {
        //     return fetch(url, {
        //         method: 'PUT',
        //         headers: {
        //             "Content-type": "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     })
        //         .then(result => result.json())
        //         .catch(error => {
        //             this.$refs.error.setError(error);
        //         })
        // },
    },
    mounted(){

    }
});






