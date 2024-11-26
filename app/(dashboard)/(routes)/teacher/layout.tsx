import { redirect } from 'next/navigation';

import { currentUser } from "@/lib/auth";

import { isTeacher } from '@/lib/teacher';

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  const userId = user?.userId;

  // if (!isTeacher(userId)) {
  //   return redirect('/');
  // }

  return <>{children}</>;
};

export default TeacherLayout;
