// import { DataTable } from "./_components/data-table";
// import { columns } from "./_components/coloums";
// import { auth, clerkClient } from "@clerk/nextjs";

// import { redirect } from "next/navigation";
// import CreateUser from "./_components/create-user";
// const UsersPage = async () => {
//   const user = await currentUser()
//   const userId = user?.userId;

// if (!userId) {
//   return redirect("/");
// }

// const data  = await clerkClient.users.getUserList();
// const users = JSON.parse(JSON.stringify(data))


//   return (
//     <div className="p-6 ">
//       <CreateUser />
//       <DataTable columns={columns} data={users} />
//     </div>
//   );
// };
// export default UsersPage;
