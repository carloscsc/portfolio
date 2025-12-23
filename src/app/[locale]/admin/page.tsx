import ProfileForm from "./(profile)/profile-form";
import { notFound } from "next/navigation";
import { ProfileSchema } from "@/_domain/profile/profile.schema";

const AdminPage = async () => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
    { next: { tags: ["profile"] } }
  );

  if (!request.ok) {
    return notFound();
  }

  const data = await request.json();

  const profile = data ? ProfileSchema.safeParse(data) : null;

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b pb-4">
        <h2 className="text-center text-lg">Perfil Profissional</h2>
      </div>
      <div className="mt-4">
        <ProfileForm data={profile?.data || null} />
      </div>
    </div>
  );
};
export default AdminPage;
