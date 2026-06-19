import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
    const {
        imgAntesUrl,
        imgDespuesUrl,
        colorDivisor,
        orientacion
    } = attributes;

    if ( ! imgAntesUrl || ! imgDespuesUrl ) {
        return null;
    }

    const blockProps = useBlockProps.save( {
        className: `slider-antes-despues-wrapper slider-antes-despues-${ orientacion }`,
        style: { '--color-divisor': colorDivisor },
    } );

    return (
        <div { ...blockProps }>
            <div className="slider-antes-despues-container">

                <img
                    src={ imgDespuesUrl }
                    alt="Imagen Después"
                    className="slider-antes-despues-img slider-antes-despues-img-despues"
                />

                <div className="slider-antes-despues-overlay">
                    <img
                        src={ imgAntesUrl }
                        alt="Imagen Antes"
                        className="slider-antes-despues-img slider-antes-despues-img-antes"
                    />
                </div>

                <div className="slider-antes-despues-handle">
                    <div className="slider-antes-despues-handle-button">
                        <span className="slider-antes-despues-handle-arrow slider-antes-despues-handle-arrow-left">‹</span>
                        <span className="slider-antes-despues-handle-arrow slider-antes-despues-handle-arrow-right">›</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
