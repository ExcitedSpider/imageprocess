const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const { resize, convert, watermark, sharpen, grayscale } = require('./image');

const URL_PREFIX = '/photoprocess';

module.exports.handler = async function (req, resp, context) {

    const {
        url = 'https://dev-fc-application-template-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/Image-Resizer/example.png',
        width = 200,
        height,
        target = 'png',
        wartermark = 'desgin by QE',
        wartermarksize = 1,
        sharpenDegree = 3,
    } = req.queries;

    let output, respMime, respFile;
    console.log(req.path)

    try {
        switch (req.path) {
            case `${URL_PREFIX}/api/resize`:
                output = await resize(url, width, height);
                respMime = output.mimeType;
                respFile = output.filename;
                break;

            case `${URL_PREFIX}/api/convert`:
                output = await convert(url, target);
                respMime = output.mimeType;
                respFile = output.filename;
                break;
            case `${URL_PREFIX}/api/wartermark`:
                output = await watermark(url, wartermark, wartermarksize);
                respMime = output.mimeType;
                respFile = output.filename;
                break;

            case `${URL_PREFIX}/api/sharpen`:
                output = await sharpen(url, sharpenDegree);
                respMime = output.mimeType;
                respFile = output.filename;
                break;

            case `${URL_PREFIX}/api/grayscale`:
                output = await grayscale(url);
                respMime = output.mimeType;
                respFile = output.filename;
                break;

            default:
                respFile = './index.html';
                respMime = 'text/html'
                break;
        }

        resp.setHeader('content-type', respMime);
        resp.send(await readFile(respFile));
        // await unlink(respFile);
    } catch (error) {
        resp.setStatusCode(500)
        resp.send(JSON.stringify(error))
    }

}