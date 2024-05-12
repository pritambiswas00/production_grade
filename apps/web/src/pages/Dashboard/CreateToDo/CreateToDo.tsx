import { CreateToDoSchema, ICreateToDo } from '../../../schema/types';
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
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import { useToast } from '../../../components/ui/use-toast';
import { createToDo } from '../../../API/todoService';

interface AddToDoProps {
  refresh: () => void;
}

export const AddToDo: React.FC<AddToDoProps> = ({ refresh }) => {
  const { toast } = useToast();
  const createToDoForm = useForm<ICreateToDo>({
    resolver: zodResolver(CreateToDoSchema),
    defaultValues: {
      completed: false,
      description: '',
      title: '',
    },
  });

  const handleCreateToDo = async (data: ICreateToDo) => {
    const [message, error] = await createToDo(data);
    if (error) {
      toast({
        variant: 'destructive',
        title: error.toString(),
      });
    }
    // setOpen(false);
    refresh();
    toast({
      variant: 'default',
      title: message as string,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Add ToDo">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add ToDo</DialogTitle>
          <DialogDescription>
            Add your todo here. Click save when you're done.
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
              <DialogClose asChild>
                <Button title="Add ToDo" type="submit">
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
