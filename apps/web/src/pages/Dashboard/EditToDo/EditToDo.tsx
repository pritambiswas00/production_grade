import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { CreateToDoSchema, ICreateToDo } from '@/schema/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface IEditToDoProps {
  data: {
    title: string;
    description: string;
    completed: boolean;
  };
  open: boolean;
}

export const EditToDo: React.FC<IEditToDoProps> = ({ data, open }) => {
  const editToDoForm = useForm<ICreateToDo>({
    resolver: zodResolver(CreateToDoSchema),
    defaultValues: {
      completed: data.completed,
      description: data.description,
      title: data.title,
    },
  });

  const handleEditToDo = async (data: ICreateToDo) => {
    console.log(data, 'Data');
    // navigate({ to: '/dashboard' });
  };
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit ToDo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...editToDoForm}>
          <form onSubmit={editToDoForm.handleSubmit(handleEditToDo)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={editToDoForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={editToDoForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your description here"
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
                  control={editToDoForm.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2" htmlFor="completed">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button title="Edit ToDo" type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
