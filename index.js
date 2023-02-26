import { extract } from '@extractus/feed-extractor'
import { config } from './config.js'

let result = await extract(config.feed_url, {
        getExtraFeedFields: (feedData) => {
        return {
            data: feedData || ''
        }
    }
})


let podcast = {
    title: result.data.title || '',
    subtitle: result.data.description || '',
    summary: result.data['itunes:summary'] || '',
    image: result.data.image?.url || '',
    language: result.data.language || '',
}

console.log(podcast)

let episodes = result.data?.item?.map( (e) => {
    const episode = {}
    episode.title = e.title
    episode.subtitle = e['itunes:subtitle']
    episode.summary = e['itunes:summary']
    episode.pubDate = e.pubDate
    episode.media_url = e.enclosure['@_url']
    episode.media_length = e.enclosure['@_length']
    episode.media_type = e.enclosure['@_type']
    return episode
})

console.log(episodes)
