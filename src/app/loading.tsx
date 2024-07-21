export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="h-20 w-20 animate-spin rounded-full border border-dashed border-green-500 border-t-transparent"></div>
    </div>
  );
}
