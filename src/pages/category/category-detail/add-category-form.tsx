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
import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface ManageCategoryForm {}

const editSchema = z.object({
  // categoryId: z.coerce.number().refine((value) => value > 0, {
  //   message: "Category Required.",
  // }),
  categoryName: z.string().min(1, { message: "Category Name Required" }),
});

type editSchemaType = z.infer<typeof editSchema>;

export const AddCategory: React.FC<ManageCategoryForm> = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      // categoryId: 0,
      categoryName: "",
    },
  });

  async function onSubmit(values: editSchemaType) {
    try {
      await agent.Category.addCategory(values);
      toast({
        title: "Create new Category successfully!",
      });
      navigate("/admin/category");
    } catch (error: any) {
      if (error.response) {
        // setToastMessage(error.response.data.message || "An error occurred");
        console.error("Error creating category:", error.response.data);
      } else {
        const errorMessage = error.data?.message || "An error occurred";
        toast({
          title: errorMessage,
          variant: "destructive",
        });
        console.error("Error creating category:", error);
      }
    }
  }
  return (
    <div>
      <div className="mt-2">
        <Heading
          title={"Create new category"}
          description={"Add a new category"}
        />
      </div>
      <Separator />
      <div className="py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-3 gap-8">
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
            </div>
            <Button type="submit" className="ml-auto">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
