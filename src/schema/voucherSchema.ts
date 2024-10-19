
import { z } from "zod";

export const voucherSchema = z.object({
  voucherId: z.number().optional(), 
  voucherCode: z.string().trim()
  .refine(
    (value) => {
      const regex = /^KK\d{5}/;
      return regex.test(value);
    },
    {
      message: 'Voucher code must be in format KKXXXXX with K being an uppercase letter and XXXXX being a 5 digit number'
    }
  ),
  voucherName: z.string().min(1, { message: "Voucher Name Required" }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1" }),
  quantityUse: z.coerce.number().min(1, { message: "Quantity Use must be at least 1" }),
  discount: z.coerce.number().refine((value) => value >= 1000, {
    message: 'Quantity Use must be greater than 1.000 VND.'
  }),
  minOrderAmount: z.coerce.number().min(0, { message: "Min Order Amount must be positive" }),
  startDate: z.string().min(1, { message: "Start Date Required" }),
  endDate: z.string().min(1, { message: "End Date Required" }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  });
 