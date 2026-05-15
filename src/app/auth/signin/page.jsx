'use client';
import React, { useState } from 'react';
import { Check, Eye, EyeSlash } from '@gravity-ui/icons';
import {
   Button,
   Description,
   FieldError,
   Form,
   Input,
   InputGroup,
   Label,
   TextField,
} from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const SignInPage = () => {
   const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
         email: userData.email, // required
         password: userData.password, // required
         rememberMe: true,
         callbackURL: '/',
      });
      console.log('Sign In Response:', { data, error });
   };
   const [isVisible, setIsVisible] = useState(false);
   return (
      <div>
         <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm">
               <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold">Sign In</h1>

                  <p className="mt-2 text-sm text-gray-500">
                     Enter your credentials to access your account
                  </p>
               </div>

               <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                  <TextField
                     isRequired
                     name="email"
                     type="email"
                     validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                           return 'Please enter a valid email address';
                        }
                        return null;
                     }}
                  >
                     <Label>Email</Label>
                     <Input name="email" placeholder="Enter your email" />
                     <FieldError />
                  </TextField>

                  <TextField isRequired name="password">
                     <Label>Password</Label>
                     <InputGroup>
                        <InputGroup.Input
                           type={isVisible ? 'text' : 'password'}
                           placeholder="Enter Your Password"
                        />
                        <InputGroup.Suffix className="pr-0">
                           <Button
                              isIconOnly
                              aria-label={isVisible ? 'Hide password' : 'Show password'}
                              size="sm"
                              variant="ghost"
                              onPress={() => setIsVisible(!isVisible)}
                           >
                              {isVisible ? (
                                 <Eye className="size-4" />
                              ) : (
                                 <EyeSlash className="size-4" />
                              )}
                           </Button>
                        </InputGroup.Suffix>
                     </InputGroup>
                  </TextField>

                  <div className="mt-2 flex gap-3">
                     <Button className="flex-1" type="submit">
                        <Check />
                        Submit
                     </Button>

                     <Button className="flex-1" type="reset" variant="secondary">
                        Reset
                     </Button>
                  </div>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default SignInPage;
