'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Employee } from '@/types/employee';
import { useEffect } from 'react';

// Zod schema for form validation
const employeeFormSchema = z.object({
  employeeId: z.number().optional(),
  fullName: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  }),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  address: z.object({
    street: z.string().min(5, 'Street must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
  }),
  department: z.string().min(2, 'Department must be at least 2 characters'),
  status: z.enum(['active', 'inactive']).default('active'),
  profilePicture: z.any().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

interface EmployeeFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValues?: Employee;
}

export function EmployeeFormDialog({
  open,
  setOpen,
  defaultValues,
}: EmployeeFormDialogProps) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: defaultValues || {
      fullName: { firstName: '', lastName: '' },
      phone: '',
      email: '',
      address: { street: '', city: '', country: '' },
      department: '',
      status: 'active',
    },
  });
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);
  function onSubmit(data: EmployeeFormValues) {
    console.log(data);
    setOpen(false);
    // Handle form submission
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] p-6  rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">
              {defaultValues ? 'Edit Employee' : 'Add New Employee'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="First Name"
                          className="border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName.lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Last Name"
                          className="border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Phone number"
                          className="border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Email address"
                          className="border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address Fields */}
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Street</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Street"
                        className="border rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="City"
                          className="border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Country"
                          className="border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Department and Status Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Department
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Department"
                          className="border rounded-md"
                        />
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
                      <FormLabel className="font-semibold">Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border rounded-md">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between space-x-4 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {defaultValues?.employeeId ? 'Update' : 'Create '}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
