import * as React from 'react';
import { UserSchema } from '@/schema/user.schema';
import { type ISignIn } from '@/schema/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { Icons } from '@/components/ui/Icons';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from '@tanstack/react-router';
import { useToast } from '@/components/ui/use-toast';
import { loginUser } from '@/API/loginService';

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const signInForm = useForm<ISignIn>({
    resolver: zodResolver(UserSchema.pick({ password: true, email: true })),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSignIn = async (data: ISignIn) => {
    const [message, error] = await loginUser(data);
    if (error) {
      toast({
        variant: 'destructive',
        title: error.toString(),
      });
      return;
    }
    toast({
      variant: 'default',
      title: message as string,
    });
    navigate({ to: '/dashboard' });
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent text-foreground">
      <Card className="w-1/4">
        <CardHeader className="space-y-1">
          <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Login
          </CardTitle>
          <CardDescription>
            Enter your Email &amp; Password to log in to your account.
          </CardDescription>
        </CardHeader>
        <Form {...signInForm}>
          <form onSubmit={signInForm.handleSubmit(handleSignIn)}>
            <CardContent className="grid gap-4">
              {/* <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" type="button">
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div> */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                {/* <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div> */}
              </div>
              <div className="grid gap-2">
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Password"
                          id="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{"Don't have an account?"}</Label>
                  <Link
                    to="/create"
                    className="text-xs text-foreground underline"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Log in
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
