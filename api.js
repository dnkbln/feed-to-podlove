import { config } from './config.js'

const defaultHeaders = (auth) => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${auth}`
})

function create() {

    const auth = btoa(`${config.wp.user}:${config.wp.token}`)
    const url = config.wp.url + '/wp-json/podlove/v2/episodes'
    return fetch(url, {
        method: "POST",
        headers: defaultHeaders(auth),
    })
}

function set(id, data) {
    const auth = btoa(`${config.wp.user}:${config.wp.token}`)
    const url = config.wp.url + `/wp-json/podlove/v2/episodes/${id}`
    return fetch(url, {
        method: "POST",
        headers: defaultHeaders(auth),
        body: JSON.stringify(data)
    })
}

function get_episode_data(id) {
    const auth = btoa(`${config.wp.user}:${config.wp.token}`)
    const url = config.wp.url + `/wp-json/podlove/v2/episodes/${id}`
    return fetch(url, {
        method: "GET",
        headers: defaultHeaders(auth)
    })
}

function post_title(post_id, data) {
    const auth = btoa(`${config.wp.user}:${config.wp.token}`)
    const url = config.wp.url + `/wp/v2/posts/${post_id}`
    return fetch(url, {
        method: "POST",
        headers: defaultHeaders(auth),
        body: JSON.stringify(data)
    })
}

export { create, set, get_episode_data, post_title }
