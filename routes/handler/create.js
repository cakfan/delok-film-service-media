const { Media } = require('../../models')
const isBase64 = require('is-base64')

module.exports = async (req, res) => {
    const image = req.body.image

    if (!isBase64(image, { mimeRequired: true })) {
        return res.status(406).json({
            status: 'error',
            message: 'Invalid image'
        })
    }

    try {
        const mediaResponse = await base64Img(image, './public/images', Date.now())
        const filename = mediaResponse.path.split('\\').pop().split('/').pop()
        const media = await Media.create({
            image: `images/${filename}`
        })
        res.json({
            status: 'success',
            data: {
                id: media.id,
                image: `${req.get('host')}/${media.image}`
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}
