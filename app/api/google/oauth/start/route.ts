import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_CLIENT_ID

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_CLIENT_ID env var" },
      {
        status: 500,
      },
    )
  }

  const url = new URL(request.url)
  const origin = url.origin
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || `${origin}/api/google/oauth/callback`

  const state = crypto.randomUUID()

  const cookieStore = await cookies()
  cookieStore.set("gs_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  })

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
  authUrl.searchParams.set("client_id", clientId)
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("response_type", "code")
  authUrl.searchParams.set("access_type", "offline")
  authUrl.searchParams.set("prompt", "consent select_account")
  authUrl.searchParams.set("include_granted_scopes", "true")
  authUrl.searchParams.set("scope", "https://www.googleapis.com/auth/spreadsheets")
  authUrl.searchParams.set("state", state)

  return NextResponse.redirect(authUrl)
}
