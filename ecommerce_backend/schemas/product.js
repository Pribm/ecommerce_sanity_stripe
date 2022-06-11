export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true
            }
        },
        {
            name: 'bgImage',
            title: 'Background Color',
            type: 'colorPicker'
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLenght: 90
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'details',
            title: 'Details',
            type: 'text',
            rows: 3
        },
        {
            type: 'string',
            name: 'language',
            title: 'Language',
            initialValue: 'english',
            options: {
                list: [
                    'portuguese',
                    'english'
                ],
                layout: 'radio',
            }
        }
    ],
}