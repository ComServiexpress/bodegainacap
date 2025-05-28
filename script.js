document.addEventListener('DOMContentLoaded', function() {
    // Establecer fecha y hora actual por defecto
    const fechaInput = document.getElementById('fecha');
    const now = new Date();
    // Ajustar segundos y milisegundos a cero para evitar redondeo en algunos navegadores
    now.setSeconds(0, 0);
    // Formatear la fecha para el input datetime-local
    const formattedDate = now.toISOString().slice(0, 16);
    fechaInput.value = formattedDate;

    // Manejar el envío del formulario
    const herramientasForm = document.getElementById('herramientasForm');
    const modal = document.getElementById('confirmacionModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const confirmacionTexto = document.getElementById('confirmacionTexto');

    herramientasForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const carrera = document.getElementById('carrera').value;
        const fecha = fechaInput.value;
        
        // Formatear la fecha para mostrarla mejor
        const fechaObj = new Date(fecha);
        const opcionesFecha = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opcionesFecha);
        
        // Obtener herramientas solicitadas
        const herramientas = [];
        const inputsCantidad = document.querySelectorAll('input[type="number"]');
        
        inputsCantidad.forEach(input => {
            if (input.value > 0) {
                const herramientaNombre = input.previousElementSibling.textContent.trim();
                herramientas.push({
                    nombre: herramientaNombre,
                    cantidad: input.value
                });
            }
        });
        
        // Construir mensaje de confirmación
        let mensaje = `<p><strong>Solicitante:</strong> ${nombre}</p>`;
        mensaje += `<p><strong>Carrera:</strong> ${carrera}</p>`;
        mensaje += `<p><strong>Fecha de solicitud:</strong> ${fechaFormateada}</p>`;
        
        if (herramientas.length > 0) {
            mensaje += `<p><strong>Herramientas solicitadas:</strong></p><ul>`;
            herramientas.forEach(herramienta => {
                mensaje += `<li>${herramienta.nombre} - Cantidad: ${herramienta.cantidad}</li>`;
            });
            mensaje += `</ul>`;
        } else {
            mensaje += `<p class="warning">No se ha solicitado ninguna herramienta.</p>`;
        }
        
        // Mostrar modal con la información
        confirmacionTexto.innerHTML = mensaje;
        modal.style.display = 'block';
    });

    // Cerrar modal al hacer clic en la X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic en el botón Aceptar
    btnCerrarModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});