import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import ProfileForm from "./(profile)/profile-form";
import { Suspense } from "react";

const AdminPage = async () => {
  const data = getAndCacheProfile();

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-4">
        <h2 className="text-center text-lg text-primary">Profile</h2>
      </div>
      <div className="mt-4">
        <Suspense>
          <ProfileForm profileData={data} />
        </Suspense>
      </div>
    </div>
  );
};
export default AdminPage;
