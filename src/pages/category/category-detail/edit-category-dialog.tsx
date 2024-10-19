import { z } from "zod";
// import { PaymentType } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryType } from "@/schema/categorySchema";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";

type EditProps = {
  category: CategoryType;
};

const editSchema = z.object({
  categoryId: z.coerce.number().refine((value) => value > 0, {
    message: "Category Required.",
  }),
  categoryName: z.string().min(1, { message: "Category Name Required" }),
});

type editSchemaType = z.infer<typeof editSchema>;

export default function EditCategoryDialog({ category }: EditProps) {
  const { toast } = useToast();
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      categoryId: category.categoryId,
      categoryName: category.categoryName,
    },
  });

  async function onSubmit(values: editSchemaType) {
    try {
      await agent.Category.updateCategory(values);
      toast({
        title: "Update Category successfully!",
      });
    } catch (error: any) {
      if (error.response) {
        // setToastMessage(error.response.data.message || "An error occurred");
        console.error("Error updating category:", error.response.data);
      } else {
        const errorMessage = error.data?.message || "An error occurred";
        toast({
          title: errorMessage,
          variant: "destructive",
        });
        console.error("Error updating category:", error);
      }
    }
  }
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit Product Details</DialogTitle>
      </DialogHeader>
      <DialogDescription>Edit your Milk</DialogDescription>
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="read-only:bg-gray-100"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose>
              <Button type="submit" className="mt-2 w-full">
                Update Details
              </Button>
            </DialogClose>
          </form>
        </Form>
      </div>
    </div>
  );
}
