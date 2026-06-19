import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  MediaPlaceholder,
  BlockControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  SelectControl,
  ColorPalette,
  ToolbarButton,
  ToolbarGroup,
} from "@wordpress/components";
import { replace, image } from "@wordpress/icons";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const {
    imgAntesId,
    imgAntesUrl,
    imgDespuesId,
    imgDespuesUrl,
    colorDivisor,
    orientacion,
  } = attributes;

  const onSelectImages = (media) => {
    if (media && media.length >= 2) {
      setAttributes({
        imgAntesId: media[0].id,
        imgAntesUrl: media[0].url,
        imgDespuesId: media[1].id,
        imgDespuesUrl: media[1].url,
      });
    }
  };

  const onReplaceImages = () => {
    setAttributes({
      imgAntesId: 0,
      imgAntesUrl: "",
      imgDespuesId: 0,
      imgDespuesUrl: "",
    });
  };

  const blockProps = useBlockProps({
    className: `slider-antes-despues-wrapper slider-antes-despues-${orientacion}`,
    style: { "--color-divisor": colorDivisor },
  });

  return (
    <>
      {imgAntesUrl && imgDespuesUrl && (
        <BlockControls>
          <ToolbarGroup>
            <ToolbarButton
              icon={replace}
              label={__("Reemplazar imágenes", "slider-antes-despues")}
              onClick={onReplaceImages}
            />
          </ToolbarGroup>
        </BlockControls>
      )}

      <div {...blockProps}>
        {!imgAntesUrl || !imgDespuesUrl ? (
          <MediaPlaceholder
            icon={image}
            labels={{
              title: __(
                "Slider de Imágenes Antes/Después",
                "slider-antes-despues",
              ),
              instructions: __(
                'Selecciona o sube dos imágenes para crear el slider de comparación. La primera imagen será el "Antes" y la segunda el "Después".',
                "slider-antes-despues",
              ),
            }}
            onSelect={onSelectImages}
            accept="image/*"
            allowedTypes={["image"]}
            multiple={true}
            addToGallery={false}
          />
        ) : (
        
          <div className="slider-antes-despues-preview">
            <div className="slider-antes-despues-container">
              <img
                src={imgDespuesUrl}
                alt={__("Imagen Después", "slider-antes-despues")}
                className="slider-antes-despues-img slider-antes-despues-img-despues"
              />

              <div className="slider-antes-despues-overlay">
                <img
                  src={imgAntesUrl}
                  alt={__("Imagen Antes", "slider-antes-despues")}
                  className="slider-antes-despues-img slider-antes-despues-img-antes"
                />
              </div>

              <div className="slider-antes-despues-handle">
                <div className="slider-antes-despues-handle-button">
                  <span className="slider-antes-despues-handle-arrow slider-antes-despues-handle-arrow-left">
                    ‹
                  </span>
                  <span className="slider-antes-despues-handle-arrow slider-antes-despues-handle-arrow-right">
                    ›
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
