let personas = []
let platos = []

/*
const buttonsCategories = document.querySelectorAll(".categories__button")
buttonsCategories.forEach(button =>{
    button.addEventListener("click", (e) => {
        buttonsCategories.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");
        productos.forEach(prod =>{
            if(prod.category != e.currentTarget.id){
                prod.active = false
            }
        });

    });
});
productos.forEach(prod =>{
    console.log(prod.active)
});
*/

//Categorias
class Persona {
    constructor(email, password, firstName, lastName, id, money, fullName){
        this.email = email
        this.password = password
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.money = money;
        this.fullName = fullName;
    }
};

//Carga de datos
const cargarPlatos = async () => {
    const productosFetch = await fetch('../productos.json')
    const productos = await productosFetch.json()
    const contenedor = document.getElementById("contMenu")

    if(contenedor){
        productos.forEach(prod =>{
            const {img, name, price, id, desc, alt, active} = prod
            if(active){
                let art = document.createElement("article")
                art.setAttribute("class","card")
                art.innerHTML = `
                    <div>
                        <img class="card__img" src="${img}" alt="${alt}">
                    </div>
                    <div class="card__content">
                        <h3 class="card__content__item" >${name}</h3>
                        <h4 class="card__content__item" >$${price}</h4>
                        <p class="card__content__item" >${desc}</p>
                        <button class="card__content__button" id="${id}">Añadir al pedido</button>
                    </div>
                `
                contenedor.append(art)
            }
        });
    };

    /* Funcionalidad del boton agregar al carrito */
    const buttonAdd = document.querySelectorAll(".card__content__button")

    buttonAdd.forEach(button => {
        button.addEventListener("click", (e) => {
            if (sessionStorage.getItem("session") !== null){
                const productId = e.currentTarget.id;
                let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                if (cart.length === 0) {
                    productos.forEach(prod => {
                    const { img, name, price, id } = prod;
                        if (productId == id) {
                            let cant = 1;
                            let total = cant*price
                            const compra = { img, name, price, cant, total, id};
                            cart.push(compra);
                        }
                    });
                } else {
                    let found = false;
                    cart.forEach(prodIn => {
                        if (prodIn.id == productId) {
                            prodIn.cant++;
                            prodIn.total = prodIn.cant*prodIn.price
                            found = true;
                        }
                    });
                    if (!found) {
                        productos.forEach(prod => {
                            const { img, name, price, id } = prod;
                            if (productId == id) {
                                const cant = 1;
                                let total = cant*price
                                const compra = { img, name, price, cant, total, id};
                                cart.push(compra);
                                found = true;
                            }
                        });
                    };
                };
                sessionStorage.setItem('cart', JSON.stringify(cart));
                actualizarNumero()
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Inicie sesion para comprar',
                    footer: 'iniciar sesion <a style="color: black" href="login.html">aqui</a>'
                });
            };
        });
    });
};

function cargarDatos(){
    const pers1 = new Persona("Freddy@gmail.com", "PlatoDePollo", "freddy", "rediase", 44888777, 3000, "F R");
    personas.push(pers1)
    const pers2 = new Persona("Juanmanuel@gmail.com", "PlatoDePicada", "Juan", "Manueles", 55666777, 3500, "J M");
    personas.push(pers2)
    const pers3 = new Persona("PedroPica@gmail.com","PlatoDeFideos", "Pedro", "Pica", 67898323, 5000, "P P");
    personas.push(pers3)


    for(let i = 0; i < personas.length; i++){
        localStorage.setItem(personas[i].id, JSON.stringify(personas[i]))
    }
};

//Funciones del carrito
function cargarCarrito(){
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    const contenedor = document.getElementById("contCart")
    const contButtons = document.createElement("div")
    let tSuma = 0
        if(contenedor){
            if(cart.length>0){
                cart.forEach(prod =>{
                    const {img, name, price, cant, total} = prod
                    tSuma += total
                    let art = document.createElement("article")
                    art.setAttribute("class","card-cart")
                    art.innerHTML = `
                        <img class="card-cart__img" src="${img}">
                        <div class="card-cart-item">
                            <p>Plato:</p>
                            <h3>${name}</h3>
                        </div>
                        <div class="card-cart-item">
                            <p>Precio:</p>
                            <h5>$${price}</h5>
                        </div>
                        <div class="card-cart-item">
                            <p>Cantidad:</p>
                            <h5>${cant}</h5>
                        </div>
                        <div class="card-cart-item">
                            <p>Total:</p>
                            <h5>$${total}</h5>
                        </div>
                        <button class="card-cart__button card-cart-item"></button>
                        `
                    contenedor.append(art)
                });

                contButtons.setAttribute("class","contCart__contButtons")
                contButtons.innerHTML = `
                    <h4><button class="contCart__contButtons-button" id="clear">vaciar carrito</button></h4>
                    <div class="contCart__contButtons__subcont">
                        <h4 class="contCart__contButtons__subcont-total" id="total"></h4>
                        <h4><button class="contCart__contButtons__subcont-button-buy" id="buy">confirmar compra</button></h4>
                    </div>

                `
                contenedor.append(contButtons)

                hTotal = document.getElementById("total")
                hTotal.innerText = 'Total: ' + tSuma
                buttonBuy = document.getElementById("buy")
                buttonClear = document.getElementById("clear")

                buttonBuy.addEventListener("click", async (e) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Perfecto!',
                        text: 'gracias por confiar en nosotros',
                    });
                    cart = []
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    contenedor.innerText = ""
                    actualizarNumero()
                });

                buttonClear.addEventListener("click", (e) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Gracias por visitarnos!',
                        text: 'Esperamos tu vuelta!',
                    });
                    cart = []
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    contenedor.innerText = ""
                    actualizarNumero()
                });
            }
            else{
                let art = document.createElement("article")
                art.setAttribute("class","card-cart__vacio")
                art.innerHTML = `
                    <h3 class="card__content__item" >Carrito vacio</h3>
                    `
                contenedor.append(art)
            }


    };
};

function actualizarNumero(){
    let cant = 0
    let cart = JSON.parse(sessionStorage.getItem('cart'))
    if(cart){
        cart.forEach(prod =>{
            cant += prod.cant
        });
    };
    numero = document.getElementById("contador")
    if(numero){
        numero.innerText = cant
    }
};

//Actualizacion de sesion
function refresh(){
    let band = true
    const register = document.createElement("h2")
    const login = document.createElement("h2")

    login.setAttribute("class","navbar__obj__login")
    login.setAttribute("id","login")
    login.innerText = ("Iniciar sesion")

    register.setAttribute("class","navbar__obj__register")
    register.setAttribute("id","register")
    register.innerText = "Registrarse"

    const lenS = sessionStorage.length;
    const lenL = localStorage.length;
    const linkR = document.getElementById("linkRegister")
    const linkL = document.getElementById("linkLogin")
    linkR.append(register)
    linkL.append(login)

    for(let i = 0; i<lenS; i++){
        const keyNameS = sessionStorage.key(i);
        const keyValueS = sessionStorage.getItem(keyNameS);
        let valueS = JSON.parse(keyValueS)
        if (keyNameS === "session" && valueS[0] === true){
            band = false
            const log = document.getElementById("login")
            const reg = document.getElementById("register")
            linkR.remove()
            linkL.remove()

            const linkU = document.getElementById("linkUser")
            const linkC = document.getElementById("linkCarrito")
            const user = document.createElement("h2")
            const cart = document.createElement("img")
            const contador = document.createElement("h3")
            for(let j = 0; j<lenL; j++){
                const keyNameL = localStorage.key(j);
                const keyValueL = localStorage.getItem(keyNameL);

                if(keyNameL === valueS[1]){
                    let valueL = JSON.parse(keyValueL)
                    user.innerText = valueL.firstName + " " + valueL.lastName
                    cart.setAttribute("class","navbar__obj__session__cart__img")
                    cart.setAttribute("src","https://cdn-icons-png.flaticon.com/512/46/46297.png")
                    cart.setAttribute("id","cart")
                    contador.setAttribute("id","contador")
                    contador.setAttribute("class","navbar__obj__session__cart__cont")
                    linkC.append(contador)
                    linkC.append(cart)
                    linkU.append(user)
                };
            };
        };
    };
};

//Funcion principal
function main(){
    refresh()
    actualizarNumero()

    cargarCarrito()
    cargarPlatos()
    cargarDatos()
};
main();