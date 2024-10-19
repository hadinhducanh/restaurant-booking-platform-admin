/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { Layout } from "@/components/custom/layout";

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

export interface ManageProductForm {}

interface Product {
  productId: number;
  productName: string;
}
interface Supplier {
  supplierId: number;
  supplierName: string;
}

const productSchema = z.object({
  quantity: z.coerce
    .number()
    .nonnegative()
    .refine((value) => value >= 0, {
      message: "Quantity can not be negative.",
    }),
  productId: z.coerce.number().refine((value) => value > 0, {
    message: "product Required.",
  }),
  supplierId: z.coerce.number().refine((value) => value > 0, {
    message: "Supplier Required.",
  }),
});

type productSchemaType = z.infer<typeof productSchema>;

export const StockForm: React.FC<ManageProductForm> = () => {
  const [open] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product[]>([]);
  const [supplier, setSupplier] = useState<Supplier[]>([]);
  const [openProduct, setOpenProduct] = useState<boolean>(false);
  const [openSupplier, setOpenSupplier] = useState<boolean>(false);
  const [pageNo] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await agent.Products.list(pageNo, pageSize);
        setProduct(result.content || []); // Assuming the data is in the `content` field of the response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const getBrand = async () => {
      try {
        const result = await agent.Supplier.list(pageNo, pageSize);
        setSupplier(result.content || []); // Assuming the data is in the `content` field of the response
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    getBrand();
    getCategory();
  }, [pageNo, pageSize]);

  const form = useForm<productSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productId: 0,
      supplierId: 0,
      quantity: 0,
    },
  });

  const onSubmit = async (values: productSchemaType) => {
    try {
      await agent.StockTransaction.importProduct(values);
      toast({ title: "Import new Product successfully!" });

      navigate("/admin/stocks");
    } catch (error: any) {
      const errorMessage = error.data.quantity || error.data?.message;
      toast({ title: errorMessage, variant: "destructive" });
      console.error("Error managing product:", error);
    }
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mt-2">
          <Heading
            title={"Import New Product"}
            description={"Add a new stock transaction"}
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <Popover open={openProduct} onOpenChange={setOpenProduct}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full flex items-center justify-between"
                          >
                            <div>
                              {field.value
                                ? product.find(
                                    (product) =>
                                      product.productId === field.value
                                  )?.productName
                                : "Select Product..."}
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
                                {product.map((pro) => (
                                  <CommandItem
                                    key={pro.productId}
                                    onSelect={() => {
                                      field.onChange(
                                        pro.productId === field.value
                                          ? ""
                                          : pro.productId
                                      );

                                      setOpenProduct(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        pro.productId === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {pro.productName}
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
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Popover
                        open={openSupplier}
                        onOpenChange={setOpenSupplier}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openSupplier}
                            className="w-full flex items-center justify-between"
                          >
                            <div>
                              {field.value
                                ? supplier.find(
                                    (sup) => sup.supplierId === field.value
                                  )?.supplierName
                                : "Select Suppiler..."}
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
                                {supplier.map((sup) => (
                                  <CommandItem
                                    key={sup.supplierId}
                                    value={sup.supplierId.toString()}
                                    onSelect={() => {
                                      field.onChange(
                                        sup.supplierId === field.value
                                          ? ""
                                          : sup.supplierId
                                      );
                                      setOpenSupplier(false);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === sup.supplierId
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {sup.supplierName}
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
              <Button type="submit" className="ml-auto">
                Create
              </Button>
            </form>
          </Form>
        </div>
      </Layout.Body>
    </Layout>
  );
};
