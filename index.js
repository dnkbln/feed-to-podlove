import { extract } from '@extractus/feed-extractor'

import pkg from 'lodash'
const {get} = pkg

import { config } from './config.js'
import { getMediaLocation, getMediaLocationRedirect, getMediaName, getMediaType } from './media.js'
import { createEpisode } from './episode.js'

let result = await extract(config.feed_url, {
        getExtraFeedFields: (feedData) => {
        return {
            data: feedData || ''
        }
    }
})

let podcast = {
    title: get(result, 'data.title'),
    subtitle: get(result, 'data.description'),
    summary: get(result, 'data.itunes:summary'),
    image: get(result, 'data.image.url'),
    language: get(result, 'data.language'),
}

console.log(podcast)

let episodes_back = result.data?.item?.map((e) => {
    const episode = {}
    episode.title = get(e, 'title')
    episode.subtitle = get(e, 'itunes:subtitle')
    episode.summary = get(e, 'itunes:summary')
    episode.pubDate = get(e, 'pubDate')
    episode.media_name = getMediaName(get(e, 'enclosure.@_url'))
    episode.media_location = getMediaLocation(get(e, 'enclosure.@_url'))
    episode.media_extension = getMediaType(get(e, 'enclosure.@_url'))
    episode.media_url = get(e, 'enclosure.@_url')
    episode.media_length = get(e, 'enclosure.@_length')
    episode.media_type = get(e, 'enclosure.@_type')
    return episode
})

let episodes = episodes_back.reverse()

for (let i = 0; i < episodes.length; ++i) {
    episodes[i].number = i + 1
    episodes[i].media_location_redirect = await getMediaLocationRedirect( episodes[i].media_location );
}

episodes.forEach(e => {
    createEpisode(e)
});
