import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(5, "Description is required"),
  basePrice: z.number().min(0),
  equipmentCharges: z.number().min(0),
  taxPercentage: z.number().min(0).max(100),
  modes: z.array(z.enum(["Home Service", "Visit Provider Location"])),
  supportsDuration: z.boolean(),
  defaultDuration: z.number().optional(),
  durationOptions: z.array(z.number()).optional(),
  paymentMode: z.enum(["Both", "Prepaid", "COD"]),
  icon: z.string().optional(),
  image: z.string().optional(),
});
