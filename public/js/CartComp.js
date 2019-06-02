Vue.component('cart', {
    data(){
        return {
            showCart: false,
            // cartUrl: '/userCart.json',
            cartUrl: '../server/db/userCart.json',
            cartItems: [],
            sumTotal: 0
        }
    },
    computed: {
        sumprice(){
            this.sumTotal = 0;
            for (let i = 0; i < this.cartItems.length; i++ ) {
                this.sumTotal += this.cartItems[i].quantity * this.cartItems[i].price;
            }
            console.log(this.sumTotal);
            return this.sumTotal;
        },

    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        console.log(find);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        remove(product){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    }
                })
        },
        clearCart(){
            this.cartItems = [];
        },

        // addProduct(product){
        //         let find = this.cartItems.find(el => el.id_product === product.id_product);
        //         if(find){
        //             this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
        //                 .then(data => {
        //                     if(data.result){
        //                         find.quantity++
        //                     }
        //                 })
        //         } else {
        //             let prod = Object.assign({quantity: 1}, product);
        //             this.$parent.postJson(`/api/cart`, prod)
        //                 .then(data => {
        //                     if(data.result){
        //                         this.cartItems.push(prod);
        //                     }
        //                 })
        //         }
            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result){
            //             let find = this.cartItems.find(el => el.id_product === product.id_product);
            //             console.log(find);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 let prod = Object.assign({quantity: 1}, product);
            //                 this.cartItems.push(prod);
            //             }
            //         }
            //     })
        // },
        // remove(product){
        //     this.$parent.getJson(`${API}/deleteFromBasket.json`)
        //         .then(data => {
        //             if(data.result){
        //                 if(product.quantity > 1){
        //                     product.quantity--;
        //                 } else {
        //                     this.cartItems.splice(this.cartItems.indexOf(product), 1);
        //                 }
        //             }
        //         })
        // },
    },
    mounted(){
        this.$parent.getJson(`${this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el)
                }
                console.log(this.cartItems);
            });
        // this.$parent.getJson(`/api/cart`)
        //     .then(data => {
        //         for(let el of data.contents){
        //             this.cartItems.push(el)
        //         }
        //     });
    },
    template: `<div>
                    <cart-item 
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :cart-item="item"
                    @remove="remove"></cart-item>  
                    <div class="cart-1">
                        <button class="cart-button" type="button" @click="clearCart()">CLEAR SHOPPING CART</button>                    
                        <a class="cart-button" href="product.html" style="text-decoration: none">CONTINUE SHOPPING</a>
                    </div>                                      
                </div>`
//     template: `<div>
// <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
// <div class="cart-block" v-show="showCart">
//                 <p v-if="!cartItems.length">Cart is empty</p>
//                 <cart-item
//                 v-for="item of cartItems"
//                 :key="item.id_product"
//                 :cart-item="item"
//                 :img="imgCart"
//                 @remove="remove"></cart-item>
//             </div>
// </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<div class="cart-item">
                    <div class="size-column cart-column-1">
                    <div class="cart-line-detail">
                        <div class="cart-line-detail-foto">
                            <a href="single%20page.html"><img :src="cartItem.img" width="100" alt="error"></a>
                        </div>
                        <div class="cart-line-detail-link">
                            <a href="single%20page.html"><h3 class="cart-line-h3">{{cartItem.product_name}}</h3></a>
                            <span class="cart-line-text-b">Color: </span>
                            <span class="cart-line-text">{{cartItem.color}}</span>
                            <br>
                            <span class="cart-line-text-b">Size: </span>
                            <span class="cart-line-text">{{cartItem.size}}</span>
                        </div>
                    </div>
                    </div>
                    <div class="size-column cart-line">{{cartItem.currency}} {{cartItem.price}}</div>
                    <div class="size-column cart-line"><input class="input-quantity" type="text" 
                    size="3" v-model="cartItem.quantity" required pattern="^[ 0-9]+$"></div>
                    <div class="size-column cart-line">FREE</div>
                    <div class="size-column cart-line">{{cartItem.currency}} {{cartItem.quantity*cartItem.price}}</div>
                    <div class="size-column cart-line"><a class="btn-del" @click="$emit('remove', cartItem)">
                    <i class="fa fa-times-circle" aria-hidden="true"></i></a></div>
                </div>`
});

Vue.component('cart-total', {
    template: `<div class="proceed-to-checkout">
                 <div class="check-total">
                    <span class="cart-check-total_t1">Sub total   </span>
                    <span class="cart-check-total_t1">$ {{$root.$refs.cart.sumprice}}</span>
                    <br>
                    <br>
                    <span class="cart-check-total_t2">GRAND TOTAL   </span>
                    <span class="cart-check-total_t3">$ {{$root.$refs.cart.sumprice}}</span>
                 </div>
                 <div class="cart-button-1">
                     <a class="cart-button-1-1" href="checkout.html">proceed to checkout</a> 
                 </div>
             </div>`
});






// id_product": 2,
// "product_name": "Mango  People  T-shirt",
//     "img": "/server/db/imgProduct/Layer 1.png",
//     "sex": "female",
//     "color": "Red",
//     "size": "XLL",
//     "currency": "$",
//     "price": 62



// Vue.component('cart-item', {
//     props: ['cartItem', 'img'],
//     template: `<div class="cart-item">
//                     <div class="product-bio">
//                         <img :src="img" alt="Some image">
//                         <div class="product-desc">
//                             <p class="product-title">{{cartItem.product_name}}</p>
//                             <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
//                             <p class="product-single-price">$ {{cartItem.price}} each</p>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
//                         <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
//                     </div>
//                 </div>`
// });