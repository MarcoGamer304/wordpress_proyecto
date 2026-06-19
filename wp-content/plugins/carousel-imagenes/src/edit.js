import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  MediaPlaceholder,
  BlockControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  SelectControl,
  ToggleControl,
  RangeControl,
  ToolbarButton,
  ToolbarGroup,
} from "@wordpress/components";
import { replace, image } from "@wordpress/icons";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const {
    images,
    altura,
    animacion,
    autoplay,
    intervalo,
    mostrarIndicadores,
    mostrarFlechas,
  } = attributes;

  const onSelectImages = (media) => {
    if (media && media.length > 0) {
      const newImages = media.map((item) => ({
        id: item.id,
        url: item.url,
        alt: item.alt || "",
      }));
      setAttributes({ images: newImages });
    }
  };

  const onClearImages = () => {
    setAttributes({ images: [] });
  };

  const blockProps = useBlockProps({
    className: "carousel-imagenes-wrapper",
    style: { "--carousel-height": altura },
  });

  const animacionOptions = [
    { label: __("Fade", "carousel-imagenes"), value: "fade" },
    { label: __("Slide", "carousel-imagenes"), value: "slide" },
    { label: __("Zoom", "carousel-imagenes"), value: "zoom" },
  ];

  return (
    <>
      {images.length > 0 && (
        <BlockControls>
          <ToolbarGroup>
            <ToolbarButton
              icon={replace}
              label={__("Reemplazar imágenes", "carousel-imagenes")}
              onClick={onClearImages}
            />
          </ToolbarGroup>
        </BlockControls>
      )}

      <InspectorControls>
        <PanelBody title={__("Configuración del Carrusel", "carousel-imagenes")}>
          <TextControl
            label={__("Altura", "carousel-imagenes")}
            value={altura}
            onChange={(value) => setAttributes({ altura: value })}
            help={__("Ej: 500px, 60vh", "carousel-imagenes")}
          />
          <SelectControl
            label={__("Tipo de Animación", "carousel-imagenes")}
            value={animacion}
            options={animacionOptions}
            onChange={(value) => setAttributes({ animacion: value })}
          />
          <ToggleControl
            label={__("Autoplay", "carousel-imagenes")}
            checked={autoplay}
            onChange={(value) => setAttributes({ autoplay: value })}
          />
          {autoplay && (
            <RangeControl
              label={__("Intervalo (ms)", "carousel-imagenes")}
              value={intervalo}
              onChange={(value) => setAttributes({ intervalo: value })}
              min={1000}
              max={10000}
              step={500}
            />
          )}
          <ToggleControl
            label={__("Mostrar Indicadores", "carousel-imagenes")}
            checked={mostrarIndicadores}
            onChange={(value) => setAttributes({ mostrarIndicadores: value })}
          />
          <ToggleControl
            label={__("Mostrar Flechas", "carousel-imagenes")}
            checked={mostrarFlechas}
            onChange={(value) => setAttributes({ mostrarFlechas: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {images.length === 0 ? (
          <MediaPlaceholder
            icon={image}
            labels={{
              title: __("Carrusel de Imágenes", "carousel-imagenes"),
              instructions: __(
                "Selecciona o sube imágenes para crear el carrusel.",
                "carousel-imagenes"
              ),
            }}
            onSelect={onSelectImages}
            accept="image/*"
            allowedTypes={["image"]}
            multiple={true}
            addToGallery={false}
          />
        ) : (
          <div className="carousel-imagenes-preview">
            <div className="carousel-imagenes-container">
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className={`carousel-imagenes-slide ${
                    index === 0 ? "carousel-imagenes-active" : ""
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt || `Slide ${index + 1}`}
                    className="carousel-imagenes-img"
                  />
                </div>
              ))}
            </div>
            {mostrarIndicadores && (
              <div className="carousel-imagenes-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-imagenes-indicator ${
                      index === 0 ? "carousel-imagenes-indicator-active" : ""
                    }`}
                  />
                ))}
              </div>
            )}
            {mostrarFlechas && (
              <>
                <button className="carousel-imagenes-arrow carousel-imagenes-arrow-prev">
                  ‹
                </button>
                <button className="carousel-imagenes-arrow carousel-imagenes-arrow-next">
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
