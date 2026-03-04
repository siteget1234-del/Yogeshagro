// PWA manifest route
export async function GET() {
  const manifest = {
    name: 'योगेश कृषी सेवा केंद्र',
    short_name: 'योगेश अग्रो कृषी',
    description: 'कृषी उत्पादने, बियाणे, खते, संरक्षण साधने - किनगाव ता. अहमदपूर जि. लातूर, महाराष्ट्र',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#177B3B',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return Response.json(manifest);
}
