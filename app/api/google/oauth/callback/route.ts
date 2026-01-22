import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET env vars" }, { status: 500 })
  }

  const url = new URL(request.url)
  const origin = url.origin
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || `${origin}/api/google/oauth/callback`

  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")

  const cookieStore = await cookies()
  const expectedState = cookieStore.get("gs_oauth_state")?.value
  cookieStore.delete("gs_oauth_state")

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 })
  }

  if (!state || !expectedState || state !== expectedState) {
    return NextResponse.json({ error: "Invalid state" }, { status: 400 })
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  })

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  })

  const tokenJson = (await tokenRes.json().catch(() => null)) as any

  if (!tokenRes.ok) {
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Google Sheets Connection Failed</title>
  </head>
  <body style="font-family: ui-sans-serif, system-ui; padding: 24px;">
    <h1 style="margin: 0 0 12px;">Google Sheets Connection Failed</h1>
    <p style="margin: 0 0 12px;">The token exchange failed.</p>
    <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(
      JSON.stringify(tokenJson, null, 2),
    )}</pre>
  </body>
</html>`
    return new NextResponse(html, {
      status: 500,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    })
  }

  const refreshToken = tokenJson?.refresh_token || ""
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Google Sheets Connected</title>
  </head>
  <body style="font-family: ui-sans-serif, system-ui; padding: 24px;">
    <h1 style="margin: 0 0 12px;">Google Sheets Connected</h1>
    ${
      refreshToken
        ? `<p style="margin: 0 0 12px;">Copy this value into your Vercel Environment Variable <b>GOOGLE_REFRESH_TOKEN</b> (or <b>GOOGLE_OAUTH_REFRESH_TOKEN</b>).</p>
           <pre style="white-space: pre-wrap; word-break: break-all; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(
             refreshToken,
           )}</pre>`
        : `<p style="margin: 0 0 12px;">No refresh token was returned. This usually happens if Google thinks you already granted access.</p>
           <p style="margin: 0 0 12px;">Fix: go to your Google Account → Security → Third-party access, remove this app, then run the connect flow again.</p>`
    }
  </body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
