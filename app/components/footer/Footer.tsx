export default function MainFooter() {
  return (
    <>
      <div>
        <div className="flex justify-center bg-red-500 py-3 lg:text-2xl text-lg"><span className="border-b-4 text-white border-white font-medium">HOMEGROWN INDIAN BRAND</span></div>
        <div className="flex justify-center py-3 lg:text-3xl text-xl text-gray-800"><span className="border-b-4 border-white font-medium">Over 6 Million Happy Customers</span></div>
        <div className="text-[12px] bg-gray-200 py-5">
          <div className="footer grid grid-cols-4 ">
            <div>
              <p className="text-xs lg:text-sm md:text-sm text-red-500 font-medium py-1">NEED HELP</p>
              <ul className="text-[8px] sm:text-sm md:text-sm lg:text-sm">
                <li>Contact Us</li>
                <li>Track Order</li>
                <li>Returns & Refunds</li>
                <li>FAQs</li>
                <li>My Account</li>
              </ul>
            </div>
            <div>
              <p className="text-xs lg:text-sm md:text-sm text-red-500 font-medium py-1">COMPANY</p>
              <ul className="text-[8px] sm:text-sm md:text-sm lg:text-sm">
                <li>About Us</li>
                <li>Investor Relation</li>
                <li>Returns & Refunds</li>
                <li>FAQs</li>
                <li>My Account</li>
              </ul>
            </div>
            <div>
              <p className="text-xs lg:text-sm md:text-sm text-red-500 font-medium py-1">MORE INFO</p>
              <ul className="text-[8px] sm:text-sm md:text-sm lg:text-sm">
                <li>Privacy Policy</li>
                <li>Sitemap</li>
                <li>Get Notified</li>
                <li>Blogs</li>
              </ul>
            </div>
            <div>
              <p className="text-xs lg:text-sm md:text-sm text-red-500 font-medium py-1">STORE NEAR ME</p>
              <ul className="text-[8px] sm:text-sm md:text-sm lg:text-sm">
                <li>Mumbai</li>
                <li>Pune</li>
                <li>Bangalore</li>
                <li>Hubbali</li>
                <li>View More</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
