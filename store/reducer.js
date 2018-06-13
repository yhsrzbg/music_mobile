import { combineReducers } from 'redux'



var ipdefalut = 'http://192.168.43.195:3000'
function getwebip(state = ipdefalut, action) {
    return state
}




var findbtndefalut = '音乐'
function findbar(state = findbtndefalut, action) {
    switch (action.type) {
        case 'CHANGE_BARBOTTON':
            switch (action.value) {
                case '音乐': return '音乐'
                case '视频': return '视频'
                case '电台': return '电台'
            }
        default: return state
    }
}

var songnamedefalut = '无音乐'
function songname(state = songnamedefalut, action) {
    switch (action.type) {
        case 'CHANGE_SONG_NAME': return action.value
        default: return state
    }
}

var songlistdefalut = [{
    "song_name": "无音乐",
    "singer": "无歌手",
    "song_src": "/song/asas.mp3",
    "img_src": "/song_img/defalut.jpg",
    "comment": [
        "评论"
    ]
}]
function songlist(state = songlistdefalut, action) {
    switch (action.type) {
        case 'CHANGE_SONG_LIST':
            let newarr = [];
            newarr = [...action.value]
            return newarr
        default: return state
    }
}

var songindexdefalut = 0
function songindex(state = songindexdefalut, action) {
    switch (action.type) {
        case 'CHANGE_SONG_INDEX': return action.value
        default: return state
    }
}

var bottonbar = 'show'
function bottonbarstate(state = bottonbar, action) {
    switch (action.type) {
        case 'BOTTON_SHOW': return 'show';
        case 'BOTTON_HIDE': return 'hide'
        default: return state
    }
}




var fuc = combineReducers({
    findbar,
    songname,
    songlist,
    songindex,
    bottonbarstate,
    getwebip
})

export default fuc