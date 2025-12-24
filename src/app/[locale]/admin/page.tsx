import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import ProfileForm from "./(profile)/profile-form";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const AdminPage = async () => {
  const data = getAndCacheProfile();

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-4">
        <h2 className="text-center text-lg text-primary">Profile</h2>
      </div>
      <div className="mt-4">
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center gap-2">
              <Spinner /> <span className="animate-pulse">Loading...</span>
            </div>
          }
        >
          <ProfileForm profileData={data} />
        </Suspense>
      </div>
    </div>
  );
};
export default AdminPage;
