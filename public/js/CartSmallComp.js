Vue.component('cartsmall', {
    data(){
        return {
            showCart: false,
            showCartTotal: false,
            // cartUrl: '/userCart.json',
            cartUrl: '../server/db/userCart.json',
            cartItems: [],
            sumTotal: 0
        }
    },
    computed: {
        sumPrice(){
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
    },
    mounted(){
        this.$parent.getJson(`${this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el)
                }
                console.log(this.cartItems);
            });
    },
    template: `<div>
                <a href="shopping%20cart.html" @mouseover="showCart = !showCart" @mouseleave="showCart = !showCart">
                <img src="img/Forma%201.svg" alt="cart"></a>
                <div v-show="showCart" class="btn-cart" @mouseleave="showCart = !showCart">
                    <p v-if="!cartItems.length">Cart is empty</p>
                    <cart-item-small 
                    v-for="item of cartItems"  
                    :key="item.id_product"
                    :cart-item="item"
                    @remove="remove"></cart-item-small>
                    <div>
                          <div class="cart-1 small">
                              <div class="cart-check-total_t2">GRAND TOTAL</div>
                              <div class="cart-check-total_t3">$ {{ sumPrice }}</div>
                          </div>
                    </div>
                    <div>
                          <a class="cart-button cart-small" href="checkout.html" style="text-decoration: none">CHECKOUT</a>
                          <a class="cart-button cart-small" href="shopping%20cart.html" 
                          style="text-decoration: none">GO TO CART</a>
                    </div> 
                </div>               
                </div>`
//     template: `<div>
// <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
// <div class="cart-block" v-show="showCart"> focus mouseover @mouseleave="showCart = !showCart"
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

Vue.component('cart-item-small', {
    props: ['cartItem'],
    template: `<div class="cart-row">
                      <div class="size-column-small cart-column-1">
                          <div class="cart-line-detail">
                              <div class="cart-line-detail-foto">
                                <a href="single%20page.html"><img :src="cartItem.img" width="80" alt="error"></a>
                              </div>
                              <div class="cart-line-detail-link">
                                  <a href="single%20page.html">
                                  <h3 class="cart-line-h3">{{cartItem.product_name}}</h3></a>
                                  <span class="cart-line-text-b red">{{cartItem.quantity}}</span>
                                  <span class="cart-line-text-b red"> X </span>
                                  <span class="cart-line-text-b red">{{cartItem.currency}} {{cartItem.price}}</span>
                              </div>
                          </div>
                      </div>
                          <div class="size-column cart-line"><a class="btn-del" @click="$emit('remove', cartItem)">
                               <i class="fa fa-times-circle" aria-hidden="true"></i></a>
                          </div>
               </div>`
});

