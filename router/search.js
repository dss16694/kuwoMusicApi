const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../utils/request-header')

// 搜索提示

router.get(`/searchKey`, (req, res, next) => {
    const {
        key
    } = req.query
    const options = {
        url: 'http://www.kuwo.cn/api/www/search/searchKey?key=' + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/playlist?key=' + encodeURIComponent(key),
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 单曲
router.get(`/searchMusicBykeyWord`, (req, res, next) => {
    const {
        key,
        pn = 1,
        rn = 30
    } = req.query
    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/list?key=' + encodeURIComponent(key)
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 返回增加播放地址
router.get(`/searchMusic`, (req, res, next) => {
    const {
        key,
        pn = 1,
        rn = 30
    } = req.query
    const options = {
        url: `http://127.0.0.1:7171/search/searchMusicBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: requestHeader
    }
    request(options, (err, response, body) => {
        if (!err) {
		    var json = JSON.parse(body)
			var musiclist = json.data.list
			var musiclist1 = []
			var json1 = {}
			for(var i=0;i<musiclist.length;i++){
				json1 = musiclist[i]
				console.log(json1.rid)
				console.log(json1.artist)
				var rid = musiclist[i].rid
				const options = {
					url: `http://127.0.0.1:7171/url?rid=` + rid,
					headers: requestHeader
				}
				request(options, (err, response, body) => {
					if (!err) {
						var music_json = JSON.parse(body)
						//console.log(music_json.url)
						//json1.url = music_json.url
						musiclist1.push(music_json)
						
						if(musiclist1.length == musiclist.length){
							//json.data.list = musiclist1
							//console.log(JSON.stringify(musiclist1))
							for(var k=0;k<musiclist.length;k++){
								for(var j=0;j<musiclist1.length;j++){
									console.log(musiclist[k].rid + "---" + musiclist1[j].rid)
									if(musiclist[k].rid == parseInt(musiclist1[j].rid)){
										musiclist[k].url = musiclist1[j].url
									}
								}
							}
							json.data.list = musiclist
							res.json(json)
							
						}
					} else {
					}
				})
			}
            
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 专辑
router.get(`/searchAlbumBykeyWord`, (req, res, next) => {

    const {
        key,
        pn = 1,
        rn = 30
    } = req.query

    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchAlbumBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/album?key=' + encodeURIComponent(key)
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// mv
router.get(`/searchMvBykeyWord`, (req, res, next) => {

    const {
        key,
        pn = 1,
        rn = 30
    } = req.query

    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchMvBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/mv?key=' + encodeURIComponent(key)
        }, {})
    }

    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 歌单
router.get(`/searchPlayListBykeyWord`, (req, res, next) => {
    const {
        key,
        pn = 1,
        rn = 30
    } = req.query

    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchPlayListBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/playlist?key=' + encodeURIComponent(key)
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 歌手
router.get(`/searchArtistBykeyWord`, (req, res, next) => {
    const {
        key,
        pn = 1,
        rn = 30
    } = req.query
    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchArtistBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/singers?key=' + encodeURI(key)
        }, {})
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
