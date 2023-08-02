export const config = {
    runtime: 'edge',
};

const neon = require('./neon/neon')

export default async function handler(request) {
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
}
