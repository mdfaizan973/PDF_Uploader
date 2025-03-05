import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  FaEdit,
  FaUserShield,
  FaTrash,
  FaSort,
  FaSearch,
} from "react-icons/fa";
import { API_KEY, baseUrl } from "../configs/config";

export default function AdminComponent() {
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { id: "users", label: "Users" },
    { id: "pdfs", label: "PDF" },
    { id: "feedback", label: "Feedback" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        {/* Tabs */}
        <div className="flex justify-start overflow-x-auto">
          <div className="flex space-x-4 border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 text-sm font-semibold rounded-t-md transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6 p-4 rounded-md">
          {activeTab === "users" && <UserDataTable />}
          {activeTab === "pdfs" && (
            <h2 className="text-2xl font-bold text-gray-800">All PDF</h2>
          )}
          {activeTab === "feedback" && (
            <h2 className="text-2xl font-bold text-gray-800">User Feedback</h2>
          )}
        </div>
      </div>
    </>
  );
}

const UserDataTable = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [roleModal, setRoleModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${baseUrl}/users`, {
        headers: {
          "x-api-key": API_KEY,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };
  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/users/${id}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
        alert("User deleted successfully");
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEditSubmit = (formData, id) => {
    axios
      .put(`${baseUrl}/users/${id}`, formData, {
        headers: {
          "x-api-key": API_KEY,
        },
      })
      .then(() => {
        alert("User updated successfully");
        fetchUsers();
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleRoleIdSubmit = (selctedRoleData, selectedLimit, id) => {
    axios
      .put(
        `${baseUrl}/users/${id}`,
        { role_id: selctedRoleData, limits: selectedLimit },
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      )
      .then(() => {
        alert("Role updated successfully");
        fetchUsers();
      })
      .catch((error) => console.error("Error updating role:", error));
  };
  const getRoleColor = (roleId) => {
    switch (roleId) {
      case 1:
        return "bg-pink-200 text-pink-800";
      case 2:
        return "bg-yellow-200 text-yellow-800";
      case 3:
        return "bg-green-200 text-green-800";
      case 4:
        return "bg-purple-200 text-purple-800";
      case 5:
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-gray-200 text-gray-800"; // Default color
    }
  };
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Name</div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Email</div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Role</div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Limits</div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Password</div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Created At</div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Updated At</div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name || "--"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.email || "--"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(
                        user.role_id
                      )}`}
                    >
                      Role {user.role_id || "--"}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(
                        user.role_id
                      )}`}
                    >
                      {user.limits || "--"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.copypass || "--"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : "--"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleString()
                        : "--"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        onClick={() => setEditUser(user)}
                        aria-label="Edit user"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-yellow-600 hover:text-yellow-900 transition-colors"
                        onClick={() => setRoleModal(user)}
                        aria-label="Change user role"
                      >
                        <FaUserShield className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 transition-colors"
                        onClick={() => handleDelete(user._id)}
                        aria-label="Delete user"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No users found. Try adjusting your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing {users.length} of {users.length} users
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <EditUserModal
          user={editUser}
          handleEditSubmit={handleEditSubmit}
          onClose={() => setEditUser(null)}
        />
      )}

      {/* Role Modal */}
      {roleModal && (
        <RoleChangeModal
          user={roleModal}
          handleRoleIdSubmit={handleRoleIdSubmit}
          onClose={() => setRoleModal(null)}
        />
      )}
    </div>
  );
};

const EditUserModal = ({ user, onClose, handleEditSubmit }) => {
  const [formData, setFormData] = useState(user);

  const handleSubmit = () => {
    handleEditSubmit(formData, user._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-2">Edit User</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Email</label>

          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end mt-3 gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const RoleChangeModal = ({ user, handleRoleIdSubmit, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(user.role_id);
  const [selectedLimit, setSelectedLimit] = useState(
    getLimitForRole(user.role_id)
  );

  function getLimitForRole(role) {
    return role === 1
      ? "Unlimited"
      : role === 2
      ? "1000"
      : role === 3
      ? "500"
      : role === 4
      ? "200"
      : role === 5
      ? "20"
      : "";
  }

  const handleRoleChange = () => {
    handleRoleIdSubmit(selectedRole, selectedLimit, user._id);
    onClose();
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedLimit(getLimitForRole(role));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl font-bold">Change User Role</h2>
        <p className="mb-4">
          Change role for user:{" "}
          <span className="font-semibold">{user.name}</span>
        </p>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5].map((role) => {
            const roleText =
              {
                1: "Unlimited Access",
                2: "1 Year Subscription",
                3: "Limit 500",
                4: "Limit 200",
                5: "Free Limit 20",
              }[role] || `Role ${role}`;

            return (
              <label key={role} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRole === role}
                  onChange={() => handleRoleSelect(role)}
                />
                Access Level {role} ({roleText})
              </label>
            );
          })}

          <div className="mt-2">
            <span className="text-gray-600">
              Current Limit: <strong>{user?.limits ?? "--"}</strong>
            </span>
          </div>

          <input
            type="number"
            className="border border-gray-300 rounded px-2 py-1 mt-2"
            value={
              selectedRole === 1
                ? "Unlimited"
                : selectedRole === 2
                ? "1000"
                : selectedRole === 3
                ? "500"
                : selectedRole === 4
                ? "200"
                : selectedRole === 5
                ? "20"
                : ""
            }
            onChange={(e) => setSelectedLimit(e.target.value)}
            disabled={selectedRole === 1}
          />
        </div>
        <div className="flex justify-end mt-3 gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleRoleChange}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
