import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
    return (
        <div {...useBlockProps()}>
            <div style={{ padding: '20px', border: '2px dashed #007cba', backgroundColor: '#f0f6fa' }}>
                <h3>Estás editando: Calculadora de Construcción Avanzada</h3>
                <p>Este bloque se renderizará dinámicamente en el frontend con inputs interactivos de selección de material, conversión de medidas y llamada a la API REST.</p>
            </div>
        </div>
    );
}