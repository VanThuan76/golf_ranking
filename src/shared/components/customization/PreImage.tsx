import { useState } from 'react';
import { ImageProps } from 'next/image';
import { useTheme } from 'next-themes';
import React from 'react';

interface Props extends ImageProps {
  layer?: boolean;
}

export function PreImage({ src, layer, ...rest }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { theme } = useTheme();
  const backgroundLayer = theme !== 'light' ? 'bg-white' : 'bg-black';

  return (
    <React.Fragment>
      <div className='relative w-full h-full overflow-hidden'>
        <img
          src={src as string}
          style={{ width: `${rest.width}px`, height: `${rest.height}px` }}
          {...rest}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        {layer && (
          <div
            style={rest.style}
            className={`${rest.className} ${backgroundLayer} absolute top-0 left-0 w-full h-full opacity-20 blur-lg`}
          ></div>
        )}
        {!imageLoaded && (
          <div
            style={rest.style}
            className={`${
              rest.className
            } ${backgroundLayer} absolute top-0 left-0 w-full h-full flex items-center justify-center animate-pulse rounded-md bg-primary/10 transition-opacity ${
              !imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src='/default.png' alt='Default' className='w-full h-full' />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
