// src/components/user/change-password-form.tsx
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
import { PasswordInput } from "@/components/custom/password-input";
import { Button } from "@/components/custom/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ChangePasswordFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Please enter your old password" }),
    newPassword: z
      .string()
      .min(1, {
        message: "Please enter your new password",
      })
      .min(7, {
        message: "Password must be at least 7 characters long",
      }),
    confirmPassword: z.string().min(1, { message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function ChangePasswordForm({ className, ...props }: ChangePasswordFormProps) {
  const { changePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const success = await changePassword(data.oldPassword, data.newPassword);
      if (success) {
        setError(null);
        alert("Password changed successfully, back to loginpage to login"); 
        form.reset();
        
      } else {
        setError("Failed to change password. Please try again.");
      }
    } catch (error) {
      setError("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    navigate("/");
  }

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter your old password" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.oldPassword?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.newPassword?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm your new password" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                </FormItem>
              )}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button type="submit" className="mt-4" loading={isLoading}>
              Change Password
            </Button>
            <Button type="submit" className="mt-4" onClick={handleBack}>
              Back to loginpage
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
