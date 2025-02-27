const toggleThemeBtns = document.querySelectorAll(".toggle-theme");
const submenuBtn = document.querySelector(".submenu-open-btn");
const subMenu = document.querySelector(".submenu");
const navOpenBtn = document.querySelector(".nav-icon");
const navCloseBtn = document.querySelector(".nav-close-btn");
const nav = document.querySelector(".nav");
const cart = document.querySelector(".cart");
const closeCartBtn = document.querySelector(".close-cart-btn");
const cartOpenBtn = document.querySelector(".cart-icon");
const cartCloseBtn = document.querySelector(".cart-close-btn");
const overlay = document.querySelector(".overlay");
const productWrapper = document.querySelector('.product-wrapper');
const cartBody = document.querySelector('.cart-body');
const mobileCartBody = document.querySelector('.mobile-cart-body');
const cartTotal = document.querySelector('.cart-total');
const cartTotalMobile = document.querySelector('.cart-total-mobile');
const cartLength = document.querySelector('.cart-length');
const cartNumber = document.querySelectorAll('.cart-number');
let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
const isMobile = window.innerWidth < 768;


toggleThemeBtns.forEach(btn=>
    btn.addEventListener("click" , function(){
        if (localStorage.theme === "dark"){
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme" , "dark");
        }
    })
);
submenuBtn.addEventListener("click" , function(e){
    e.currentTarget.parentElement.classList.toggle("text-orange-300")
    subMenu.classList.toggle("submenu--open")
});

function closeNav(){
    nav.classList.add("-right-64");
    nav.classList.remove("right-0");
    overlay.classList.remove("overlay--visible");
}
function closeCart(){
    cart.classList.add("-left-64");
    cart.classList.remove("left-0");
    overlay.classList.remove("overlay--visible");
}
async function getProducts(){
    try{
        const response = await fetch('js/db.json');
        const data = await response.json()
        showProducts(data)
    }catch(err){
        alert(err.message)
    }
}
function showProducts(products){
    products.map(product=>{
        const {image , title , prevprice , newprice} = product;
        const productElement = document.createElement('div');
        productElement.innerHTML = `
         <div class="p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
                        <div class="relative mb-2 md:mb-5">
                            <img class="w-32 mx-auto md:w-auto" src="${image}" loading="lazy" alt="${image}">
                            <span class="absolute top-1.5 right-1.5 block h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-danaDemiBold bg-orange-300 text-white dark:text-zinc-700 px-2.5 md:px-3.5 rounded-full">12%</span>
                        </div>
                        <h5 class="font-danaMedium -h-10 md:-h-14 text-sm md:text-xl text-zinc-700 dark:text-white line-clamp-2">${title}</h5>
                        <div class="xs:flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5">
                            <div class="text-teal-600 dark:text-emerald-500">
                                <span class="font-danaDemiBold text-base md:text-xl">${newprice.toLocaleString()}</span>
                                <span class="text-xs md:text-sm tracking-tighter">تومان</span>
                            </div>
                            <div>
                                <span class="offer text-gray-400 relative text-xs md:text-xl">${prevprice.toLocaleString()}</span>
                                <span class="hidden text-gray-400 xl:inline text-sm tracking-tighter">تومان</span>
                            </div>
                        </div>
                        <div class="mt-2.5 flex-wrap flex justify-between items-center">
                            <div class="flex items-center gap-x-2.5 md:gap-x-3 ">
                                <span class="add-to-cart-btn flex-center w-[26px] h-[26px] md:w-9 md:h-9 rounded-full text-gray-400 bg-gray-100 hover:bg-teal-600 dark:bg-zinc-800 dark:hover:bg-emerald-500 hover:text-white cursor-pointer transition-all">
                                    <svg class="w-4 h-4 md:w-[22px] md:h-[22px]">
                                        <use href="#shopping-cart"></use>
                                    </svg>
                                </span>
                                <span class="block rounded-full text-gray-400 hover:text-teal-600
                                dark:hover:text-emerald-500 cursor-pointer transition-all">
                                    <svg class="w-4 h-4 md:w-6 md:h-6">
                                        <use href="#arrows-right-left"></use>
                                    </svg>
                                </span>
                            </div>
                            <div class="mt-3 xs:mt-0 text-yellow-400 flex">
                                <svg class="size-4 md:size-6 text-gray-300 dark:text-gray-400">
                                    <use href="#star"></use>
                                </svg>
                                <svg class="size-4 md:size-6">
                                    <use href="#star"></use>
                                </svg>
                                <svg class="size-4 md:size-6">
                                    <use href="#star"></use>
                                </svg>
                                <svg class="size-4 md:size-6">
                                    <use href="#star"></use>
                                </svg>
                                <svg class="size-4 md:size-6">
                                    <use href="#star"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
        `
        const addToCartBtn  = productElement.querySelector('.add-to-cart-btn')
        addToCartBtn.addEventListener('click' , ()=>{
            addToCart(product);
        })
        productWrapper.appendChild(productElement)
    })
}
function addToCart(product){
    const existingItem = cartArray.find(item=> item.id === product.id)
    if(existingItem){
        existingItem.quantity++
    }else{
        cartArray.push({...product , quantity:1})
    }
    saveToLocalStorage();
    renderCart();
}
function renderCart(){
    cartBody.innerHTML = '';
    mobileCartBody.innerHTML = ''
    cartArray.map(product=>{
        const {image , title  , newprice} = product;
        const cartItem = document.createElement('div');
        const cartMobileItem = document.createElement('div');
        cartMobileItem.innerHTML = `
             <div class="flex gap-x-1 border-b border-b-gray-100 dark:border-b-white/10">
                    <img class="w-[90px] h-[90px]" src="${image}" alt="products 1">
                    <div class="flex flex-col justify-between gap-y-1.5">
                        <h4 class="font-danaMedium text-zinc-700 dark:text-white text-sm line-clamp-2">${title}
                        </h4>
                        <div class="flex mx-auto mt-4 text-zinc-800 dark:text-white rounded-md justify-between items-center w-24 border border-white">
                        <div class="minus flex items-center justify-center border-l px-2 h-full border-white">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                           </svg>
                        </div>
                        <div class="quantity-text">1</div>
                        <div class="plus flex items-center justify-center border-r px-2 h-full border-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>                  
                        </div>
                    </div>
                        <div>
                            <span class="text-teal-600 dark:text-emerald-500 text-xs font-danaMedium tracking-tighter">14.500 تومان تخفیف</span>
                            <div class="product-price text-zinc-700 dark:text-white font-danaDemiBold">
                                ${newprice.toLocaleString()}
                                <span class="text-xs font-dana">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
        
            `
        cartItem.innerHTML = `
             <div class="flex gap-x-2.5">
                 <img class="w-30 h-30" src="${image}" alt="products 1">
                 <div class="flex flex-col justify-between">
                      <h4 class="font-danaMedium text-zinc-700 dark:text-white text-base line-clamp-2">${title}</h4>
                                  <div class="flex mx-auto mt-4 text-zinc-800 dark:text-white rounded-md justify-between items-center w-24 border border-black dark:border-white">
                        <div class="minus flex items-center justify-center border-l px-2 h-full border-black text-zinc-800 dark:text-white dark:border-white">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                           </svg>
                        </div>
                        <div class="quantity-text">1</div>
                        <div class="plus flex items-center justify-center border-r px-2 h-full border-black text-zinc-800 dark:text-white dark:border-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>                  
                        </div>
                    </div>
                     <div>
                         <span class="text-teal-600 dark:text-emerald-500 text-xs tracking-tighter">14.500 تومان تخفیف</span>
                         <div class="product-price text-zinc-700 dark:text-white font-danaDemiBold">
                            ${newprice.toLocaleString()}
                            <span class="text-sm font-dana">تومان</span>
                        </div>
                    </div>
                </div>
            </div>
            `
        if(isMobile){
                mobileCartBody.appendChild(cartMobileItem)
        }else{
                cartBody.appendChild(cartItem)
        }
        const cartElement = isMobile ? cartMobileItem : cartItem;    
        const quantityText = cartElement.querySelector('.quantity-text')
        const minus = cartElement.querySelector('.minus');
        const plus = cartElement.querySelector('.plus');
        const productPrice = cartElement.querySelector('.product-price')
        const productTotalPrice = product.quantity * product.newprice;
        plus.addEventListener('click' , ()=>{
            product.quantity++
            renderCart()
            
        })
        minus.addEventListener('click' , ()=>{
            if(product.quantity > 1){
                product.quantity--
            }else{
                cartArray = cartArray.filter(item => item.id !== product.id)
            }
            renderCart()
        })
        const cartTotalPrice = cartArray.reduce((total , item)=>{
            return total + item.quantity * item.newprice;
        } , 0)
        productPrice.textContent = productTotalPrice.toLocaleString()
        quantityText.textContent = product.quantity;
        if(isMobile){
            cartTotalMobile.textContent = `${cartTotalPrice.toLocaleString()} تومان`;
        }else{
            cartTotal.textContent = `${cartTotalPrice.toLocaleString()} تومان`;
        }
    })
    if(cartArray.length === 0){
            cartLength.textContent = "سبد خرید خالی است"
    }else{
            cartLength.textContent = `${cartArray.length} مورد`;
    }
    if(cartArray.length === 0){
        cartTotal.textContent = `0 تومان`;
        cartTotalMobile.textContent = `0 تومان`;
    }
    cartNumber.forEach(number=> number.textContent = cartArray.length)
    saveToLocalStorage()
}
function saveToLocalStorage(){
    localStorage.setItem('cart' , JSON.stringify(cartArray))
}
navOpenBtn.addEventListener("click" , () =>{
    nav.classList.remove("-right-64");
    nav.classList.add("right-0");
    overlay.classList.add("overlay--visible");
    overlay.addEventListener("click" , closeNav);
});
cartOpenBtn.addEventListener("click" , () =>{
    cart.classList.remove("-left-64");
    cart.classList.add("left-0");
    overlay.classList.add("overlay--visible");
    overlay.addEventListener("click" , closeCart);
});

 navCloseBtn.addEventListener("click" , closeNav);
 cartCloseBtn.addEventListener("click" , closeCart);

 getProducts();
 renderCart();