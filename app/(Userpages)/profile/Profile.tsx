"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  Fname: string;
  Lname: string;
  email: string;
  phone: string;
  password: string;
  createdAt: number;

  gender?: "male" | "female" | "other";
  dob?: string;
  address?: string;
};

function getUsers(): User[] {
  const raw = localStorage.getItem("users");
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem("users", JSON.stringify(users));
}

export default function Profile({
  user,
  onUserUpdate,
}: {
  user: User;
  onUserUpdate: (u: User) => void;
}) {
  const [gender, setGender] = useState<
    "male" | "female" | "other"
  >(user.gender ?? "male");

  const [dob, setDob] = useState(user.dob ?? "");
  const [address, setAddress] = useState(user.address ?? "");

  // if parent updates user, sync form
  useEffect(() => {
    setGender(user.gender ?? "male");
    setDob(user.dob ?? "");
    setAddress(user.address ?? "");
  }, [user]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const users = getUsers();

    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            gender,
            dob,
            address,
          }
        : u
    );

    saveUsers(updatedUsers);

    const updatedUser = updatedUsers.find(
      (u) => u.id === user.id
    );

    if (updatedUser) {
      onUserUpdate(updatedUser);
    }

    alert("Profile updated successfully");
  }

  return (
    <div>
      <div className="border rounded-md">

        <div className="border-b px-6 py-4">
          <h2 className="text-sm font-medium text-gray-600">
            EDIT PROFILE
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email Id</label>
            <input
              disabled
              value={user.email}
              className="w-full max-w-md bg-gray-100 border rounded-md px-4 py-2 text-sm"
            />
          </div>

          <div className="border-t pt-6">

            <h3 className="text-sm font-medium text-gray-600 mb-6">
              General Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* First name */}
              <div>
                <label className="block text-sm mb-2">
                  First Name
                </label>
                <input
                  disabled
                  value={user.Fname}
                  className="w-full bg-gray-100 border rounded-md px-4 py-2 text-sm"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>

              {/* Last name */}
              <div>
                <label className="block text-sm mb-2">
                  Last Name
                </label>
                <input
                  disabled
                  value={user.Lname}
                  className="w-full bg-gray-100 border rounded-md px-4 py-2 text-sm"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm mb-2">
                  Mobile Number
                </label>
                <input
                  disabled
                  value={user.phone}
                  className="w-full bg-gray-100 border rounded-md px-4 py-2 text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm mb-2">
                  Gender
                </label>

                <div className="flex items-center gap-6 text-sm">

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      className="accent-red-500"
                    />
                    Male
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      className="accent-red-500"
                    />
                    Female
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={gender === "other"}
                      onChange={() => setGender("other")}
                      className="accent-red-500"
                    />
                    Other
                  </label>

                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm mb-2">
                  Default Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-27.5 border rounded-md px-4 py-2 text-sm resize-none"
                  placeholder="Enter your address"
                />
              </div>

            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded text-sm font-medium"
              >
                SAVE CHANGES
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}
