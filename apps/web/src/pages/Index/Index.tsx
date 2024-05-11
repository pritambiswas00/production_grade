import * as React from 'react';
import { SignIn } from '../SignIn/SignIn';

interface IndexPageProps {}
export const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <React.Fragment>
      <div className="bg-transparent w-full relative max-h-full z-1">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center sm:inset-1 md:inset-1 z-0">
          Make To Do
        </h1>
        <SignIn />
      </div>
    </React.Fragment>
  );
};
