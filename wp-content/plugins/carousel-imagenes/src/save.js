import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
    const {
        images,
        altura,
        animacion,
        autoplay,
        intervalo,
        mostrarIndicadores,
        mostrarFlechas
    } = attributes;

    if ( ! images || images.length === 0 ) {
        return null;
    }

    const blockProps = useBlockProps.save( {
        className: 'carousel-imagenes-wrapper',
        style: { 
            '--carousel-height': altura,
            '--carousel-animation': animacion,
            '--carousel-autoplay': autoplay ? 'true' : 'false',
            '--carousel-interval': intervalo + 'ms'
        },
        'data-autoplay': autoplay,
        'data-interval': intervalo,
        'data-animation': animacion
    } );

    return (
        <div { ...blockProps }>
            <div className="carousel-imagenes-container">
                { images.map( ( img, index ) => (
                    <div
                        key={ img.id }
                        className={ `carousel-imagenes-slide ${ index === 0 ? 'carousel-imagenes-active' : '' }` }
                        data-index={ index }
                    >
                        <img
                            src={ img.url }
                            alt={ img.alt || `Slide ${ index + 1 }` }
                            className="carousel-imagenes-img"
                        />
                    </div>
                ) ) }
            </div>

            { mostrarIndicadores && (
                <div className="carousel-imagenes-indicators">
                    { images.map( ( _, index ) => (
                        <button
                            key={ index }
                            className={ `carousel-imagenes-indicator ${ index === 0 ? 'carousel-imagenes-indicator-active' : '' }` }
                            data-index={ index }
                        />
                    ) ) }
                </div>
            ) }

            { mostrarFlechas && (
                <>
                    <button className="carousel-imagenes-arrow carousel-imagenes-arrow-prev" data-direction="prev">
                        ‹
                    </button>
                    <button className="carousel-imagenes-arrow carousel-imagenes-arrow-next" data-direction="next">
                        ›
                    </button>
                </>
            ) }
        </div>
    );
}
