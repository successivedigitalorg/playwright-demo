import { ImageResponse } from 'next/server';
 
// Route segment config
export const runtime = 'edge';
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#3B82F6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        D
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported size
      ...size,
    }
  );
}
