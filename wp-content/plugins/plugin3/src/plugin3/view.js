document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('calcular-materiales');
    if (!boton) return;

    boton.addEventListener('click', async () => {
        const material = document.getElementById('p3-material').value;
        const unidad = document.getElementById('p3-unidad').value;
        const cantidad = parseFloat(document.getElementById('p3-cantidad').value);
        const contenedorResultado = document.getElementById('resultado-materiales');

        if (!cantidad || cantidad <= 0) {
            contenedorResultado.innerHTML = '<p class="p3-error">Por favor, ingrese una cantidad válida mayor a cero.</p>';
            return;
        }

        contenedorResultado.innerHTML = '<p class="p3-loading">Procesando cálculo en el servidor...</p>';

        try {
            // Consumo Real a la API interna que creamos en plugin3.php
            const response = await fetch(`/wp-json/plugin3/v1/calcular?material=${material}&unidad=${unidad}&cantidad=${cantidad}`);
            
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            
            const data = await response.json();

            // Renderizado dinámico e interactivo
            contenedorResultado.innerHTML = `
                <div class="plugin3-card animate-fade-in">
                    <div class="plugin3-header-res">
                        <h4>Resultados de Estimación</h4>
                        <span class="plugin3-badge">${data.material_nombre}</span>
                    </div>

                    <div class="plugin3-grid">
                        <div class="plugin3-datos">
                            <p><strong>Cálculo base:</strong> ~${data.cantidad_m2_sim} m² de cobertura.</p>
                            <p class="plugin3-highlight"><strong>Material Necesario:</strong> ${data.cantidad_necesaria} ${data.unidad_medida}</p>
                            <p class="plugin3-price"><strong>Costo Estimado:</strong> $${data.precio_estimado} USD</p>
                            
                            <hr />
                            <h5>Herramientas Recomendadas:</h5>
                            <ul class="plugin3-tools-list">
                                ${data.herramientas.map(h => `<li>${h.nombre}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="plugin3-media">
                            <img src="${data.imagen_material}" alt="${data.material_nombre}" class="plugin3-img-res"/>
                            <small class="plugin3-caption">Imagen demostrativa del material</small>
                        </div>
                    </div>
                </div>
            `;

        } catch (error) {
            console.error(error);
            contenedorResultado.innerHTML = '<p class="p3-error">Hubo un problema al conectar con la API de materiales.</p>';
        }
    });
});