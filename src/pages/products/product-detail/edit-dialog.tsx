// import { z } from "zod";
// // import { PaymentType } from "../schema";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Milkstatuses } from "@/components/DataTable/filters";
// import { ProductType } from "@/schema/productSchema";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";
// import agent from "@/api/agent";

// type EditProps = {
//   product: ProductType;
// };

// const editSchema = z.object({
//   productId: z.number(),
//   productName: z.string().min(1, { message: "Product Name Required" }),
//   description: z.string(),
//   price: z.coerce.number().refine((value) => value > 0, {
//     message: "Price must be greater than 0.",
//   }),
//   status: z.string(),
//   image: z.string(),
//   category: z.object({
//     categoryId: z.coerce.number().refine((value) => value > 0, {
//       message: "Category Required.",
//     }),
//   }),

//   brand: z.object({
//     brandId: z.coerce.number().refine((value) => value > 0, {
//       message: "Brand Required.",
//     }),
//   }),
// });

// type editSchemaType = z.infer<typeof editSchema>;

// export default function EditDialog({ product }: EditProps) {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const form = useForm<editSchemaType>({
//     resolver: zodResolver(editSchema),
//     defaultValues: {
//       productId: product.productId,
//       productName: product.productName,
//       description: product.description,
//       price: product.price,
//       status: product.status,
//       image: product.image,
//       category: {
//         categoryId: product.category.categoryId,
//       },
//       brand: {
//         brandId: product.brand.brandId,
//       },
//     },
//   });

//   const onSubmit = async (values: editSchemaType) => {
//     try {
//       await agent.Products.updateMilk(values);
//       toast({
//         title: "Update Product successfully!",
//       });
//     } catch (error: any) {
//       if (error.response) {
//         // setToastMessage(error.response.data.message || "An error occurred");
//         console.error("Error adding product:", error.response.data);
//       } else {
//         const errorMessage =
//           error.response?.data?.message || "An error occurred";
//         toast({
//           title: errorMessage,
//         });
//         console.error("Error adding product:", error);
//       }
//     }
//   };
//   return (
//     <div>
//       <DialogHeader>
//         <DialogTitle>Edit Product Details</DialogTitle>
//       </DialogHeader>
//       <div className="py-4">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
//             <FormField
//               control={form.control}
//               name="productName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product name</FormLabel>
//                   <FormControl>
//                     <Input type="text" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Input type="text" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Status</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value.toString()}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a Status to Update" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectGroup>
//                         {Milkstatuses.map((status, index) => (
//                           <SelectItem key={index} value={status.value}>
//                             <span className="flex items-center">
//                               <status.icon className="mr-2 h-5 w-5 text-muted-foreground" />
//                               {status.label}
//                             </span>
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="category.categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="brand.brandId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Brand</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogClose>
//               <Button
//                 type="submit"
//                 className="mt-2 w-full"
//                 onClick={() => onSubmit}
//               >
//                 Update Details
//               </Button>
//             </DialogClose>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }
