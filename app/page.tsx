import { redirect } from "next/navigation";

export default function Page() {
  const today = new Date();
  redirect(`/month/${today.getFullYear()}/${today.getMonth() + 1}`);
}
