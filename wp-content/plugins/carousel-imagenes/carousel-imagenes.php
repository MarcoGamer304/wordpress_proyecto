<?php

/**
 * Plugin Name: Carrusel de Imágenes
 * Description: Bloque de Gutenberg nativo para crear carruseles de imágenes con animaciones, altura ajustable y ancho 100vw.
 * Version: 1.0.0
 * Author: Marco
 * License: GPL-2.0-or-later
 * Text Domain: carousel-imagenes
 */

if (! defined('ABSPATH')) {
    exit;
}

function carousel_imagenes_register_block()
{
    register_block_type_from_metadata(
        __DIR__,
        array(
            'render_callback' => 'carousel_imagenes_render_block',
        )
    );
}
add_action('init', 'carousel_imagenes_register_block');


function carousel_imagenes_render_block($attributes, $content)
{
    wp_enqueue_script(
        'carousel-imagenes-view',
        plugins_url('src/view.js', __FILE__),
        array(),
        '1.0.0',
        true
    );

    wp_enqueue_style(
        'carousel-imagenes-style',
        plugins_url('src/style.css', __FILE__),
        array(),
        '1.0.0'
    );

    return $content;
}
