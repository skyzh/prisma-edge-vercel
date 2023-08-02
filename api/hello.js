export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  return new Response(
    JSON.stringify({
        "message": "hello, world!"
    }),
    {
        status: 200,
        headers: {
            'content-type': 'application/json',
        },
    },
);
}
