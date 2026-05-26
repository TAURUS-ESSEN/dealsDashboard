import type { User } from "../../types/users";
import type { ApiErrors } from "../../types/api";

type Props = {
  users: User[];
  errors: ApiErrors;
};

export const UsersTableRender = ({ users, errors }: Props) => {
  return (
    <div className="m-2 p-2 border border-gray-100 rounded shadow">
      <details>
        <summary>Users</summary>
        <table className="w-full">
          <thead>
            <tr>
              <th>userKey</th>
              <th>fullName</th>
              <th>role</th>
              <th>email</th>
              <th>avatarUrl</th>
              <th>active</th>
              <th>issues</th>
            </tr>
          </thead>
          <tbody>
            {errors.users && (
              <tr>
                <td colSpan={12} className="text-center">
                  {errors.users}
                </td>
              </tr>
            )}
            {!errors.users && (
              <>
                {users.map((user) => (
                  <tr className=" text-xs border border-gray-300 odd:bg-gray-200" key={user.id}>
                    {Object.entries(user).map(([key, value]) => (
                      <>
                        {key !== "id" && (
                          <td key={user.id} className="p-1 border">
                            {String(value)}
                          </td>
                        )}
                      </>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </details>
    </div>
  );
};
