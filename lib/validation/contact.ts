import { z } from "zod"

export function normalizeCanadianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1)
  }
  return digits
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform(normalizeCanadianPhone)
    .refine((digits) => digits.length === 10, "Enter a 10-digit phone number")
    .refine(
      (digits) => /^[2-9]\d{2}[2-9]\d{6}$/.test(digits),
      "Enter a valid Canadian phone number",
    )
    .refine((digits) => !/^(\d)\1+$/.test(digits), "Enter a real phone number"),
})

export function validateContactFields(data: { name: string; email: string; phone: string }) {
  const result = contactSchema.safeParse(data)
  if (result.success) {
    return { success: true as const, data: result.data }
  }

  const fieldErrors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (typeof field === "string" && !fieldErrors[field]) {
      fieldErrors[field] = issue.message
    }
  }

  return { success: false as const, fieldErrors }
}
