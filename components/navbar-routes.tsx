'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Book } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { SearchInput } from './search-input';

import { isTeacher } from '@/lib/teacher';
import { currentUser } from '@/lib/auth';

const NavbarRoutes = () => {
  // const id = async ()=>{
  //       const user= await currentUser();
  //       const userId =user?.userId
  //       return userId
  // }
const userId =  'dhfjidbgjkn'
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isCoursePage = pathname?.startsWith('/courses');
  const isSearchPage = pathname === '/search';

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <Book className="h-4 w-4 mr-2" />
              Course Dashboard
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Dashboard
            </Button>
          </Link>
        ) : null}
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </>
  );
};

export default NavbarRoutes;
