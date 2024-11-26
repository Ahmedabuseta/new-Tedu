// 'use client'
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";

// import {
//   Form,
//   FormLabel,
//   FormField,
//   FormItem
// } from '@/components/ui/form';
// import {Input} from '@/components/ui/input';
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import { clerkClient } from "@clerk/nextjs";
// import axios from "axios";
// const formSchema = z.object({
//   username: z.string().min(1,{
//     message:"username is required"}),
//   password: z.string().min(8,{
//       message:"password is required"}),
// })
// const createUser = () => {
//   const router = useRouter()
//  const form = useForm<z.infer<typeof formSchema>>({
//   resolver:zodResolver(formSchema),
//   defaultValues:{
//     username:"",
//     password:''
//   },
// })

// const { isSubmitting ,isValid}  = form.formState;
// const onSubmit = async (values: z.infer<typeof formSchema>) => {
//   try {
//     const response = await axios.post("/api/create-user",{
//       ...values
//     });
    
//     if (response.data.success) toast.success('User created successfully');
//     router.refresh(); // Refresh the page
//   } catch (error) {
//     const errorMessage = 'Failed to create user';
//     toast.error(errorMessage);
//   }
// };

// return(
// <div className="max-w-5xl flex flex-col md:items-center md:justify-center p-6 h-full  mx-auto">
//   <h1 className="text-2xl bg-slate-200 p-3 italic">
//     add users
//   </h1>
//   <Form {...form} >
//   <form
//   className=" md:flex justify-center gap-4 flex-wrap items-center mt-8 "
//   onSubmit={form.handleSubmit(onSubmit)}>
//     <FormField
//     control={form.control}
//     name="username"
//     render={({field})=>(
//       <FormItem>
//         <FormLabel>
//          user name
//         </FormLabel>
//           <Input 
//           disabled={isSubmitting}
//           placeholder="e.g advanced web development"
//           {...field}
//           />
//       </FormItem>
//     )}/>
//         <FormField
//     control={form.control}
//     name="password"
//     render={({field})=>(
//       <FormItem>
//         <FormLabel>
//          passsword
//         </FormLabel>
//           <Input 
//           disabled={isSubmitting}
//           placeholder="e.g advanced web development"
//           {...field}
//           />
//       </FormItem>
//     )}/>
//       <Button
//       className="mt-8"
//       type="submit"
//       disabled={!isValid || isSubmitting}
//       >
//         craete
//       </Button>
//   </form>
//   </Form>
  
// </div>
// )
// }
// export default createUser;