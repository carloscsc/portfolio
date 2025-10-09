import ProfileForm from "./(profile)/profile-form";

const AdminPage = () => {
  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b pb-4">
        <h2 className="text-center text-lg">Perfil Profissional</h2>
      </div>
      <div className="mt-4">
        <ProfileForm />
      </div>
    </div>
  );
};
export default AdminPage;
