/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Column, Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Milkstatuses, VoucherStatuses } from "./filters";
import { Button } from "@/components/ui/button";
import { Icons } from "../ui/icons";
import { ProductsObj } from "@/models/Product";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  dataType?: string;
  placeholder?: string;
  data: TData[];
}

interface FilterOption {
  label: string;
  value: string;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  dataType,
  placeholder,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const getColumnSafely = (
    columnId: string
  ): Column<TData, unknown> | undefined => {
    const column = table.getColumn(columnId);
    if (!column) {
      console.clear();
      return undefined;
    }
    return column;
  };

  const brandColumn = getColumnSafely("brand_brandName");
  const categoryColumn = getColumnSafely("category_categoryName");
  const blogProductColumn = getColumnSafely("product");
  const staffColumn = getColumnSafely("user_fullName");
  const statusColumn = getColumnSafely("status");

  const blogProductOptions: FilterOption[] = [];

  const getFilterOptions = (
    data: any[],
    accessor: (item: any) => string
  ): FilterOption[] => {
    const allNames = data.map(accessor).filter(Boolean);
    const uniqueNames = Array.from(new Set(allNames));
    return uniqueNames.map((name) => ({ label: name, value: name }));
  };

  const brandOptions = brandColumn
    ? getFilterOptions(data, (item: any) => item.brand?.brandName)
    : [];
  const categoryOptions = categoryColumn
    ? getFilterOptions(data, (item: any) => item.category?.categoryName)
    : [];

  if (blogProductColumn && blogProductColumn.getSize() > 0) {
    const allBlogProductNames: string[] = [];

    data.forEach((item: any) => {
      allBlogProductNames.push(
        ...item.product.map((product: ProductsObj) => product.productName)
      );
    });

    const uniqueBlogProductNamesSet = new Set(allBlogProductNames);
    const uniqueBlogProductNames = Array.from(
      uniqueBlogProductNamesSet
    ) as string[];

    const tagsData = uniqueBlogProductNames.map((productName) => ({
      label: productName,
      value: productName,
    }));

    blogProductOptions.push(...tagsData);
  }

  const staffOptions = staffColumn
    ? getFilterOptions(data, (item: any) => item.user?.fullName)
    : [];
  const statusOptions =
    dataType === "vouchers" ? VoucherStatuses : Milkstatuses;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {statusColumn && (
          <DataTableFacetedFilter
            column={statusColumn}
            title="Status"
            options={statusOptions}
          />
        )}

        {brandColumn && (
          <DataTableFacetedFilter
            column={brandColumn}
            title="Brand"
            options={brandOptions}
          />
        )}

        {categoryColumn && (
          <DataTableFacetedFilter
            column={categoryColumn}
            title="Category"
            options={categoryOptions}
          />
        )}

        {blogProductColumn && (
          <DataTableFacetedFilter
            column={blogProductColumn}
            title="Product"
            options={blogProductOptions}
          />
        )}

        {staffColumn && (
          <DataTableFacetedFilter
            column={staffColumn}
            title="Staff"
            options={staffOptions}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.cancel className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
