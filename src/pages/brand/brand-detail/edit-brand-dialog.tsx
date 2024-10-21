/* eslint-disable no-constant-condition */
import { z } from "zod";
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
  // DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";
import { BrandType } from "@/schema/brandSchema";
import ImageUpload from "@/components/image-upload";

type EditProps = {
  brand: BrandType;
};

const editSchema = z.object({
  brandId: z.coerce.number().refine((value) => value > 0, {
    message: "Brand ID Required.",
  }),
  brandName: z.string().min(1, { message: "Brand Name Required" }),
  image: z.string().min(1, { message: "Brand Image Required" }),
});

type EditFormValues = {
  brandId: number;
  brandName: string;
  image: string[];
};

export default function EditBrandDialog({ brand }: EditProps) {
  const { toast } = useToast();
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      brandId: brand.brandId,
      brandName: brand.brandName,
      image: [brand.image || ""], // Ensure it's an array
    },
  });

  async function onSubmit(values: EditFormValues) {
    try {
      await agent.Brand.updateBrand(values);
      toast({
        title: "Update Brand successfully!",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: errorMessage,
      });
      console.error("Error updating Brand:", error);
    }
  }

  const handleImageUpload = (url: string) => {
    // Update the form value with the new image URL
    form.handleSubmit((data) => {
      data.image = [url]; // Ensure it's an array
      return onSubmit(data);
    })();
  };
  const handleImageRemove = (_url?: string) => {
    form.setValue("image", []);
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit Brand Details</DialogTitle>
      </DialogHeader>
      <DialogDescription>Edit Milk's Brand</DialogDescription>
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
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
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand name</FormLabel>
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
                      value={field.value ? [field.value] : []} // Convert to array for ImageUpload component
                      onChange={(url) => handleImageUpload(url)}
                      onRemove={(url) => handleImageRemove(url)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full">
              Update Details
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
