export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        404
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        Page not found
      </p>

      <a
        href="/"
        className="px-5 py-2 rounded bg-red-500 text-white text-sm font-medium"
      >
        Go to Home
      </a>
    </div>
  );
}
