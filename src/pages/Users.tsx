import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import useAuthStore from "../store/authStore";
import type { User } from "../types/user";

const USERS_PER_PAGE = 5;
const LOCAL_STORAGE_KEY = "user_updates";

const getStoredUpdates = (): Record<number, Partial<User>> => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const storeUpdate = (userId: number, updates: Partial<User>) => {
  const currentUpdates = getStoredUpdates();
  currentUpdates[userId] = { ...currentUpdates[userId], ...updates };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentUpdates));
};

const removeStoredUpdate = (userId: number) => {
  const currentUpdates = getStoredUpdates();
  delete currentUpdates[userId];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentUpdates));
};

const updateUser = async (
  userId: number,
  updates: Partial<User>
): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      method: "PUT",
      body: JSON.stringify(updates),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.json();
};

const deleteUser = async (id: number): Promise<void> => {
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  });
};

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    company: "",
  });

  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const updatedUsers = React.useMemo(() => {
    const storedUpdates = getStoredUpdates();
    return users.map((user) => {
      const updates = storedUpdates[user.id];
      if (updates) {
        return {
          ...user,
          ...updates,
        };
      }
      return user;
    });
  }, [users]);

  const updateUserMutation = useMutation({
    mutationFn: ({
      userId,
      updates,
    }: {
      userId: number;
      updates: Partial<User>;
    }) => updateUser(userId, updates),
    onMutate: async ({ userId, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (old) =>
        old?.map((u) =>
          u.id === userId
            ? {
                ...u,
                ...updates,
              }
            : u
        )
      );

      storeUpdate(userId, updates);

      return { previousUsers };
    },
    onError: (err, { userId }, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
      removeStoredUpdate(userId);
      console.error("Update failed:", err);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (old) =>
        old?.filter((user) => user.id !== id)
      );

      removeStoredUpdate(id);

      return { previousUsers };
    },
    onError: (err, _id, context) => {
      console.error("Delete failed", err);
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      company: user.company.name,
    });
  };

  const handleUpdate = () => {
    if (editingUser) {
      updateUserMutation.mutate({
        userId: editingUser.id,
        updates: {
          name: editForm.name,
          email: editForm.email,
        },
      });
      setEditingUser(null);
    }
  };

  const totalPages = Math.ceil(updatedUsers.length / USERS_PER_PAGE);
  const paginatedUsers = updatedUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  if (isLoading) return <div className="p-6">Loading users...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Error loading users</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-[#3B3950] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Company</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[#797979]">
            {paginatedUsers.map((userData) => (
              <tr key={userData.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4">{userData.name}</td>
                <td className="py-3 px-4">{userData.email}</td>
                <td className="py-3 px-4">{userData.company.name}</td>
                <td className="py-3 px-4 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedUser(userData)}
                    className="text-yellow-950 text-2xl px-3 py-1.5 rounded-md transform transition-transform duration-300 hover:scale-125 cursor-pointer hover:bg-amber-100"
                  >
                    👁
                  </button>
                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() => handleEdit(userData)}
                        className="font-bold text-2xl px-3 py-1.5 rounded-md transform transition-transform duration-300 hover:scale-125 cursor-pointer hover:bg-red-100"
                        disabled={updateUserMutation.isPending}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(userData.id)}
                        className="text-red-700 font-bold text-3xl px-3 py-1.5 rounded-md transform transition-transform duration-300 hover:scale-125 cursor-pointer hover:bg-red-200"
                        disabled={deleteUserMutation.isPending}
                      >
                        🗑
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-[#797979]">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 text-sm font-medium">
        <button
          className="px-5 py-2 rounded-full border border-gray-300 text-[#4E42D9] hover:bg-[#4E42D9] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          ⬅️ Previous
        </button>

        <div className="flex items-center gap-1 flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 text-sm ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-[#4E42D9] to-indigo-500 text-white font-semibold shadow-md"
                  : "text-[#4E42D9] border border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className="px-5 py-2 rounded-full border border-gray-300 text-[#4E42D9] hover:bg-[#4E42D9] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡️
        </button>
      </div>

      {updateUserMutation.isPending && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Updating user...
        </div>
      )}

      {deleteUserMutation.isPending && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Deleting user...
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md bg-white/30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-[#4E42D9] mb-4">
              User Info
            </h2>
            <div className="text-[#797979] space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Company:</strong> {selectedUser.company.name}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-[#4E42D9] text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl px-8 py-6 w-full max-w-md shadow-2xl relative transition-all duration-300">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl transition-colors"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-[#4E42D9] mb-6">
              Edit User
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4E42D9] transition"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  disabled={updateUserMutation.isPending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4E42D9] transition"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  disabled={updateUserMutation.isPending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4E42D9] transition"
                  value={editForm.company}
                  readOnly
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                disabled={updateUserMutation.isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-sm text-white bg-[#4E42D9] hover:bg-indigo-700 rounded-md transition disabled:opacity-50"
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
