import z from "zod";

export const dateRangeSchema = z
  .object({
    startDate: z.date({
      required_error: "Start date is required",
      invalid_type_error: "Invalid start date",
    }),
    endDate: z.date({
      required_error: "End date is required",
      invalid_type_error: "Invalid end date",
    }),
    format: z.string().min(1, { error: "Format is required" }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"], // attach error to endDate field
  });
