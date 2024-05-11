import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNav } from './UserNav/UserNav';
import { useLoaderData } from '@tanstack/react-router';
import { IToDo } from '@/schema/types';
import ToDo from './ToDo/ToDo';
import { EditToDo } from './EditToDo/EditToDo';
import { PlusIcon } from '@radix-ui/react-icons';
import { AddToDo } from './CreateToDo/CreateToDo';

interface MetaData {
  title: string;
  description: string;
}

export const metadata: MetaData = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
};

export function DashboardPage() {
  const data = useLoaderData({ from: '/dashboard' }) as IToDo[];
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);
  const openEditDialog = async (id: number): Promise<void> => {
    setSelectedIndex(id);
    setOpenEdit(!openEdit);
  };
  const openCreateDialog = async (): Promise<void> => {
    setOpenCreate(!openCreate);
  };
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
              <Button onClick={openCreateDialog} title="Add ToDo">
                <PlusIcon fontSizeAdjust={2} />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {data.map((c) => {
                  return (
                    <ToDo
                      key={c.id}
                      id={c.id}
                      completed={c.completed}
                      created_at={c.created_at}
                      description={c.description}
                      title={c.title}
                      updated_at={c.updated_at}
                      openToDo={openEditDialog}
                    />
                  );
                })}
              </div>
              <EditToDo data={data[selectedIndex]} open={openEdit} />
              <AddToDo open={openCreate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
}
