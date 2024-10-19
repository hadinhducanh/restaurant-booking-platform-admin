/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
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
import React, { useEffect, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageUpload from "@/components/image-upload";
import { useAuth } from "@/context/AuthContext";
import ProductPopover from "./product-popover";
import { User } from "@/models/User";

interface ManageBlogForm {}

// interface User {
//   userId: number;
//   fullName: string;
// }
interface Product {
  productId: number;
  productName: string;
}
const editSchema = z.object({
  blogId: z.coerce.number(),
  image: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  content: z.string().nullable(),
  // userId: z.number(),
  productId: z
    .array(z.number())
    .nonempty({ message: "At least one product is required" }),
});

type editSchemaType = z.infer<typeof editSchema>;

export const AddBlog: React.FC<ManageBlogForm> = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || null;
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>();
  const [htmlPreview, setHtmlPreview] = useState<string>("");
  const { isLoggedIn, getUserInfo } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, getUserInfo]);

  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: initialData || {
      blogId: 0,
      title: "",
      image: "",
      content: "",

      // userId: 0,

      productId: [],
    },
  });
  useEffect(() => {
    if (initialData) {
      // Initialize selectedProducts and productIds from initialData
      const initialProducts = initialData.product || [];
      setSelectedProducts(initialProducts);
      const initialProductIds = initialProducts.map(
        (product: any) => product.productId
      );
      form.setValue("productId", initialProductIds);

      // If editing existing blog, set initial values for preview
      setHtmlPreview(initialData.content);
    }
  }, [initialData, form]);

  async function onSubmit(values: editSchemaType) {
    try {
      const productId = selectedProducts.map((product) => product.productId);
      const userId = initialData ? initialData.user.userId : user?.userId;
      if (initialData) {
        await agent.Blog.updateBlog({ ...values, productId, userId }); // Assuming updateBlog method exists
        toast({
          title: "Blog updated successfully!",
        });
      } else {
        const userId = user?.userId;
        await agent.Blog.addBlog({ ...values, userId });
        toast({
          title: "Create new Blog successfully!",
        });
      }
      navigate("/admin/blog");
    } catch (error: any) {
      const errorMessage = error.data?.message || "An error occurred";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      console.error("Error creating/updating blog:", error);
    }
  }

  const handleProductSelect = (product: Product | null) => {
    if (product) {
      const exists = selectedProducts.some(
        (p) => p.productId === product.productId
      );
      if (!exists) {
        setSelectedProducts([...selectedProducts, product]);
        form.setValue("productId", [
          ...form.getValues("productId"),
          product.productId,
        ]);
      }
    } else {
      setSelectedProducts([]);
      form.setValue("productId", [0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-2">
        <Heading
          title={initialData ? "Edit blog" : "Create new blog"}
          description={"Manage blog content"}
        />
      </div>
      <Separator />
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-full row-span-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <CKEditor
                          editor={ClassicEditor}
                          data={field.value} // Bind CKEditor data to field.value
                          onChange={(_, editor) => {
                            const data = editor.getData();
                            field.onChange(data); // Update form field with CKEditor data
                            setHtmlPreview(data); // Update HTML preview state
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <div>
                  <div>
                    <FormField
                      control={form.control}
                      name="blogId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blog ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Blog ID" {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Title"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
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
                          <FormLabel>Thumbnail Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value ? [field.value] : []}
                              onChange={(url) => field.onChange(url)}
                              onRemove={() => field.onChange("")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="productId"
                      render={() => (
                        <FormItem>
                          <FormLabel className="block my-2">Product</FormLabel>
                          <FormControl>
                            <ProductPopover
                              onSelect={handleProductSelect}
                              selectedProducts={selectedProducts}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <h2 className="text-lg font-semibold mb-2">HTML Preview</h2>
                    <div
                      className="border rounded p-4"
                      dangerouslySetInnerHTML={{ __html: htmlPreview }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" className="ml-auto col-span-2">
              {initialData ? "Update" : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
