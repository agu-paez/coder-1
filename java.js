//Agus_Cardetail


let carrito = [];
let productos = [{id:1, nombre : "shampoo", precio: 20000},
    {id:2, nombre : "cera", precio: 10000},
    {id:3, nombre : "acondionador ext.", precio: 25000},
    {id:4, nombre : "acondionador int.", precio: 50000}];

const eliminar_ultimo = () => {
    if (carrito.length > 0) {
        let eliminado = carrito.pop();
        alert("Se eliminó: " + eliminado.nombre);
    } else {
        alert("El carrito ya está vacío.");
    }
}


const agregar_carrito =(i) => {carrito.push(productos[parseInt(i)])};


let opcion;
do {
    opcion=prompt(
        "Bienvenidos a productos cardetail Ingrese el nombre del producto o numero de opcion. \n 1_shampoo - 2_cera - 3_acondionador ext - 4_acondionador int 5-Ver el carrito 6-Salir 7-eliminar" );
        //busque una palabra clave(.trim) como en python para elminar los espacios en blanco pero lo comento porque no lo dieron 
        if (opcion === null ){ // va dentro del if || opcion.trim() === ""
            if (carrito.length !== 0) {
            alert("El carrito tiene objetos todavía.");
            let opc = prompt("Ingrese 'si' para salir o cualquier tecla para continuar cargando:");
            if (opc && opc.toLowerCase() === "si") {
                opcion = "6";
            } else {
                opcion = "continuar"; 
            }
        } else {
            opcion = "6"; 
        }
    }
        if (opcion) opcion = opcion.toLowerCase();
        switch(opcion){
        case "1":
        case "shampoo": 
            agregar_carrito(0); 
            break;
        case "2": 
        case "cera": 
            agregar_carrito(1); 
            break;
        case "3": 
        case "acondionador int": 
            agregar_carrito(2); 
            break;
        case "4" :
        case "ACONDICIONADOR EXT": 
            agregar_carrito(3); 
            break;
        case "5":
            if (carrito.length === 0){
                alert("El carrito esta vacio!")
            }
            else
                {console.log(carrito)};
            break;
        case "7":
            eliminar_ultimo();
            break

        case "6":
            alert("Gracias por visitarnos!");
            break;
        default:
            alert("Opción incorrecta...");
            break;
    } 
}while (opcion != 6);