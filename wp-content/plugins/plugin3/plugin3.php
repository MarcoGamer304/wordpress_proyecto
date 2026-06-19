<?php
/**
 * Plugin Name:       Plugin3 - Calculadora Avanzada
 * Description:       Calculadora avanzada de materiales y presupuesto para Gutenberg.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Tu Nombre
 * License:           GPL-2.0-or-later
 * Text Domain:       plugin3
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function create_block_plugin3_block_init() {
    // Asegúrate de tener configurado tu block.json para registrar los scripts
    wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'create_block_plugin3_block_init' );

// Registrar la ruta de la API REST
add_action( 'rest_api_init', function () {
    register_rest_route( 'plugin3/v1', '/calcular', array(
        'methods'             => 'GET',
        'callback'            => 'plugin3_calcular_materiales_avanzado',
        'permission_callback' => '__return_true',
    ) );
} );

function plugin3_calcular_materiales_avanzado( $request ) {
    $material = sanitize_text_field( $request->get_param('material') );
    $unidad   = sanitize_text_field( $request->get_param('unidad') );
    $cantidad = floatval( $request->get_param('cantidad') );

    if ( ! $material || ! $unidad || $cantidad <= 0 ) {
        return new WP_Error( 'invalid_data', 'Datos insuficientes', array( 'status' => 400 ) );
    }

    // 1. Normalizar la cantidad a Metros Cuadrados (m2) aproximados para el cálculo
    $m2 = $cantidad;
    if ( $unidad === 'cm' ) {
        $m2 = ( $cantidad / 100 ) * 0.5; // Estimación lineal convertida a área de cobertura aproximada
    } elseif ( $unidad === 'm' ) {
        $m2 = $cantidad * 1.0; // Asumiendo un ancho estándar de 1 metro
    }

    // 2. Base de datos simulada en producción (Estructura real de backend)
    $datos_materiales = array(
        'madera' => array(
            'nombre' => 'Madera de Pino Tratada',
            'precio_base_m2' => 25.50,
            'calculo_factor' => 1.1, // 10% de desperdicio
            'unidad_resultado' => 'Tablones (2x4)',
            'query_img' => 'wood-planks',
            'herramientas' => array(
                array('nombre' => 'Serrucho Eléctrico', 'query' => 'circular-saw'),
                array('nombre' => 'Martillo de Carpintero', 'query' => 'hammer'),
                array('nombre' => 'Cinta Métrica', 'query' => 'tape-measure')
            )
        ),
        'metal' => array(
            'nombre' => 'Perfiles de Acero Galvanizado',
            'precio_base_m2' => 45.00,
            'calculo_factor' => 1.05,
            'unidad_resultado' => 'Estructuras / Perfiles',
            'query_img' => 'metal-construction',
            'herramientas' => array(
                array('nombre' => 'Amoladora Angular', 'query' => 'angle-grinder'),
                array('nombre' => 'Soldadora Inverter', 'query' => 'welding'),
                array('nombre' => 'Gafas de Seguridad', 'query' => 'safety-glasses')
            )
        ),
        'cemento' => array(
            'nombre' => 'Mezcla de Concreto Tradicional',
            'precio_base_m2' => 15.00,
            'calculo_factor' => 0.25, // Sacos por m2
            'unidad_resultado' => 'Sacos de 50kg',
            'query_img' => 'concrete-cement',
            'herramientas' => array(
                array('nombre' => 'Paleta de Albañil', 'query' => 'trowel'),
                array('nombre' => 'Mezcladora de Cemento', 'query' => 'concrete-mixer'),
                array('nombre' => 'Carretilla de mano', 'query' => 'wheelbarrow')
            )
        ),
        'ceramica' => array(
            'nombre' => 'Porcelanato / Cerámica de Alto Tránsito',
            'precio_base_m2' => 35.00,
            'calculo_factor' => 1.15, // 15% desperdicio por cortes
            'unidad_resultado' => 'Cajas de Cerámica',
            'query_img' => 'ceramic-tiles',
            'herramientas' => array(
                array('nombre' => 'Cortadora de Azulejos', 'query' => 'tile-cutter'),
                array('nombre' => 'Llana Dentada', 'query' => 'notched-trowel'),
                array('nombre' => 'Mazo de Goma', 'query' => 'rubber-mallet')
            )
        )
    );

    if ( ! isset( $datos_materiales[$material] ) ) {
        return new WP_Error( 'invalid_material', 'Material no soportado', array( 'status' => 400 ) );
    }

    $info = $datos_materiales[$material];
    
    // Cálculos basados en las variables enviadas
    $cantidad_requerida = ceil( $m2 * $info['calculo_factor'] );
    $costo_total = round( $cantidad_requerida * $info['precio_base_m2'], 2 );

    // Consumo de API de imágenes real (Usamos Source Unsplash dinámico que no requiere API Key pesada para pruebas)
    // En producción avanzada puedes usar fetch remoto a 'https://api.unsplash.com/search/photos'
    $imagen_material = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80&sig=" . rand(1,100); 
    
    // Mapear URLs estables orientadas al query arquitectónico/construcción
    $img_queries = array(
        'madera' => 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
        'metal' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500',
        'cemento' => 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500',
        'ceramica' => 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500'
    );

    return rest_ensure_response( array(
        'material_nombre'  => $info['nombre'],
        'cantidad_m2_sim'  => round($m2, 2),
        'cantidad_necesaria'=> $cantidad_requerida,
        'unidad_medida'    => $info['unidad_resultado'],
        'precio_estimado'  => $costo_total,
        'imagen_material'  => $img_queries[$material],
        'herramientas'     => $info['herramientas']
    ) );
}