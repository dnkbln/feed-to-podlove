import { create, get_episode_data, post_title, set } from './api.js'

import pkg from 'lodash'
const {get} = pkg

function setPostTitle(post_id, title) {
    let data = {}
    data.post_title = title
    post_title(post_id, data)
    .catch(err => console.log(err))
}

function getPostNSetTitle(id, title) {
    get_episode_data(id)
    .then(response => response.json())
    .then(json => {
        const post_id = get(json, 'post_id')
        setPostTitle(post_id, title)
    })
    .catch(err => console.log(err))
}

function setEpisodeData(id, episode) {
    console.log(episode)
    let data = {}
    data.title = episode.title
    if (episode.subtitle !== undefined)
        data.subtitle = episode.subtitle
    if (episode.summary !== undefined)
        data.summary = episode.summary
    if (episode.media_name !== undefined)
        data.slug = episode.media_name
    data.number = episode.number
    set(id, data)
    .catch(err => console.log(err))
}

function createEpisode(episode) {
    create()
    .then(response => response.json())
    .then(json => {
        const id = get(json, 'id')
        setEpisodeData(id, episode)
        getPostNSetTitle(id, episode.title)
    })
    .catch(err => console.log(err))
}

export { createEpisode }
