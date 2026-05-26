import type { Client } from "../../types/client";
import type { ApiErrors } from "../../types/api";

type Props = {
  clients: Client[];
  errors: ApiErrors;
};

export const ClientsTableRender = ({ clients, errors }: Props) => {
  return (
    <div className="m-2 p-2 border border-gray-100 rounded shadow">
      <details>
        <summary>Clients</summary>
        <table className="w-full">
          <thead>
            <tr>
              <th>ClientKey</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Status</th>
              <th>Email</th>
              <th>Phone</th>
              <th>OwnerKey</th>
              <th>CreatedAt</th>
              <th>LastContactAt</th>
              <th>Tags</th>
              <th>Notes</th>
              <th>Issues</th>
            </tr>
          </thead>
          <tbody>
            {errors.clients && (
              <tr>
                <td colSpan={12} className="text-center">
                  {errors.clients}
                </td>
              </tr>
            )}
            {!errors.clients && (
              <>
                {clients.map((client) => (
                  <tr className=" text-xs border border-gray-300 odd:bg-gray-200" key={client.id}>
                    {Object.entries(client).map(([key, value]) => (
                      <>
                        {key !== "id" && key !== "meta"   && (
                          <td key={client.id} className="p-1 border">
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
