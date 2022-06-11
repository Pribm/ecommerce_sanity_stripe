import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            let items = req.body.map((item) => (
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: parseInt(item.price * 100),
                    },
                    adjustable_quantity:  {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                }
            ))
               // console.log(items)
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    {
                        shipping_rate: 'shr_1L9Y5yF6aoRlAm9lJI5V9mk2' //The id of shipping rate created at stripe api
                    },
                    {
                        shipping_rate: 'shr_1L9Y9NF6aoRlAm9lUv86cVIz' //fast shipping
                    }
                ],
                line_items: items,
                mode: 'payment',
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session)
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}