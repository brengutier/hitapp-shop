//definir carrito

const carrito = JSON.parse(localStorage.getItem('carrito')) ?? []

//agregar productos al carrito

const bodyTableDOM = document.getElementById('bodyTable')

//función para pintar carrito
const renderCarrito = () => {
	if (carrito.length === 0) {
        const contenedorCarrito = document.querySelector('.carrito-div')
		contenedorCarrito.innerHTML = `
            <p>No hay productos en el carrito.</p>
            <a class="boton-volver" href="../index.html">Volver a la tienda</a>
        `
		
	} else {
		bodyTableDOM.innerHTML = ''

		for (let item of carrito) {
			const trItemDOM = document.createElement('tr')
			trItemDOM.innerHTML = `
				<td>${item.producto.nombre}</td>
				<td>$${item.producto.precio}</td>
			`

			//td para unidades
			const tdCantidadDOM = document.createElement('td')
			tdCantidadDOM.className = 'unidades-DOM'

			const botonRestarDOM = document.createElement('button')
			botonRestarDOM.innerHTML = '-'
			botonRestarDOM.className = 'boton-sumar-restar'
			botonRestarDOM.addEventListener('click', () => {
				if (item.cantidad > 1) {
					item.cantidad--
				} else {
					carrito.splice(carrito.indexOf(item), 1)
				}
				localStorage.setItem('carrito', JSON.stringify(carrito))	
				renderCarrito()
			})
			tdCantidadDOM.appendChild(botonRestarDOM)

			const unidadesDOM = document.createElement('p')
			unidadesDOM.className = 'unidades-p-DOM'
			unidadesDOM.innerHTML = `${item.cantidad}`
			tdCantidadDOM.appendChild(unidadesDOM)

			const botonSumarDOM = document.createElement('button')
			botonSumarDOM.innerHTML = '+'
			botonSumarDOM.className = 'boton-sumar-restar'
			botonSumarDOM.addEventListener('click', () => {
				item.cantidad++
				localStorage.setItem('carrito', JSON.stringify(carrito))
				renderCarrito()
			})
			tdCantidadDOM.appendChild(botonSumarDOM)
			
			
			trItemDOM.appendChild(tdCantidadDOM)

			//fin td unidades

			trItemDOM.insertAdjacentHTML('beforeend', `<td>$${item.cantidad * item.producto.precio}</td>`)
		
			bodyTableDOM.appendChild(trItemDOM)
		}
		
		const total = carrito.reduce((total, item) => total + item.cantidad * item.producto.precio, 0)
		
		const trTotalDOM = document.createElement('tr')
		trTotalDOM.innerHTML = `
			<td><strong>Total</strong></td>
			<td></td>
			<td></td>
			<td><strong>$${total}</strong></td>
		`
		bodyTableDOM.appendChild(trTotalDOM)

		const divCarrito = document.querySelector('.carrito-div-div')
		divCarrito.innerHTML = `
            <a class="boton-volver" href="../pages/checkout.html">Comprar</a>
        `
	}
}
	
//pintar el carrito
renderCarrito()
