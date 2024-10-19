/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
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
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/image-upload";
import { Layout } from "@/components/custom/layout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/components/lib/utils";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Milkstatuses } from "@/components/DataTable/filters";
import { ProductsObj } from "@/models/Product";

export interface ManageProductForm {}

interface Category {
  categoryId: number;
  categoryName: string;
}
interface Brand {
  brandId: number;
  brandName: string;
  image: string;
  products: ProductsObj;
}

const productSchema = z.object({
  productId: z.number().optional(),
  productName: z.string().min(1, { message: "Product Name Required" }),
  description: z.string().min(1, { message: "Description Required" }),
  price: z.coerce.number().refine((value) => value > 0, {
    message: "Price must be greater than 0.",
  }),
  status: z.string(),
  image: z.array(z.string()),
  category: z.object({
    categoryId: z.coerce.number().refine((value) => value > 0, {
      message: "Category Required.",
    }),
  }),
  brand: z.object({
    brandId: z.coerce.number().refine((value) => value > 0, {
      message: "Brand Required.",
    }),
  }),
});

type productSchemaType = z.infer<typeof productSchema>;

export const ProductForm: React.FC<ManageProductForm> = () => {
  const [open] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const initialData = location.state || null;
  const [category, setCategory] = useState<Category[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openBrand, setOpenBrand] = useState<boolean>(false);
  const [pageNo] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await agent.Category.list(pageNo, pageSize);
        setCategory(result.content || []); // Assuming the data is in the `content` field of the response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const getBrand = async () => {
      try {
        const result = await agent.Brand.list(pageNo, pageSize);
        setBrand(result.content || []); // Assuming the data is in the `content` field of the response
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    getBrand();
    getCategory();
  }, [pageNo, pageSize]);

  const form = useForm<productSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      productId: undefined,
      productName: "",
      description: "",
      price: 0,
      status: "",
      image: [],
      category: {
        categoryId: 0,
      },
      brand: {
        brandId: 0,
      },
    },
  });

  const onSubmit = async (values: productSchemaType) => {
    const concatenatedImages = values.image.join(",");
    const submissionValues = {
      ...values,
      image: concatenatedImages,
    };
    try {
      if (initialData) {
        await agent.Products.updateMilk(submissionValues);
        toast({ title: "Update Product successfully!" });
      } else {
        await agent.Products.addMilk(submissionValues);
        toast({ title: "Create new Product successfully!" });
      }
      navigate("/admin/milk");
    } catch (error: any) {
      const errorMessage = error.data?.message || "An error occurred";
      toast({ title: errorMessage, variant: "destructive" });
      console.error("Error managing product:", error);
    }
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mt-2">
          <Heading
            title={initialData ? "Edit Product" : "Create New Product"}
            description={
              initialData ? "Edit the product details" : "Add a new product"
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={(url) =>
                          field.onChange([...field.value, url])
                        }
                        onRemove={(url) =>
                          field.onChange(
                            field.value.filter((img: string) => img !== url)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:grid md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Status to Update" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {Milkstatuses.map((status, index) => (
                              <SelectItem key={index} value={status.value}>
                                <span className="flex items-center">
                                  <status.icon className="mr-2 h-5 w-5 text-muted-foreground" />
                                  {status.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category.categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trainer</FormLabel>
                      <FormControl>
                        <Popover
                          open={openCategory}
                          onOpenChange={setOpenCategory}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full flex items-center justify-between"
                            >
                              <div>
                                {field.value
                                  ? category.find(
                                      (cat) => cat.categoryId === field.value
                                    )?.categoryName
                                  : "Select Category..."}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search Category..." />
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {category.map((cat) => (
                                    <CommandItem
                                      key={cat.categoryId}
                                      onSelect={() => {
                                        field.onChange(
                                          cat.categoryId === field.value
                                            ? ""
                                            : cat.categoryId
                                        );

                                        setOpenCategory(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          cat.categoryId === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {cat.categoryName}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand.brandId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Popover open={openBrand} onOpenChange={setOpenBrand}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openBrand}
                              className="w-full flex items-center justify-between"
                            >
                              <div>
                                {field.value
                                  ? brand.find(
                                      (brand) => brand.brandId === field.value
                                    )?.brandName
                                  : "Select brand..."}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search brand..."
                                className="h-9"
                              />
                              <CommandEmpty>No brand found.</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {brand.map((brand) => (
                                    <CommandItem
                                      key={brand.brandId}
                                      value={brand.brandId.toString()}
                                      onSelect={() => {
                                        field.onChange(
                                          brand.brandId === field.value
                                            ? ""
                                            : brand.brandId
                                        );
                                        setOpenBrand(false);
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === brand.brandId
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {brand.brandName}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
