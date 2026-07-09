import { z } from "zod"

const currentYear = new Date().getFullYear()

function stripNumberFormatting(value: string): string {
  return value.replace(/[$,\s]/g, "")
}

export const propertyNumericFieldsSchema = z.object({
  squareFeet: z
    .string()
    .min(1, "Square feet is required")
    .transform(stripNumberFormatting)
    .refine((val) => /^\d+$/.test(val), "Enter a whole number (no decimals or symbols)")
    .transform(Number)
    .refine((n) => n >= 100 && n <= 50000, "Square feet must be between 100 and 50,000"),

  yearBuilt: z
    .string()
    .min(1, "Year built is required")
    .refine((val) => /^\d{4}$/.test(val), "Enter a valid 4-digit year")
    .transform(Number)
    .refine(
      (n) => n >= 1800 && n <= currentYear + 1,
      `Year must be between 1800 and ${currentYear + 1}`,
    ),

  taxes: z
    .string()
    .min(1, "Annual property taxes is required")
    .transform(stripNumberFormatting)
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), "Enter a valid dollar amount (numbers only)")
    .transform(Number)
    .refine((n) => n > 0 && n <= 100000, "Taxes must be between $1 and $100,000"),
})

export const estimateRequestSchema = z.object({
  address: z.object({
    streetNumber: z.string().min(1),
    streetName: z.string().min(1),
    city: z.string().min(1),
    zip: z.string().min(1),
  }),
  details: z.object({
    propertyType: z.string().min(1),
    style: z.string().min(1),
    numBedrooms: z.number().int().min(1).max(10),
    numBathrooms: z.number().int().min(1).max(10),
    sqft: z.union([z.string(), z.number()]).transform(String),
    yearBuilt: z.number().int().min(1800).max(currentYear + 1),
    numParkingSpaces: z.number().int().min(0).max(10),
    basement1: z.string().min(1),
    basementFinished: z.string().optional(),
    basementBedrooms: z.number().int().min(0).max(10).optional(),
  }),
  taxes: z.object({
    annualAmount: z.number().positive().max(100000),
  }),
}).superRefine((data, ctx) => {
  const sqft = Number(data.details.sqft)
  if (!Number.isInteger(sqft) || sqft < 100 || sqft > 50000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Square feet must be between 100 and 50,000",
      path: ["details", "sqft"],
    })
  }
})

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const field = issue.path[issue.path.length - 1]
    if (typeof field === "string" && !fieldErrors[field]) {
      fieldErrors[field] = issue.message
    }
  }
  return fieldErrors
}

export function validatePropertyNumericFields(data: {
  squareFeet: string
  yearBuilt: string
  taxes: string
}) {
  const result = propertyNumericFieldsSchema.safeParse(data)
  if (result.success) {
    return { success: true as const, data: result.data }
  }
  return { success: false as const, fieldErrors: zodFieldErrors(result.error) }
}
