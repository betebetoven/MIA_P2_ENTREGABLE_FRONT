import React from 'react';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';

function SVGHandler({ src }) {
  return (
    <div style={{ width: '100%', height: '70%' }}>
      <UncontrolledReactSVGPanZoom
        width={800} height={800}
        backgroundColor="#ffffff"
        background={true}
      >
        <svg width={400} height={400}>
          <image
            href={src}
            width={400}
            height={400}
          />
        </svg>
      </UncontrolledReactSVGPanZoom>
    </div>
  );
}

export default SVGHandler;
