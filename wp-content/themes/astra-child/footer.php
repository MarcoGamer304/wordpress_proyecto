<?php

if (! defined('ABSPATH')) {
    exit;
}
?>

<?php astra_content_bottom(); ?>
</div>
</div>

<footer class="site-footer-custom">
    <div class="container">

        <div class="footer-column">
            <h3>Proyecto</h3>
            <p>Transformamos ideas audaces en plataformas digitales de alto impacto.</p>
        </div>

        <div class="footer-column">
            <h3>Explorar</h3>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Proyectos</a></li>
                <li><a href="#">Sobre nosotros</a></li>
            </ul>
        </div>

        <div class="footer-column">
            <h3>Recursos</h3>
            <ul>
                <li><a href="#">Casos de Éxito</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Preguntas frecuentes</a></li>
            </ul>
        </div>

        <div class="footer-column">
            <h3>Síguenos</h3>
            <ul>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">X / Twitter</a></li>
                <li><a href="#">YouTube</a></li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom">
        <p>
            © <?php echo date('Y'); ?>
            <?php bloginfo('name'); ?> · Todos los derechos reservados.
        </p>
    </div>
</footer>

</div>

<?php
astra_body_bottom();
wp_footer();
?>

</body>

</html>