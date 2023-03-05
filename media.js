function getMediaName( media_url ) {
    const n = media_url.lastIndexOf('/')
    const file = media_url.substring(n+1)
    return file.substring(0, file.lastIndexOf('.'))
}

function getMediaLocation( media_url ) {
    return media_url.substring(0, media_url.lastIndexOf('/'))
}

function getMediaType( media_url ) {
    const n = media_url.lastIndexOf('/')
    const file = media_url.substring(n+1)
    const m = file.indexOf('.')
    const extension_full = file.substring(m+1)
    const o = extension_full.indexOf('?')
    if (o > 0)
        return extension_full.substring(0, o);
    return extension_full
}

async function getMediaLocationRedirect(media_url) {
    const res = await(fetch(media_url, {
        redirect: 'manual'
    }))
    const uri = res.headers.get('location')
    return uri
}

export { getMediaName, getMediaLocation, getMediaType, getMediaLocationRedirect }
