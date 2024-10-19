/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/image-upload";
import { Layout } from "@/components/custom/layout";

const brandSchema = z.object({
  brandId: z.number().optional(),
  brandName: z.string().min(1, { message: "Brand Name Required" }),
  image: z.string().optional(),
});

type brandSchemaType = z.infer<typeof brandSchema>;

export const BrandForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const initialData = location.state || null;

  const form = useForm<brandSchemaType>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialData || {
      brandId: undefined,
      brandName: "",
      image: "",
    },
  });

  const onSubmit = async (values: brandSchemaType) => {
    try {
      if (initialData) {
        await agent.Brand.updateBrand(values);
        toast({ title: "Update Brand successfully!" });
      } else {
        await agent.Brand.addBrand(values);
        toast({ title: "Create new Brand successfully!" });
      }
      navigate("/admin/brand");
    } catch (error: any) {
      const errorMessage = error.data?.message || "An error occurred";
      toast({ title: errorMessage, variant: "destructive" });
      console.error("Error managing brand:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    form.setValue("image", url);
  };

  const handleImageRemove = () => {
    form.setValue("image", "");
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mt-2">
          <Heading
            title={initialData ? "Edit Brand" : "Create New Brand"}
            description={
              initialData ? "Edit the brand details" : "Add a new brand"
            }
          />
        </div>
        <Separator />
        <div className="py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              {initialData && (
                <FormField
                  control={form.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand ID</FormLabel>
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
              )}
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        onChange={handleImageUpload}
                        onRemove={handleImageRemove}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="ml-auto">
                {initialData ? "Update" : "Create"}
              </Button>
            </form>
          </Form>
        </div>
      </Layout.Body>
    </Layout>
  );
};
