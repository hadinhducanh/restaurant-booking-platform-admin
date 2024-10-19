import { HTMLAttributes, useState } from "react";
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
import { Button } from "@/components/custom/button";
import { cn } from "@/components/lib/utils";
import { registerStaff } from "@/api/auth"; // Assuming this is where you handle registration
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface StaffRegistrationFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Please enter your full name" }),
  username: z.string().min(1, { message: "Please enter a username" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters long" }),
  gender: z.string().min(1, { message: "Please select a gender" }), // Example validation, adjust as needed
});

export function StaffRegistrationForm({
  className,
  ...props
}: StaffRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      password: "Staff@1234",
      phone: "",
      gender: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const success = await registerStaff(data);

      if (success) {
        // Redirect or show success message
        toast({
          title: "Create successfully!",
          description: "Staff registration successfully",
        });
        // Example redirect
      } else {
        setError("Failed to register staff. Please try again.");
      }
    } catch (error) {
      setError("Failed to register staff. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    navigate("/admin/users");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.username?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fullname" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.fullName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.phone?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter gender" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.gender?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button className="my-3" loading={isLoading}>
              Register Staff
            </Button>
            <Button className="my-3" onClick={handleBack}>
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
