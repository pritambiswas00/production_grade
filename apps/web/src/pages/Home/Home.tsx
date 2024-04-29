import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from '@tanstack/react-router';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <React.Fragment>
      <div className="bg-transparent w-full flex justify-end items-center p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/signin">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign In
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/create">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Add Account
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </React.Fragment>
  );
};

export default Home;
