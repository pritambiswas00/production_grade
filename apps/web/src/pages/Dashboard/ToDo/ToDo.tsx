import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import * as React from 'react';

interface ToDoPros {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  openToDo: (id: number) => Promise<void>;
}

const ToDo: React.FC<ToDoPros> = ({
  completed,
  created_at,
  description,
  title,
  updated_at,
  id,
  openToDo,
}) => {
  const openEditToDo = async (): Promise<void> => {
    openToDo(id);
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
          <div className="w-full flex justify-evenly items-center gap-5">
            <div className="flex items-center space-x-2">
              <Switch id="is-completed" checked={completed} disabled />
              <Label htmlFor="is-completed">Status</Label>
            </div>
            <Button variant="outline" className="w-full" onClick={openEditToDo}>
              Edit ToDo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

export default ToDo;
