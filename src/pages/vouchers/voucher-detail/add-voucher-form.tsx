// src/vouchers/AddVoucher.tsx

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import agent from "@/api/agent";
import { Layout } from "@/components/custom/layout";
import { voucherSchema } from "@/schema/voucherSchema";
import { VoucherStatuses } from "@/components/DataTable/filters";

type VoucherSchemaType = z.infer<typeof voucherSchema>;

const AddVoucher: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<VoucherSchemaType>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      voucherCode: "",
      voucherName: "",
      quantity: 1,
      quantityUse: 1,
      discount: 0,
      minOrderAmount: 0,
      startDate: "0000-00-00",
      endDate: "0000-00-00",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (values: VoucherSchemaType) => {
    const startDateTime = `${values.startDate}T00:00:00.000Z`;
    const endDateTime = `${values.endDate}T23:59:59.999Z`;
    const updatedValues = {
      ...values,
      startDate: startDateTime,
      endDate: endDateTime,
    };

    try {
      await agent.Voucher.addVoucher(updatedValues);
      toast({
        title: "Voucher added successfully!",
      });
      navigate("/admin/vouchers");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: errorMessage,
      });
      console.error("Error adding voucher:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/vouchers");
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mt-2">
          <Heading title="Create New Voucher" description="Add a new voucher" />
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
                  name="voucherCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voucher Code</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voucherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voucher Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="quantityUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Use</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minOrderAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Order Amount</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {VoucherStatuses.map((status, index) => (
                                <SelectItem value={status.value} key={index}>
                                  <span className="flex items-center">
                                    <status.icon className="mr-2 h-5 w-5 text-muted-foreground" />
                                    {status.label}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-x-2">
                <Button type="submit">Add Voucher</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default AddVoucher;
