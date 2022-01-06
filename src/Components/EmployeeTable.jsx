import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({ users }) => {
  const navigate = useNavigate();
  return (
    <div className="container min-w-full overflow-x-scroll shadow-lg">
      <table className="w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-300">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((item, index) => {
            let user = item[Object.keys(item)[0]];
            return (
              <tr key={index}>
                <td
                  className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider bg-gray-100 cursor-pointer"
                  onClick={(e) =>
                    navigate("/admin/" + user.phoneno, {
                      state: { user },
                      replace: true,
                    })
                  }
                >
                  {user.name}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                  {user.phoneno}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                  Employee
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
