// Agus_Cardetail 
let carrito = [];

const productos = [
    {id:1 , nombre : "shampoo", precio: 20000, stock: 0},
    {id:2 , nombre : "cera", precio: 10000, stock: 10},
    {id:3 , nombre : "acondionador ext.", precio: 25000, stock: 1},
    {id:4 , nombre : "acondionador int.", precio: 50000, stock: 50},
    {id:5 , nombre : "cepillo", precio: 50000, stock: 50},
    {id:6 , nombre : "pulidora", precio: 50000, stock: 50},
    {id:7 , nombre : "sellador", precio: 50000, stock: 50}
];

const cargar_productos = () => {
    let contenedor = document.getElementById("cont_productos");
    contenedor.innerHTML = ""; 

    productos.forEach((producto) => { 
        let div = document.createElement("div"); 
        div.className = "card-producto";  
        let textoStock;
        if (producto.stock === 1) {
            textoStock = "¡ÚLTIMA UNIDAD!";
        } else if (producto.stock === 0) {
            textoStock = "AGOTADO";
        } else {
            textoStock = `Stock disponible: ${producto.stock}`;
        }

        div.innerHTML = `
            <h1>${producto.nombre}</h1>
            <h2>$${producto.precio}</h2>
            <p>${textoStock}</p>
            <button class='btn_agregar' data-id="${producto.id}">Agregar al carrito</button>
        `; 
        contenedor.appendChild(div); 
    });

    let but_Agr = document.querySelectorAll(".btn_agregar"); 
    but_Agr.forEach((x) => x.addEventListener("click", (i) => { 
        let prod_enc = productos.find((p) => p.id == i.target.dataset.id); 
        //Control del stock 
        if (prod_enc.stock > 0) {
            let existe = carrito.find((p) => p.id == prod_enc.id);

            if (existe) {
                existe.cantidad++; 
            } else { 
                prod_enc.cantidad = 1; 
                carrito.push(prod_enc); 
            }

            prod_enc.stock--; 
            cargar_productos(); 
            total_Ul();
        } else {
            alert("¡No posee más stock de este producto!"); 
        }
    }));
    if (document.getElementById("ventana_carrito").style.display === "block") { //
                carrito_loading(); 
            }
};

const total_Ul = () => {
    const totalUnidades = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    document.getElementById("contador-carrito").innerText = totalUnidades; 
};

const eliminarProducto = (id) => {
    let producto = carrito.find((p) => p.id === id);
    if (producto) {
        // enviamos al strock de donde lo sacamos 
        let prodOriginal = productos.find((p) => p.id === id);
        prodOriginal.stock++; 

        if (producto.cantidad > 1) {
            producto.cantidad--; 
        } else {
            carrito = carrito.filter((p) => p.id !== id);
        }
    }
    total_Ul();
    cargar_productos();
    carrito_loading(); 
};

const limpiarCarrito = () => {
    // Devolvemos el stock antes de vaciar
    carrito.forEach(p => {
        let prodOriginal = productos.find(po => po.id === p.id);
        prodOriginal.stock += p.cantidad;
    });
    
    carrito = []; 
    total_Ul();
    cargar_productos();
    carrito_loading();
};

const carrito_loading = () => {
    let cont_ventana = document.getElementById("ventana_carrito");
    let lista_carrito = document.getElementById("lista-carrito");
    
    lista_carrito.innerHTML = ""; 

    let cabecera = document.createElement("div");
    cabecera.innerHTML = `
            <p><strong>PRODUCTO | CANT | SUBTOTAL</strong> <button id="btn-limpiar">LIMPIAR CARRITO</button></p>   
    `;
    lista_carrito.appendChild(cabecera);

    carrito.forEach((p) => {
        let div_item = document.createElement("div");
        div_item.className = "lista_carrito";
        div_item.innerHTML = `
            <p>${p.nombre} | ${p.cantidad} | $${p.precio * p.cantidad} <button class="btn-quitar" data-id="${p.id}"> X </button></p>
            
        `;
        lista_carrito.appendChild(div_item);
    });

    document.getElementById("btn-limpiar").onclick = limpiarCarrito;
    document.querySelectorAll(".btn-quitar").forEach(btn => {
        btn.onclick = (e) => eliminarProducto(parseInt(e.target.dataset.id));
    });

    const totalCompra = carrito.reduce((acu, p) => acu + (p.precio * p.cantidad), 0); 
    let div_total = document.createElement("div");
    div_total.innerHTML = `<hr><h3>Total Final: $${totalCompra}</h3>`;
    lista_carrito.appendChild(div_total);

    cont_ventana.style.display = "block";
     
};

cargar_productos();

document.getElementById("icon-carrito").addEventListener("click", carrito_loading); 


document.getElementById("btn-cerrar").addEventListener("click", () => {
    document.getElementById("ventana_carrito").style.display = "none";
});
document.getElementById("btn-comprar").addEventListener("click", () => {
    if (carrito.length > 0) {
        
            alert("Su compra fue registrada con exito!")
            carrito = [];
            document.getElementById("contador-carrito").innerText = "0";
            document.getElementById("ventana_carrito").style.display = "none"; 
            cargar_productos();  
            
    } else {
            alert("El carrito está vacío. Agregue productos para comprar.");
    }
});