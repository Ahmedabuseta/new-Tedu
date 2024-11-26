
import { DataTable } from './data-table';
import { columns } from './columns';

// Database
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { generateDummyTransactions } from './dummy';
const TRansactionTable = async () => {

  // const user = await currentUser()
  // const userId = user?.userId;
  
  const transactions = generateDummyTransactions(12,10)
  // await db.course.findMany({
  //   where: {
  //     userId,
  //   },
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // });

  return (
    <div className="p-6 w-full bg-white/40 backdrop-blur-md dark:bg-black/40 rounded-xl">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};

export default TRansactionTable;
