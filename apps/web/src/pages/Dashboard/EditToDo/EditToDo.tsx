import * as React from 'react';
import { Button } from '../../../components/ui/button';
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
import { Input } from '../../../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { useForm } from 'react-hook-form';
import { CreateToDoSchema, ICreateToDo } from '../../../schema/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { useToast } from '../../../components/ui/use-toast';
import { updateToDo } from '../../../API/todoService';

interface IEditToDoProps {
  data: {
    title: string;
    description: string;
    completed: boolean;
  };
  id: number;
  refresh: () => void;
}

export const EditToDo: React.FC<IEditToDoProps> = ({ data, id, refresh }) => {
  const { toast } = useToast();
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
    const [_, error] = await updateToDo(data, id);
    if (error) {
      toast({
        variant: 'destructive',
        title: error.toString(),
      });
      return;
    }
    // refresh();
    toast({
      variant: 'default',
      title: 'Successfully updated the To Do',
    });
    refresh();
    // useLoaderDeps({ from: '/dashboard' });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Edit ToDo">
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
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
              <DialogClose asChild>
                <Button title="Edit ToDo" type="submit">
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
