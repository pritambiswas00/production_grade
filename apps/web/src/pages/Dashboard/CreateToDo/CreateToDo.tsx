import { CreateToDoSchema, ICreateToDo } from '@/schema/types';
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddToDoProps {
  open: boolean;
}

export const AddToDo: React.FC<AddToDoProps> = ({ open }) => {
  const createToDoForm = useForm<ICreateToDo>({
    resolver: zodResolver(CreateToDoSchema),
    defaultValues: {
      completed: false,
      description: '',
      title: '',
    },
  });

  const handleCreateToDo = async (data: ICreateToDo) => {
    console.log(data, 'Data');
  };
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add ToDo</DialogTitle>
          <DialogDescription>
            Create your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...createToDoForm}>
          <form onSubmit={createToDoForm.handleSubmit(handleCreateToDo)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={createToDoForm.control}
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
                  control={createToDoForm.control}
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
                  control={createToDoForm.control}
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
