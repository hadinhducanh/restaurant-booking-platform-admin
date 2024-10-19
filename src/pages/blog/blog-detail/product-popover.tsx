/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import agent from "@/api/agent"; // Replace with your actual API agent
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface Product {
  productId: number;
  productName: string;
}

interface ProductPopoverProps {
  onSelect: (product: Product | null) => void;
  selectedProducts: Product[];
}

const ProductPopover: React.FC<ProductPopoverProps> = ({
  onSelect,
  selectedProducts,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNo] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await agent.Products.list(pageNo, pageSize);
        if (response.content && Array.isArray(response.content)) {
          setProducts(response.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getProducts();
  }, [pageNo, pageSize]);

  const handleSelect = (product: Product) => {
    onSelect(product);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dotted border-2 border-slate-400"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Product
          {selectedProducts.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedProducts.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedProducts.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedProducts.length} selected
                  </Badge>
                ) : (
                  selectedProducts.map((product) => (
                    <Badge
                      variant="secondary"
                      key={product.productId}
                      className="rounded-sm px-1 font-normal"
                    >
                      {product.productName}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-50" align="start">
        <Command>
          <CommandInput placeholder="Search products..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => {
                const isSelected = selectedProducts.some(
                  (p) => p.productId === product.productId
                );
                return (
                  <CommandItem
                    key={product.productId}
                    onSelect={() => handleSelect(product)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50"
                      }`}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>{product.productName}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedProducts.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onSelect(null)}
                    className="justify-center text-center"
                  >
                    Clear all
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProductPopover;
