import * as React from 'react';
import { SignInSchema } from '@/schema/login.schema';
import { type ISignIn } from '@/schema/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
import { redirect } from '@tanstack/react-router';

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => {
  const signInForm = useForm<ISignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSignIn = async (data: ISignIn) => {
    console.log(data, 'Data');
    redirect({
      to: '/dashboard',
    });
  };
  return (
    <div className="bg-transparent w-full flex justify-center items-center">
      <Card className="w-1/3 m-5 h-3/4">
        <CardHeader className="space-y-1">
          <CardDescription className="text-2xl">Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(handleSignIn)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your email address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// import { ILoginForm, LoginForm } from '@/Schema/LoginSchema';
// import { Button } from '@/components/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
// } from '@/components/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/form';
// import { Input } from '@/components/input';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Link } from 'lucide-react';
// import { FC } from 'react';
// import { useForm } from 'react-hook-form';

// interface ILoginIn {}

// const Login: FC<ILoginIn> = ({}) => {
//   const loginForm = useForm<ILoginForm>({
//     resolver: zodResolver(LoginForm),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const handleLogin = async (values: ILoginForm) => {
//     console.log(values, 'Vakuesss');
//   };

//   return (
//     <div className="w-full flex justify-end items-center">
//       <Card className="w-1/3 m-5 h-3/4">
//         <CardHeader className="space-y-1">
//           <CardDescription className="text-2xl">Login</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...loginForm}>
//             <form onSubmit={loginForm.handleSubmit(handleLogin)}>
//               <FormField
//                 control={loginForm.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Enter your email address</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter Index" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={loginForm.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Enter your password</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter Index" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit">Login</Button>
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex">
//           <Button className="w-2/3">Create an Organization</Button>
//           <p>Forgot your password</p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
//   // return (
//   //     <Card>
//   //         <CardHeader className="space-y-1">
//   //             <CardTitle className="text-2xl">Login</CardTitle>
//   //             <CardDescription>
//   //                 Enter your username to Login
//   //             </CardDescription>
//   //         </CardHeader>
//   //         <CardContent className="grid gap-4">
//   //             <div className="grid grid-cols-2 gap-6">
//   //                 <Button variant="outline">
//   //                     <Icons.gitHub className="mr-2 h-4 w-4" />
//   //                     Github
//   //                 </Button>
//   //                 <Button variant="outline">
//   //                     <Icons.google className="mr-2 h-4 w-4" />
//   //                     Google
//   //                 </Button>
//   //             </div>
//   //             <div className="relative">
//   //                 <div className="absolute inset-0 flex items-center">
//   //                     <span className="w-full border-t" />
//   //                 </div>
//   //                 <div className="relative flex justify-center text-xs uppercase">
//   //                     <span className="bg-background px-2 text-muted-foreground">
//   //                         Or continue with
//   //                     </span>
//   //                 </div>
//   //             </div>
//   //             <div className="grid gap-2">
//   //                 <Label htmlFor="email">Email</Label>
//   //                 <Input id="email" type="email" placeholder="m@example.com" />
//   //             </div>
//   //             <div className="grid gap-2">
//   //                 <Label htmlFor="password">Password</Label>
//   //                 <Input id="password" type="password" />
//   //             </div>
//   //         </CardContent>
//   //         <CardFooter>
//   //             <Button className="w-full">Login</Button>
//   //         </CardFooter>
//   //     </Card>
//   // )
// };

// export default Login;
