'use client';
import React from 'react';
import { Check } from '@gravity-ui/icons';
import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const SignUpPage = () => {
   const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signUp.email({
         name: userData.name, // required
         email: userData.email, // required
         password: userData.password, // required
         callbackURL: '/',
      });
      if (error) {
         console.log('error:' + error.message);
      } else {
         console.log(data);
      }
      console.log(userData);
   };

   return (
      <div>
         <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm">
               <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold">Create Account</h1>
                  <p className="mt-2 text-sm text-gray-500">Sign up to create your new account</p>
               </div>

               <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                  <TextField
                     isRequired
                     validate={(value) => {
                        if (value.length < 3) {
                           return 'Name must be at least 3 characters';
                        }
                        return null;
                     }}
                  >
                     <Label>Full Name</Label>
                     <Input name="name" placeholder="Enter your full name" />
                     <FieldError />
                  </TextField>

                  <TextField
                     isRequired
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

                  <TextField
                     isRequired
                     minLength={8}
                     type="password"
                     validate={(value) => {
                        if (value.length < 8) {
                           return 'Password must be at least 8 characters';
                        }

                        if (!/[A-Z]/.test(value)) {
                           return 'Password must contain one uppercase letter';
                        }
                        if (!/[0-9]/.test(value)) {
                           return 'Password must contain one number';
                        }
                        return null;
                     }}
                  >
                     <Label>Password</Label>
                     <Input name="password" placeholder="Create a password" />
                     <Description>Must contain 8+ characters, 1 uppercase & 1 number</Description>
                     <FieldError />
                  </TextField>

                  <div className="mt-2 flex gap-3">
                     <Button className="flex-1" type="submit">
                        <Check />
                        Create Account
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

export default SignUpPage;
