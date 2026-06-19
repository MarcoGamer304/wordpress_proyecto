(function() {
    'use strict';

    function initSliders() {
        const sliders = document.querySelectorAll( '.slider-antes-despues-wrapper' );

        sliders.forEach( function( slider ) {
            initSlider( slider );
        } );
    }

    function initSlider( slider ) {
        const container = slider.querySelector( '.slider-antes-despues-container' );
        const overlay = slider.querySelector( '.slider-antes-despues-overlay' );
        const handle = slider.querySelector( '.slider-antes-despues-handle' );
        const orientacion = slider.classList.contains( 'slider-antes-despues-vertical' ) ? 'vertical' : 'horizontal';

        if ( ! container || ! overlay || ! handle ) {
            return;
        }

        let isDragging = false;

        function updateSliderPosition( event ) {
            if ( ! isDragging ) {
                return;
            }

            const rect = container.getBoundingClientRect();
            
            let position;
            
            if ( orientacion === 'horizontal' ) {
                const clientX = event.type.includes( 'touch' ) ? event.touches[ 0 ].clientX : event.clientX;
                position = clientX - rect.left;
                
                position = Math.max( 0, Math.min( position, rect.width ) );
                
                const percentage = ( position / rect.width ) * 100;
                
                overlay.style.width = percentage + '%';
                handle.style.left = percentage + '%';
            } else {
                const clientY = event.type.includes( 'touch' ) ? event.touches[ 0 ].clientY : event.clientY;
                position = clientY - rect.top;
                
                position = Math.max( 0, Math.min( position, rect.height ) );
                
                const percentage = ( position / rect.height ) * 100;
                
                overlay.style.height = percentage + '%';
                handle.style.top = percentage + '%';
            }
        }

        function startDrag( event ) {
            isDragging = true;
            
            event.preventDefault();
            
            updateSliderPosition( event );
            
            slider.classList.add( 'slider-antes-despues-active' );
        }

        function stopDrag() {
            isDragging = false;
            slider.classList.remove( 'slider-antes-despues-active' );
        }

        container.addEventListener( 'mousedown', startDrag );
        document.addEventListener( 'mousemove', updateSliderPosition );
        document.addEventListener( 'mouseup', stopDrag );

        container.addEventListener( 'touchstart', startDrag, { passive: false } );
        document.addEventListener( 'touchmove', updateSliderPosition, { passive: false } );
        document.addEventListener( 'touchend', stopDrag );

        if ( orientacion === 'horizontal' ) {
            overlay.style.width = '50%';
            handle.style.left = '50%';
        } else {
            overlay.style.height = '50%';
            handle.style.top = '50%';
        }
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', initSliders );
    } else {
        initSliders();
    }

    document.addEventListener( 'wp-block-library-init', function() {
        initSliders();
    } );

} )();
