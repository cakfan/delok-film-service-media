const { Media } = require('../../models')
const fs = require('fs')


module.exports = async (req, res) => {
    const id = req.params.id
    const media = await Media.findByPk(id)
    if (!media) {
        return res.status(404).json({
            status: 'error',
            message: 'Media not found'
        })
    }

    fs.unlink(`./public/${media.image}`, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                message: err.message
            })
        }

        await media.destroy()

        return res.json({
            status: 'success',
            message: 'Media has been deleted'
        })
    })
}
