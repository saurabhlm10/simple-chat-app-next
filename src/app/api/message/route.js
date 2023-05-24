import Pusher from 'pusher';
const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    useTLS: true,
});
export async function POST(req) {
    try {
        const { user, text } = await req.json();
        console.log(user, text);
        pusher.trigger('chat', 'message', { user, text });
        return new Response('OK')
    } catch (error) {
        return new Response('Method not allowed', { status: 405 })

    }
}