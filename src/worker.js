import { parentPort } from 'node:worker_threads';
import sharp from 'sharp';
import axios from 'axios';

const downloadFile = async url => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    signal: AbortSignal.timeout(1000),
  });

  return response.data;
};

const onMessage = async ({ image, background }) => {
  const firstLayer = await sharp(await downloadFile(image))
    .grayscale()
    .toBuffer();

  const secondLayer = await sharp(await downloadFile(background))
    .composite([
      { input: firstLayer, gravity: sharp.gravity.south },
      { input: firstLayer, gravity: sharp.gravity.east },
      { input: firstLayer, gravity: sharp.gravity.west },
      { input: firstLayer, gravity: sharp.gravity.north, left: 2000, top: 0 },
    ])
    .toBuffer();

  parentPort.postMessage(secondLayer.toString('base64'));
};

parentPort.on('message', onMessage);
