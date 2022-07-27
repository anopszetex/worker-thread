import { joinImages } from '../workerThread/joinImages_piscina.js';

export async function imageProcess({ image, background, req, res }) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const imageBase64 = await joinImages(req.log, { image, background });

  res.end(`
  <div style="display: grid; place-items: center;">
    <img style="display: block; margin: 0 auto; width: 40%;" src="data:image/jpeg;base64,${imageBase64}" />
  </div>`);
}
