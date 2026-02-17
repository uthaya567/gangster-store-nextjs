// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";

// // type Session = {
// //   userId: string;
// //   loggedInAt: number;
// //   name : string
// // };

// // export default function ProfilePage() {
// //   const [session, setSession] = useState<Session | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const raw = localStorage.getItem("session");

// //     if (raw) {
// //       try {
// //         setSession(JSON.parse(raw));
// //       } catch {
// //         setSession(null);
// //       }
// //     } else {
// //       router.replace("/login"); // 🔥 Redirect if not logged in
// //     }

// //     setLoading(false);
// //   }, [router]);

// //   if (loading) return null;

// //     function handleLogout() {
// //   localStorage.removeItem("session");
// //    router.replace("/login"); // or redirect wherever you want
// // }
// //   return (
// //     <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
// //       <h2 className="text-xl font-semibold">My Profile</h2>

// //       <div className="border rounded p-4 w-full max-w-sm">
// //         <p className="text-sm text-gray-600">
// //           User ID: {session?.userId}
// //         </p>
// //                 <p className="text-sm text-gray-600">
// //           Name : {session?.name}
// //         </p>
// //         <p className="text-sm text-gray-600">
// //           Logged in at: {new Date(session!.loggedInAt).toLocaleString()}
// //         </p>
// //         bu
// //       </div>
// //       <button  onClick={handleLogout}>
// //         log out
// //       </button>
// //     </div>
// //   );
// // }
// "use client";

// export default function ProfilePage() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

//         {/* LEFT SIDEBAR */}
//         <div className="space-y-4">

//           {/* User card */}
//           <div className="border rounded-md p-4 bg-gray-50">
//             <p className="font-semibold text-gray-700">Rudeus 69</p>
//             <p className="text-sm text-gray-500">
//               rudeusgamer69@gmail.com
//             </p>
//             {/* <button className="text-xs text-red-500 mt-2">
//               Get Membership Now
//             </button> */}
//           </div>

//           {/* Menu */}
//           <div className="border rounded-md divide-y">
//             <div className="p-4 text-sm flex justify-between">
//               <span>Orders</span>
//               <span className="text-xs text-gray-400">
//                 (Track your order here)
//               </span>
//             </div>
            
//             <div className="p-4 text-sm text-teal-700 font-medium">
//               Profile
//             </div>

//              <div className="p-4 text-sm">FAQs</div>
//           </div>



//           {/* Buttons */}
//           <div className="space-y-3">
//             <button className="w-full border border-red-500 text-red-500 py-2 text-sm font-medium rounded">
//               DELETE MY ACCOUNT
//             </button>

//             <button className="w-full border border-red-500 text-red-500 py-2 text-sm font-medium rounded">
//               LOGOUT
//             </button>
//           </div>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="border rounded-md">

//           <div className="border-b px-6 py-4">
//             <h2 className="text-sm font-medium text-gray-600">
//               EDIT PROFILE
//             </h2>
//           </div>

//           <div className="p-6 space-y-8">

//             {/* Email */}
//             <div>
//               <label className="block text-sm mb-2">Email Id</label>
//               <input
//                 disabled
//                 value="rudeusgamer69@gmail.com"
//                 className="w-full max-w-md bg-gray-100 border rounded-md px-4 py-2 text-sm"
//               />
//             </div>

//             <div className="border-t pt-6">

//               <h3 className="text-sm font-medium text-gray-600 mb-6">
//                 General Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                 {/* First name */}
//                 <div>
//                   <label className="block text-sm mb-2">
//                     First Name *
//                   </label>
//                   <input
//                     defaultValue="Rudeus"
//                     className="w-full border rounded-md px-4 py-2 text-sm"
//                   />
//                 </div>

//                 {/* DOB */}
//                 <div>
//                   <label className="block text-sm mb-2">
//                     Date of Birth
//                   </label>
//                   <input
//                     placeholder="Please enter your birthdate"
//                     className="w-full border rounded-md px-4 py-2 text-sm"
//                   />
//                 </div>

//                 {/* Last name */}
//                 <div>
//                   <label className="block text-sm mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     defaultValue="69"
//                     className="w-full border rounded-md px-4 py-2 text-sm"
//                   />
//                 </div>

//                 {/* Mobile */}
//                 <div>
//                   <label className="block text-sm mb-2">
//                     Mobile Number *
//                   </label>
//                   <input
//                     placeholder="Mobile Number"
//                     className="w-full border rounded-md px-4 py-2 text-sm"
//                   />
//                 </div>

//                 {/* Gender */}
//                 <div className="md:col-span-1">
//                   <label className="block text-sm mb-2">
//                     Gender
//                   </label>

//                   <div className="flex items-center gap-6 text-sm">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="gender"
//                         defaultChecked
//                         className="accent-red-500"
//                       />
//                       Male
//                     </label>

//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="gender"
//                         className="accent-red-500"
//                       />
//                       Female
//                     </label>

//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="gender"
//                         className="accent-red-500"
//                       />
//                       Other
//                     </label>
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="md:col-span-1">
//                   <div className="flex justify-between mb-2">
//                     <label className="text-sm">Default Address</label>
//                     <button className="text-sm text-gray-600 underline">
//                       Change/Edit
//                     </button>
//                   </div>

//                   <textarea
//                     disabled
//                     className="w-full h-[110px] bg-gray-100 border rounded-md px-4 py-2 text-sm resize-none"
//                     placeholder="No Address Selected"
//                   />
//                 </div>
//               </div>

//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LeftMenu from "./LeftMenu";
import Profile from "./Profile";
import Orders from "./Order";
import Faqs from "./FAQ";

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

type Session = {
  userId: string;
  loggedInAt: number;
};

type Tab = "profile" | "orders" | "faqs";

function getUsers(): User[] {
  const raw = localStorage.getItem("users");
  return raw ? JSON.parse(raw) : [];
}

function getSession(): Session | null {
  const raw = localStorage.getItem("session");
  return raw ? JSON.parse(raw) : null;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    const users = getUsers();
    const found = users.find((u) => u.id === session.userId);

    if (!found) {
      localStorage.removeItem("session");
      router.replace("/login");
      return;
    }

    setUser(found);
    setLoading(false);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("session");
    router.replace("/login");
  }

  if (loading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* mobile top bar */}
      <div className="lg:hidden mb-4 flex items-center justify-between border rounded-md px-4 py-3">
        <span className="text-sm font-medium capitalize">
          {activeTab}
        </span>

        <button
          onClick={() => setMobileOpen(true)}
          className="text-sm border px-3 py-1 rounded"
        >
          Menu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        <LeftMenu
          user={user}
          activeTab={activeTab}
          onChange={setActiveTab}
          onLogout={handleLogout}
          mobileOpen={mobileOpen}
          closeMobile={() => setMobileOpen(false)}
        />

        {/* RIGHT SIDE */}
        <div>
          {activeTab === "profile" && (
            <Profile
              user={user}
              onUserUpdate={setUser}
            />
          )}

          {activeTab === "orders" && <Orders />}

          {activeTab === "faqs" && <Faqs />}
        </div>

      </div>
    </div>
  );
}
