const { Media } = require('../../models')

module.exports = async (req, res) => {
    const media = await Media.findAll({
        attributes: ['id', 'image']
    })

    const mappedMedia = media.map((m) => {
        m.image = `${req.get('host')}/${m.image}`
        return m
    })

    if (media.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'No images found'
        })
    }

    return res.json({
        status: 'success',
        data: mappedMedia
    })
}
