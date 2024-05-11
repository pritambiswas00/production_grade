import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateSchema, ICreateUser } from '@/schema/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
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
import { useNavigate } from '@tanstack/react-router';

interface AddAccountProps {}

export const AddAccount: React.FC<AddAccountProps> = () => {
  const navigate = useNavigate();
  const createUserForm = useForm<ICreateUser>({
    resolver: zodResolver(CreateSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const handleCreateUser = async (data: ICreateUser) => {
    console.log(data, 'Data');
    navigate({ to: '/dashboard' });
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent text-foreground">
      <Card className="w-1/4">
        <CardHeader className="space-y-1">
          <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Create An Account
          </CardTitle>
        </CardHeader>
        <Form {...createUserForm}>
          <form onSubmit={createUserForm.handleSubmit(handleCreateUser)}>
            <CardContent className="grid gap-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase"></div>
              </div>
              <div className="grid gap-2">
                <FormField
                  control={createUserForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={createUserForm.control}
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
                  control={createUserForm.control}
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
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Create
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
