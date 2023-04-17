const request = require('supertest')
const app = require('../app')
const base64 = require('./base64image-example')

describe('Media module', () => {
    describe('GET /media', () => {
        describe('GET /media', () => {
            it('should return success', async () => {
                await request(app)
                    .get('/media')
                    .expect('Content-Type', /json/)
                    .expect(200)
            })
        })
        describe('POST /media', () => {
            it('should return success', async () => {
                await request(app)
                    .post('/media')
                    .send({
                        image: base64.img
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
            })
            it('should return invalid', async () => {
                await request(app)
                    .post('/media')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(406)
            })
        })
        describe('DELETE /media', () => {
            it('should return success', async () => {
                await request(app)
                    .delete('/media/4')
                    .expect('Content-Type', /json/)
                    .expect(200)
            })
            it('should return not found', async () => {
                await request(app)
                    .delete('/media/4')
                    .expect('Content-Type', /json/)
                    .expect(404)
            })
        })
    })
})
