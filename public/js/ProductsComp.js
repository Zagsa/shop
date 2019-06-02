Vue.component('products', {
    props: ['amount'],
    data(){
        return {
            // catalogUrl: '/catalogData.json',
            // catalogUrl: '../server/db/productsList.json',
            catalogUrl: '../server/db/products.json',
            products: [],
            filtered: [],
        }
    },

    methods: {
        // filter(value){
        //     let regexp = new RegExp(value, 'i');
        //     this.filtered = this.products.filter(el => regexp.test(el.product_name))
        // }
        filter(){
            // this.filtered = this.products.slice(0, 9);
        },
    },
    mounted(){
        this.$parent.getJson(`${this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                };
                this.filtered = this.products.slice(0, this.amount);
            });
        // this.$parent.getJson(`/api/products`)
        //     .then(data => {
        //         for(let el of data){
        //             this.products.push(el);
        //             this.filtered.push(el);
        //         }
        //     });
    },
    template: `<div>
            <product 
            v-for="product of filtered" 
            :key="product.id_product"
            :product="product"></product>
        </div>`
});
Vue.component('product', {
    props: ['product'],
    template: `<div class="item-product1">
                <a href="single page.html" class="product1"> <img class="product1-img" :src="product.img" alt="product photo">
                <div class="product1-text">
                <p class="product1-name">{{product.product_name}}</p>
                <p class="product1-price">{{product.currency}} {{product.price}}</p>
                </div>
                </a>
                <div class="parent-add">
                <button class="add" @click="$root.$refs.cartsmall.addProduct(product)">
                <img class="img-cart" src="img/cart-add.png" alt="cart">  Add to Cart</button>
                </div>
            </div>`
});

// $root.$refs.shopHeader.$refs.cart.addProduct(product)