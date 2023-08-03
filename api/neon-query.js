export const config = {
    runtime: 'edge',
};

import neon, { lastQuery, lastResult } from './neon/neon'

export default async function handler(request) {
    try {
        const urlParams = new URL(request.url).searchParams;
        const query = Object.fromEntries(urlParams);
        if (!process.env.NEON_KEY || query.key != process.env.NEON_KEY) {
            return new Response(
                JSON.stringify({
                    error: "mismatched key",
                }),
                {
                    status: 400,
                    headers: {
                        'content-type': 'application/json',
                    },
                },
            );
        }
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return new Response(
                JSON.stringify({
                    error: e.toString(),
                }),
                {
                    status: 400,
                    headers: {
                        'content-type': 'application/json',
                    },
                },
            );
        }
        const result = await neon(JSON.stringify(body));
        return new Response(
            JSON.stringify({
                body: result,
                query: lastQuery,
                result: lastResult,
            }),
            {
                status: 200,
                headers: {
                    'content-type': 'application/json',
                },
            },
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: e.toString(),
            }),
            {
                status: 500,
                headers: {
                    'content-type': 'application/json',
                },
            },
        );
    }
}
