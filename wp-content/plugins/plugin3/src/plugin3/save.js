import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
    return (
        <div {...useBlockProps.save() }>
            <div class="plugin3-container">
                <h3>Calculadora de Construcción Avanzada</h3>
                <p class="description">Selecciona tus especificaciones para estimar los materiales y herramientas necesarias.</p>
                
                <div class="plugin3-form-group">
                    <label for="p3-material">Material principal:</label>
                    <select id="p3-material">
                        <option value="madera">Madera</option>
                        <option value="metal">Metal</option>
                        <option value="cemento">Cemento / Concreto</option>
                        <option value="ceramica">Cerámica</option>
                    </select>
                </div>

                <div class="plugin3-form-group">
                    <label for="p3-unidad">Unidad de medida:</label>
                    <select id="p3-unidad">
                        <option value="m2">Metros Cuadrados (m²)</option>
                        <option value="m">Metros Lineales (m)</option>
                        <option value="cm">Centímetros (cm)</option>
                    </select>
                </div>

                <div class="plugin3-form-group">
                    <label for="p3-cantidad">Cantidad o dimensión:</label>
                    <input type="number" id="p3-cantidad" placeholder="Ej. 15" min="1" step="any" />
                </div>

                <button id="calcular-materiales" class="plugin3-btn">
                    Calcular Presupuesto y Herramientas
                </button>

                <div id="resultado-materiales" class="plugin3-resultado-wrapper"></div>
            </div>
        </div>
    );
}