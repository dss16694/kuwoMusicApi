const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../utils/request-header')

router.get(`/getalbuminfo`, (req, res, next) => {
	const {
        albumid,
        pn = 1,
        rn = 30
    } = req.query

	const options = {
        url: `http://www.kuwo.cn/api/www/album/albumInfo?albumId={albumid}&pn={pn}&rn={rn},
        headers: requestHeader,
    }
	request(options, (err, response, body) => {
		if (!err) {
			res.json(JSON.parse(body))
		} else {
			res.sendResult(null, 500, '請求失敗')
		}
	})
})

module.exports = router
