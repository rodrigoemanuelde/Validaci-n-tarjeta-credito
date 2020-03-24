const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector("#formulario-tarjeta"),
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreTarjeta = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logo-marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta .mes'),
      yearExpiracion = document.querySelector('#tarjeta .year'),
      ccv = document.querySelector('#tarjeta #expiracion .ccv');

// Voltear la tarjeta para mostrar el frente
const mostrarFrente = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}

//  Rotación de la tarjeta
tarjeta.addEventListener('click', ()=> {
    tarjeta.classList.toggle('active');
});


// Abrir Formulario
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
})

//  Select del mes generado dinámicamente

for(let i=1; i<=12; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}


//  Select del día generado dinámicamente

const yearActual = new Date().getFullYear();

for(let i = yearActual; i <= yearActual +  8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

//  Input número de tarjeta

formulario.inputNumero.addEventListener('keyup', (e)=> {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    // Eliminar espacios en blanco
    .replace(/\s/g, '')
    // Eliminar las letras
    .replace(/\D/g, '')
    // Espacio cada cuatro números
    .replace(/([0-9]{4})/g, '$1 ')
    // Elimina el último espacio
    .trim();

    numeroTarjeta.textContent = valorInput;

    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }

    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    } else if (valorInput[0] == 5){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // Voltear frente
    mostrarFrente()
});

// Input nombre de tarjeta

formulario.inputNombre.addEventListener('keyup', (e) =>{
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreTarjeta.textContent = 'Johnny Cage';
    }
    mostrarFrente();
});


// select del mes

formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
})

// select del año

formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
})



// * CCV
formulario.inputCCV.addEventListener('keyup', ()=> {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});