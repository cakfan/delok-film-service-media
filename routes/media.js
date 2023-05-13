require('dotenv').config()
const express = require('express')
const router = express.Router()
const { getListMedia, createMedia, removeMedia } = require('./handler')

/* GET image listing. */
router.get('/', getListMedia)

/* POST create a new media */
router.post('/', createMedia)

/* DELETE remove media */
router.delete('/:id', removeMedia)

module.exports = router
