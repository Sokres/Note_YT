import { ImegeProfoleForm } from "@/components/forms/ImegeProfoleForm";
import { ProfileForm } from "@/components/forms/ProfileFrom";
import { getUserMeLoader } from "@/data/services/getUserMeLoader";

const AccountRoute = async () => {
  const user = await getUserMeLoader();
  const userData = user.data;
  const userImage = userData?.userImage;
  console.log(userImage);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-5">
        <ProfileForm data={userData} className="col-span-4" />
        <ImegeProfoleForm data={userImage} className="col-span-1" />
      </div>
    </div>
  );
};

export default AccountRoute;
