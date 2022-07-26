import { joinImages } from '../workerThread/joinImages_piscina.js';
// import { joinImages } from '../workerThread/joinImages.js';

export async function imageProcess({ image, background, req, res }) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const imageBase64 = await joinImages(req.log, { image, background }).catch(
    err => {
      req.log.error(err.message);

      return new Error(new TypeError('🧵 Worker: error'));
    }
  );

  res.end(`
  <div style="display: grid; place-items: center;">
    <img style="display: block; margin: 0 auto; width: 40%;" src="data:image/jpeg;base64,${imageBase64}" />
  </div>`);
}
