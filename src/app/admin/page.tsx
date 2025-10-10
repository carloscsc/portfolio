import { read } from "@/_domain/profile/profile.actions";
import ProfileForm from "./(profile)/profile-form";
import { notFound } from "next/navigation";

const AdminPage = async () => {
  const profile = await read();

  if (!profile) {
    notFound();
  }

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b pb-4">
        <h2 className="text-center text-lg">Perfil Profissional</h2>
      </div>
      <div className="mt-4">
        <ProfileForm data={profile} />
      </div>
    </div>
  );
};
export default AdminPage;
