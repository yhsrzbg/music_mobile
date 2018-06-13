
//find导航效果
export function changetopbarbotton(value) {
    return {
        type: 'CHANGE_BARBOTTON',
        value
    }
}

export function changsongname(value) {
    return {
        type: 'CHANGE_SONG_NAME',
        value
    }
}

export function changsonglist(value) {
    return {
        type: 'CHANGE_SONG_LIST',
        value
    }
}

export function changsongindex(value) {
    return {
        type: 'CHANGE_SONG_INDEX',
        value
    }
}

export var showbar = {
    type: "BOTTON_SHOW"
}

export var hidebar = {
    type: "BOTTON_HIDE"
}

