import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId: "e8c4zbh3",
    dataset: 'production',
    token: process.env.NEXT_APP_SANITY_TOKEN,
    apiVersion: '2022-06-08',
    useCdn: true
})

const builder = imageUrlBuilder(client)

const urlFor = source => builder.image(source)

export {client, urlFor}