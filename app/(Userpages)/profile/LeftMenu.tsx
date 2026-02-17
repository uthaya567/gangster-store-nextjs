"use client";

type Tab = "profile" | "orders" | "faqs";

type Props = {
  user: {
    Fname: string;
    Lname: string;
    email: string;
  };
  activeTab: Tab;
  onChange(tab: Tab): void;
  onLogout(): void;

  mobileOpen: boolean;
  closeMobile(): void;
};

export default function LeftMenu({
  user,
  activeTab,
  onChange,
  onLogout,
  mobileOpen,
  closeMobile,
}: Props) {
  return (
    <div
      className={`
        fixed inset-0 z-40 bg-black/40
        lg:static lg:bg-transparent
        ${mobileOpen ? "block" : "hidden"}
        lg:block
      `}
      onClick={closeMobile}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute left-0 top-0 h-full w-65 bg-white p-4 overflow-y-auto
                   lg:static lg:h-auto lg:w-auto lg:p-0"
      >
        <div className="space-y-4">

          {/* user card */}
          <div className="border rounded-md p-4 bg-gray-50">
            <p className="font-semibold text-gray-700">
              {user.Fname} {user.Lname}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* menu */}
          <div className="border rounded-md divide-y">

            <button
              className={`w-full p-4 text-sm flex justify-between text-left
                ${activeTab === "orders" ? "text-teal-700 font-medium" : ""}
              `}
              onClick={() => {
                onChange("orders");
                closeMobile();
              }}
            >
              <span>Orders</span>
              <span className="text-xs text-gray-400">
                (Track your order here)
              </span>
            </button>

            <button
              className={`w-full p-4 text-sm text-left
                ${activeTab === "profile" ? "text-teal-700 font-medium" : ""}
              `}
              onClick={() => {
                onChange("profile");
                closeMobile();
              }}
            >
              Profile
            </button>

            <button
              className={`w-full p-4 text-sm text-left
                ${activeTab === "faqs" ? "text-teal-700 font-medium" : ""}
              `}
              onClick={() => {
                onChange("faqs");
                closeMobile();
              }}
            >
              FAQs
            </button>
          </div>

          {/* buttons */}
          <div className="space-y-3">
            <button
              className="w-full border border-red-500 text-red-500 py-2 text-sm font-medium rounded"
              onClick={() => alert("Demo only")}
            >
              DELETE MY ACCOUNT
            </button>

            <button
              onClick={onLogout}
              className="w-full border border-red-500 text-red-500 py-2 text-sm font-medium rounded"
            >
              LOGOUT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
