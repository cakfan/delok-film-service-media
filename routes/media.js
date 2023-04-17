require('dotenv').config()
const express = require('express')
const router = express.Router()
const isBase64 = require('is-base64')
const base64Img = require('node-base64-img')
const { Media } = require('../models')
const fs = require('fs')

/* GET image listing. */
router.get('/', async (req, res, next) => {
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
})

/* POST create a new media */
router.post('/', async (req, res) => {
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

})

/* DELETE remove media */
router.delete('/:id', async (req, res) => {
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

})

module.exports = router
