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
import { PasswordInput } from "@/components/custom/password-input";
import { cn } from "@/components/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@/api/auth";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  userNameOrEmailOrPhone: z
    .string()
    .min(1, { message: "Please enter your username, email, or phone number" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userNameOrEmailOrPhone: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await login(data.userNameOrEmailOrPhone, data.password);

      // Check user role after successful login
      const userInfo = await getUserInfo();
      if (userInfo) {
        if (
          (userInfo.roleName === "ROLE_STAFF" ||
          userInfo.roleName === "ROLE_ADMIN") && !userInfo.firstLogin
        ) {
          // User has permission, navigate to admin page
          navigate("/admin");

        }
        if( (userInfo.roleName === "ROLE_STAFF" ||
          userInfo.roleName === "ROLE_ADMIN") && userInfo.firstLogin)
          {
            navigate("/change-password");
            localStorage.removeItem('isLoggedIn');
        
          }
         else {
          // User does not have permission
          setError("You don't have permission.");
        }
       
      } else {
        setError("Failed to retrieve user information.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="userNameOrEmailOrPhone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username, Email, or Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username, email, or phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.userNameOrEmailOrPhone?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button className="my-3" loading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
