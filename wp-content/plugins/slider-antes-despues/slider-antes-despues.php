<?php

/**
 * Plugin Name: Slider de Imagenes Antes/Despues
 * Description: Bloque de Gutenberg nativo para comparar imagenes.
 * Version: 1.0.0
 * Author: Marco
 * License: GPL-2.0-or-later
 * Text Domain: slider
 */

if (! defined('ABSPATH')) {
    exit;
}

function slider_antes_despues_register_block()
{
    register_block_type_from_metadata(
        __DIR__,
        array(
            'render_callback' => 'slider_antes_despues_render_block',
        )
    );
}
add_action('init', 'slider_antes_despues_register_block');


function slider_antes_despues_render_block($attributes, $content)
{
    wp_enqueue_script(
        'slider-antes-despues-view',
        plugins_url('src/view.js', __FILE__),
        array(),
        '1.0.0',
        true
    );

    wp_enqueue_style(
        'slider-antes-despues-style',
        plugins_url('src/style.css', __FILE__),
        array(),
        '1.0.0'
    );

    return $content;
}
