import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import * as React from 'react';
import { EditToDo } from '../EditToDo/EditToDo';
import { Button } from '../../../components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteToDo } from '../../../API/todoService';
import { useToast } from '../../../components/ui/use-toast';

interface ToDoPros {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  refresh: () => void;
}

const ToDo: React.FC<ToDoPros> = ({
  completed,
  created_at,
  description,
  title,
  updated_at,
  id,
  refresh,
}) => {
  const { toast } = useToast();
  const handleDeleteToDo = async (id: number) => {
    const [message, error] = await deleteToDo(id);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to delete ToDo',
      });
    }
    refresh();
    toast({
      variant: 'default',
      title: message as string,
    });
  };
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="scroll-m-20 border-b text-2xl font-semibold tracking-tight first:mt-0">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-10">
          <h2 className="text:sm font-medium text-wrap">{description}</h2>
          <div className="w-full flex justify-between items-center ">
            <p className="text-sm text-muted-foreground">
              Created At -{' '}
              <span className="text-sm font-medium leading-none">
                {created_at}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Updated At -{' '}
              <span className="text-sm font-medium leading-none">
                {updated_at}
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-start items-center gap-5">
            <div className="flex items-center space-x-2">
              <Switch
                id="is-completed"
                checked={completed}
                disabled
                title="Change Status"
              />
              <Label htmlFor="is-completed">Status</Label>
            </div>
            <div className="flex items-center space-x-2">
              <EditToDo
                data={{ completed, description, title }}
                id={id}
                refresh={refresh}
              />
              <Label htmlFor="edit">Edit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                title="Delete ToDo"
                variant={'outline'}
                onClick={() => handleDeleteToDo(id)}
              >
                <TrashIcon />
              </Button>
              <Label htmlFor="delete">Delete</Label>
            </div>
          </div>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

export default ToDo;
