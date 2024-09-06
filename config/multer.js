const multer = require('multer')
const sharp = require('sharp')
const { writeFileSync } = require('fs');
const { default: consola } = require('consola');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('image');
const resizeImage = async (req, res, next) => {
    const { file, body } = req;

    if (!file) {
        return next();
    }

    try {
        const data = sharp(file.buffer)
        data.resize({
            width: 500,
            height: 500,
            fit: sharp.fit.contain,
            background: {
                r: 0,
                g: 0,
                b: 0,
                alpha: 0
            },
        })
        data.webp({ quality: 50 });
        file.buffer = await data.toBuffer();

        writeFileSync(
            path.join(
                __dirname,
                '../uploads',
                `post-${body.username}-${Date.now()}.webp`
            ),
            file.buffer,
        )

        next();
    } catch (err) {
        consola.error(err)
        next();
    }
}

module.exports = { upload, resizeImage }