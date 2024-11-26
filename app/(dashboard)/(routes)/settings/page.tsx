import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import { ProfileForm } from "./_components/update-settings-form";

interface iProps {
 
}

const Setting = async ({}:iProps) => {
  const users = await currentUser();
  
  // const user = await getUserById(users.userId ?? '');
  return(
<div className="p-6 h-full w-full">
  <div className="w-full h-72 rounded-t-xl bg-gradient-to-r from-cyan-300 to-pink-300 " />

  <ProfileForm />

</div>
)
}
export default Setting;