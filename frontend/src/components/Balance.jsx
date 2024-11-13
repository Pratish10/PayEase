import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/atom";

export const Balance = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className="container">
      <h1 className="text-2xl">
        Your Balance: <span>Rs {user?.balance ?? 0}</span>
      </h1>
    </div>
  );
};
