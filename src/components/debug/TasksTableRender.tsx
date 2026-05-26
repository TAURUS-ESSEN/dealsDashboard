import type { Task } from "../../types/tasks";
import type { ApiErrors } from "../../types/api";

type Props = {
  tasks: Task[];
  errors: ApiErrors;
};

export const TasksTableRender = ({ tasks, errors }: Props) => {
  return (
    <div className="m-2 p-2 border border-gray-100 rounded shadow">
      <details>
        <summary>Tasks</summary>
        <table className="w-full">
          <thead>
            <tr>
              <th>taskKey</th>
              <th>clientKey</th>
              <th>dealKey</th>
              <th>assigneeKey</th>
              <th>title</th>
              <th>status</th>
              <th>priority</th>
              <th>dueDate</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            {errors.tasks && (
              <tr>
                <td colSpan={12} className="text-center">
                  {errors.tasks}
                </td>
              </tr>
            )}
            {!errors.tasks && (
              <>
                {tasks.map((task) => (
                  <tr className=" text-xs border border-gray-300 odd:bg-gray-200" key={task.id}>
                    {Object.entries(task).map(([key, value]) => (
                      <>
                        {key !== "id" && (
                          <td key={task.id} className="p-1 border">
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
