import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { useEffect } from "react";
// import { getAllDemo } from "./BasicApi";
import BaseLayout from "@/features/layout/BaseLayout";
import { logOut } from "@/features/auth/authSlice";

const TestLayout = () => {
  const { users, isGetUser } = useAppSelector((state) => state.demo);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  console.log(currentUser);
  // useEffect(() => {
  //   if (!isGetUser) {
  //     dispatch(getAllDemo());
  //   }
  // }, [dispatch, isGetUser]);

  const reloadData = () => {
    dispatch(logOut());
  };

  return (
    <BaseLayout>
      <div>
        <h1>Test Page</h1>
        <button onClick={() => reloadData()}>logout</button>
        {isGetUser && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        )}
      </div>
    </BaseLayout>
  );
};

export default TestLayout;
