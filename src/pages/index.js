import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const defaultQuery = `{
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
}
`

export default function Home() {
  const [query, setQuery] = useState(defaultQuery)
  const [key, setKey] = useState('')
  const [sql, setSql] = useState('')
  const [intermediateResult, setIntermediateResult] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const submit = () => {
    async function run() {
      const res = await fetch(`/api/neon-query?key=${key}`, { body: query, method: 'POST' })
      if (!res.ok) {
        throw Error(await res.text());
      }
      const j = await res.json()
      setResult(JSON.stringify(j.body, null, 2))
      setIntermediateResult(JSON.stringify(j.result, null, 2))
      setSql(JSON.stringify(j.query, null, 2))
    }
    run().then(() => { setError('') }).catch(e => { setError(e.toString()); console.error(e); })
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Prisma on the Edge</h1>
        <textarea value={query} onChange={e => setQuery(e.target.value)} style={{ width: "100%", height: "20rem", marginTop: "2em", whiteSpace: "pre", fontFamily: "monospace" }} />
        <input placeholder="API Key" value={key} onChange={e => setKey(e.target.value)} style={{ width: "100%", marginTop: "1em", fontFamily: "monospace" }} />
        <button style={{ marginTop: "1em", height: "3em", width: "10em", alignSelf: "center" }} onClick={submit}>Submit</button>
        <h3>Response</h3>
        <p style={{ whiteSpace: "pre-wrap", marginTop: "1em", fontFamily: "monospace" }}>{result}</p>
        <h3>SQL</h3>
        <p style={{ whiteSpace: "pre-wrap", marginTop: "1em", fontFamily: "monospace" }}>{sql}</p>
        <h3>Postgres Response</h3>
        <p style={{ whiteSpace: "pre-wrap", marginTop: "1em", fontFamily: "monospace" }}>{intermediateResult}</p>
        <p style={{ whiteSpace: "pre-wrap", marginTop: "1em", fontFamily: "monospace", color: "red" }} >{error}</p>
      </main>
    </>
  )
}
