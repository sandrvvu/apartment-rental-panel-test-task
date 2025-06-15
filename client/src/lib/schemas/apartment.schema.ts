import z from "zod";

export const apartmentSchema = z.object({
  title: z.string().max(90, "Max 90 characters"),
  description: z.string().max(335, "Max 335 characters"),
  price: z.coerce.number().positive(),
  rooms: z.coerce.number().min(1).max(3),
});

export type ApartmentFormData = z.infer<typeof apartmentSchema>;
