import { nanoid } from 'nanoid';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request: Request) {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            new URL(request.url).searchParams.get('session_id'),
        );

        return Response.json({
            status: session.status,
            customer_email: session.customer_details.email,
        });
    } catch (err: any) {
        console.error(err);
        return new Response(err.message, { status: err.statusCode || 500 });
    }
}

export async function POST(request: any) {
    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price: 'price_1Og4WwECK4oPE1apYXHchA5z',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `http://localhost:3000/return?session_id=${nanoid()}`,
        });

        return Response.json({ clientSecret: session.client_secret });
    } catch (err: any) {
        console.error(err);
        return new Response(err.message, { status: err.statusCode || 500 });
    }
}

// export default async function handler(req: any, res: any) {
//     switch (req.method) {
//         case "POST":
//             try {
//                 // Create Checkout Sessions from body params.
//                 const session = await stripe.checkout.sessions.create({
//                     ui_mode: 'embedded',
//                     line_items: [
//                         {
//                             // Provide the exact Price ID (for example, pr_1234) of
//                             // the product you want to sell
//                             price: '{{PRICE_ID}}',
//                             quantity: 1,
//                         },
//                     ],
//                     mode: 'payment',
//                     return_url:
//                         `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
//                 });

//                 res.send({ clientSecret: session.client_secret });
//             } catch (err: any) {
//                 res.status(err.statusCode || 500).json(err.message);
//             }
//             break;
//         case "GET":
//             try {
//                 const session =
//                     await stripe.checkout.sessions.retrieve(req.query.session_id);

//                 res.send({
//                     status: session.status,
//                     customer_email: session.customer_details.email
//                 });
//             } catch (err: any) {
//                 res.status(err.statusCode || 500).json(err.message);
//             }
//             break;
//         default:
//             res.setHeader('Allow', req.method);
//             res.status(405).end('Method Not Allowed');
//     }
// }
