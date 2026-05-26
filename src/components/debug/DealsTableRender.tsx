import type { ApiErrors } from "../../types/api";
import type { Deal } from "../../types/deals";

type Props = {
  deals: Deal[];
  errors: ApiErrors;
};

export const DealsTableRender = ({ deals, errors }: Props) => {
  return (
    <div className="m-2 p-2 border border-gray-100 rounded shadow">
      <details>
        <summary>Deals</summary>
        <table className="w-full">
          <thead>
            <tr>
              <th>dealKey</th>
              <th>clientKey</th>
              <th>ownerKey</th>
              <th>title</th>
              <th>stage</th>
              <th>value</th>
              <th>probability</th>
              <th>expectedCloseDate</th>
              <th>description</th>
              <th>createdAt</th>
              <th>updatedAt</th>
              <th>meta</th>
            </tr>
          </thead>
          <tbody>
            {errors.deals && (
              <tr>
                <td colSpan={12} className="text-center">
                  {errors.deals}
                </td>
              </tr>
            )}
            {!errors.deals && (
              <>
                {deals.map((deal) => (
                  <tr className=" text-xs border border-gray-300 odd:bg-gray-200" key={deal.id}>
                    {Object.entries(deal).map(([key, value]) => (
                      <>
                        {key !== "id"  && (
                          <td key={deal.id} className="p-1 border">
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
