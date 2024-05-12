import { signOut } from '../../../API/loginService';
import { getUser } from '../../../API/userService';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { useToast } from '../../../components/ui/use-toast';
import { IUserDetails } from '../../../schema/types';
import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';

export function UserNav() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = React.useState<IUserDetails>({ email: '', name: '' });
  const logoutHandler = async (): Promise<void> => {
    const [message, error] = await signOut();
    if (error) {
      toast({
        variant: 'destructive',
        title: error.toString(),
      });
      return;
    }
    toast({
      variant: 'default',
      title: message as string,
    });
    navigate({ to: '/' });
  };
  const userDetailsHandler = async (): Promise<void> => {
    const [user, error] = await getUser();
    if (error) {
      toast({
        variant: 'destructive',
        title: String(error),
      });
      return;
    }
    if (!(user instanceof Error) && user !== null) setUser(user);
  };

  React.useEffect(() => {
    userDetailsHandler();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="name" />
            <AvatarFallback>
              {user.name.length > 2
                ? user.name
                    .trim()
                    .split(/\s+/)
                    .map((word) => word[0].toUpperCase())
                    .join('')
                : ''}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logoutHandler}>
          Log out
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
