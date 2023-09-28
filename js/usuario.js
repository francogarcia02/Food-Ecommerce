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

function acrtualizarNumero(){
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

function check(user, password2){
    const {firstName, lastName, id, money, email, password} = user

    let passE0 = false;
    let passE1 = false;
    let passE2 = false;
    let emea = false;
    const len = localStorage.length;
    for(let i = 0; i<len; i++){
        const keyName = localStorage.key(i);
        const keyValue = localStorage.getItem(keyName);
        if (typeof keyValue !== "undefined"){
            let value = JSON.parse(keyValue);
            if (value.email == email){
                emea = true;
                break;
            }
        }
    }

    if (password !== password2){
        passE0 = true
    }
    else if(password.length < 8 || password.length > 15){
        passE1 = true
    }
    if (password.includes("!") || password.includes("#") || password.includes("$") || password.includes("%") || password.includes("&") || password.includes(".") || password.includes("*") || password.includes("@")){
        passE2 = false
    }
    else{
        passE2 = true
    }

    if(firstName == "" || lastName == "" || id == "" || money == "" || passE0 || passE1 || passE2 || emea){
        const form = document.getElementById('form_register');
        const h4 = document.createElement("div")
        h4.setAttribute("class", "data__card__div__failure")
        h4.innerText = "Error en la carga de datos"
        if (emea){
            const errorEmail = document.createElement("p")
            errorEmail.setAttribute("class", "data__card__div__failure__error")
            errorEmail.innerText = "Correo ya en uso, intente otra vez."
            h4.append(errorEmail)
        }
        if (passE0){
            const errorPassword = document.createElement("p")
            errorPassword.setAttribute("class", "data__card__div__failure__error")
            errorPassword.innerText = "Las contraseñas no coinciden, intente otra vez."
            h4.append(errorPassword)
        }
        if (passE1){
            const errorPassword = document.createElement("p")
            errorPassword.setAttribute("class", "data__card__div__failure__error")
            errorPassword.innerText = "Contraseña fuera de parametros, intente de nuevo."
            h4.append(errorPassword)
        }
        if (passE2){
            const errorPassword = document.createElement("p")
            errorPassword.setAttribute("class", "data__card__div__failure__error")
            errorPassword.innerText = "Contraseña invalida, faltan simbolos."
            h4.append(errorPassword)
        }
        form.append(h4)
        return false
    }
    else{
        const form = document.getElementById('form_register');
        const h4 = document.createElement("h4")
        h4.innerHTML = "<div class='data__card__div__success'>Datos cargados correctamente</div>"
        form.append(h4)
        return true
    }
};

function login(){
    let mailExist = false
    let passwordError = true
    const mail = document.getElementById("email_login").value
    const passwordLog = document.getElementById("password_login").value
    const form = document.getElementById('form_login');

    const lenS = sessionStorage.length;
    const lenL = localStorage.length;

    for(let i = 0; i<lenL; i++){
        const keyName = localStorage.key(i);
        const keyValue = localStorage.getItem(keyName);
        const userComp = JSON.parse(keyValue)
        if (userComp.email == mail){
            mailExist = true
        }
    }

    if (mailExist){
        for(let i = 0; i<lenL; i++){
            const keyName = localStorage.key(i);
            const keyValue = localStorage.getItem(keyName);
            const userComp = JSON.parse(keyValue)
            if (userComp.password == passwordLog){
                let session = [true, userComp.id]
                let carrito = []
                sessionStorage.setItem("cart",JSON.stringify(carrito))
                sessionStorage.setItem("session",JSON.stringify(session))
                window.location.replace("../home.html");
                passwordError = false
            }
        }
    }
    else{
        const errorEmail = document.createElement("p")
        errorEmail.setAttribute("class", "data__card__div__failure")
        errorEmail.innerText = "Correo inexistente."
        form.append(errorEmail)
    }
    if (passwordError){
        const errorEmail = document.createElement("p")
        errorEmail.setAttribute("class", "data__card__div__failure")
        errorEmail.innerText = "Correo o contraseña incorrectos."
        form.append(errorEmail)
    }


};

function register(){
    const first = document.getElementById('nombre');
    const last = document.getElementById('apellido');
    const doc = document.getElementById('doc');
    const mon = document.getElementById('dinero');
    const em = document.getElementById('email');
    const pass1 = document.getElementById('password1');
    const pass2 = document.getElementById('password2');
    password2 = pass2.value

    const user = {
        email: em.value,
        password: pass1.value,
        firstName: first.value,
        lastName: last.value,
        id: doc.value,
        money: mon.value,
    }

    const bandera = check(user, password2)
    if (bandera){
        let session = [true, user.id]
        let carrito = []
        sessionStorage.setItem("cart",JSON.stringify(carrito))
        localStorage.setItem(user.id, JSON.stringify(user))
        sessionStorage.setItem("session",JSON.stringify(session))
        window.location.replace("../home.html");
    }

};

function datos(){
    const lenL = localStorage.length;
    const lenS = sessionStorage.length;
    for(let i = 0; i<lenS; i++){
        const keyNameS = sessionStorage.key(i);
        const keyValueS = sessionStorage.getItem(keyNameS);
        let valueS = JSON.parse(keyValueS);
        if(keyNameS === "session" && valueS[0] === true){
            const contUser = document.getElementById("contUser");
            const article = document.createElement("article");
            for(let j = 0; j<lenL; j++){

                const keyNameL = sessionStorage.key(j);
                const keyValueL = sessionStorage.getItem(keyNameL);
                let valueL = JSON.parse(keyValueL);
                if(valueS[1] === keyNameL){

                    article.innerHTML = `
                        <h3>Datos personales</h3>
                        <div>
                            <h4>Nombre:</h4>
                            <h4>Apellido:</h4>
                            <h4>Correo electronico:</h4>
                            <h4>Documento:</h4>
                            <h4>Dinero:</h4>
                        </div>
                    `
                    contUser.append(article)
                };
            };
        };
    };

    for(let i = 0; i<lenS; i++){
        const keyNameS = sessionStorage.key(i);
        const keyValueS = sessionStorage.getItem(keyNameS);
        let valueS = JSON.parse(keyValueS)
        if (keyNameS === "session" && valueS[0] === true){
            const contUser = document.getElementById("contUser");
            const article = document.createElement("article");
            for(let j = 0; j<lenL; j++){
                const keyNameL = localStorage.key(j);
                const keyValueL = localStorage.getItem(keyNameL);
                if(keyNameL === valueS[1]){
                    let valueL = JSON.parse(keyValueL)
                    const {firstName, lastName, email, id, money} = valueL;
                    article.innerHTML = `
                        <h3 class="user__title">Datos personales</h3>
                        <div class="user__grid">
                            <h4 class="user__grid__items">Nombre:</h4>
                            <h4 class="user__grid__datos">${firstName}</h4>
                            <h4 class="user__grid__items">Apellido:</h4>
                            <h4 class="user__grid__datos">${lastName}</h4>
                            <h4 class="user__grid__items">Correo electronico:</h4>
                            <h4 class="user__grid__datos">${email}</h4>
                            <h4 class="user__grid__items">Documento:</h4>
                            <h4 class="user__grid__datos">${id}</h4>
                            <h4 class="user__grid__items">Dinero:</h4>
                            <h4 class="user__grid__datos">$${money}</h4>
                        </div>
                    `
                    contUser.append(article)
                };
            };
        };
    };
};

function main(){
    refresh()
    acrtualizarNumero()
    const botonRegister = document.getElementById("button_register")
    const botonLogin = document.getElementById("button_login")

    if (botonRegister) {
        botonRegister.onclick = register
    }
    if (botonLogin) {
        botonLogin.onclick = login
    }
    datos()
};

main()