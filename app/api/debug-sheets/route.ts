import { NextResponse } from "next/server"
import { appendLeadToGoogleSheet } from "@/lib/google/sheets"

export async function GET() {
    try {
        // Check environment variables visibility (do not reveal values, just existence)
        const envCheck = {
            hasClientId: !!(process.env.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_CLIENT_ID),
            hasClientSecret: !!(process.env.GOOGLE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET),
            hasRefreshToken: !!(process.env.GOOGLE_OAUTH_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN),
            hasSpreadsheetId: !!(process.env.GOOGLE_SHEETS_SPREADSHEET_ID),
        }

        const result = await appendLeadToGoogleSheet({
            name: "Debug Test",
            email: "debug@example.com",
            phone: "555-0199",
            estimateData: { source: "Debug Endpoint" }
        })

        return NextResponse.json({
            success: result.ok,
            result,
            envCheck
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
