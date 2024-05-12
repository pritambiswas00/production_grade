import * as React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { UserNav } from './UserNav/UserNav';
import ToDo from './ToDo/ToDo';
import { AddToDo } from './CreateToDo/CreateToDo';
import { Card, CardHeader } from '../../components/ui/card';
import { IToDo } from '../../schema/types';
import { getAllToDo } from '../../API/todoService';
import { useToast } from '../../components/ui/use-toast';

interface MetaData {
  title: string;
  description: string;
}

export const metadata: MetaData = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
};

export const DashboardPage: React.FC = () => {
  const { toast } = useToast();
  const [todo, setToDo] = React.useState<IToDo[]>([]);
  const [refetch, setRefetch] = React.useState<boolean>(false);

  const getToDoHandler = async () => {
    const [todos, error] = await getAllToDo();
    if (error) {
      toast({
        variant: 'destructive',
        title: String(error),
      });
      return;
    }
    if (!(todos instanceof Error) && todos !== null) setToDo(todos);
  };

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  React.useEffect(() => {
    getToDoHandler();
  }, [refetch]);

  return (
    <React.Fragment>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <AddToDo refresh={handleRefetch} />
            </div>
          </div>
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {Array.isArray(todo) && todo.length > 0 ? (
                  todo.map((c) => {
                    return (
                      <ToDo
                        key={c.id}
                        id={c.id}
                        completed={c.completed}
                        created_at={c.created_at}
                        description={c.description}
                        title={c.title}
                        updated_at={c.updated_at}
                        refresh={handleRefetch}
                      />
                    );
                  })
                ) : (
                  <Card>
                    <CardHeader>Please Create ToDo</CardHeader>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};
