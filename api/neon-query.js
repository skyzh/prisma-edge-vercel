export const config = {
    runtime: 'edge',
};

import neon from './neon/neon'

export default async function handler(request) {
    try {
        const result = await neon(JSON.stringify({
            "action": "findMany",
            "modelName": "type_test",
            "query": {
                "selection": {
                    "smallint_column": true,
                    "int_column": true,
                    "bigint_column": true,
                    "float_column": true,
                    "double_column": true,
                    "decimal_column": true,
                    "boolean_column": true,
                    "char_column": true,
                    "varchar_column": true,
                    "text_column": true,
                    "date_column": true,
                    "time_column": true,
                    "timestamp_column": true,
                    "json_column": true,
                    "enum_column": true
                }
            }
        }))
        return new Response(
            JSON.stringify({
                body: result,
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
                status: 200,
                headers: {
                    'content-type': 'application/json',
                },
            },
        );
    }
}
