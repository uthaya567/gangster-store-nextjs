import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
 
export default function Defaultlayout() {
     const path = usePathname()
  return (
     <div className={`min-h-[70vh] flex items-center justify-center px-2`}>
      <div className="max-w-md w-full text-center p-8">

        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full border border-green-500 bg-teal-50 flex items-center justify-center">
            <FaHeart className="text-green-300 " size={50}/>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-gray-800">
          Your {path == "/mycart"?"Shopping Card" :path.split("/")} is empty
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Save your favourite products here and move them to cart anytime.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center mt-6">
          <Link href="/">
            <button className="px-5 py-2.5 border border-teal-600 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-50 transition">
              Continue shopping
            </button>
          </Link>

          <Link href={`/login?redirect=${encodeURIComponent(path)}`}>
            <button className="px-5 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition">
              Login
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
