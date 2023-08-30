class Producto {
	constructor (id, nombre, precio, stock, img) {
		this.id = id
		this.nombre = nombre
		this.precio = precio
		this.stock = stock
		this.img = img
	}
}

class CarritoItem {
	constructor (producto, cantidad) {
		this.producto = producto
		this.cantidad = cantidad
	}
}

async function llamadaFetch () {
	const respuesta = await fetch ("../data/catalogo.json")
	const productos = await respuesta.json()
	return productos
}


llamadaFetch().then(catalogo => {

const carrito = JSON.parse(localStorage.getItem('carrito')) ?? []

const catalogoDOM = document.getElementById('catalogo')

const botonAgregar = document.getElementById('boton-agregar')

catalogo.forEach(producto => {
	const productoDOM = document.createElement('div')
	productoDOM.className = 'card-producto'

	//img producto
	const imgDOM = document.createElement('img')
	imgDOM.innerHTML = producto.img
	imgDOM.setAttribute('src', producto.img)
	productoDOM.appendChild(imgDOM)

	//nombre producto
	const tituloDOM = document.createElement('h4')
	tituloDOM.innerHTML = producto.nombre
	productoDOM.appendChild(tituloDOM) 

	//precio producto
	const precioDOM = document.createElement('h5')
	precioDOM.innerHTML = `$${producto.precio}`
	productoDOM.appendChild(precioDOM)

	//boton
	const botonAgregarDOM = document.createElement('button')
	botonAgregarDOM.innerHTML = 'Agregar al carrito'
	botonAgregarDOM.className = 'boton-tienda'
	botonAgregarDOM.addEventListener('click', () => {
	
		Toastify({
			text: 'Agregaste el producto a tu carrito',
			duration: 3000,
			gravity: 'bottom',
			position: 'right',
			destination: '../pages/carrito.html',
			className: 'toastify'
		}).showToast()

		//buscar si en el carrito ya hay un producto con el mismo id para evitar que se repita
		const carritoItem = carrito.find(e => e.producto.id === producto.id)

		carritoItem ? carritoItem.cantidad++ : carrito.push(new CarritoItem(producto, 1))
		
		localStorage.setItem('carrito', JSON.stringify(carrito))
	})
	productoDOM.appendChild(botonAgregarDOM)

	catalogoDOM.appendChild(productoDOM)
})
}
)
