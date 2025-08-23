
const Loading = () => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-dark-1 `}
    >
      {/* اسپینر انیمیشنی */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 border-r-primary-500 border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary-500 border-l-primary-500 animate-spin-reverse"></div>
      </div>

      {/* متن لودینگ با انیمیشن پالس */}
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>        
        <h2 className="text-xl font-semibold text-white">در حال بارگذاری</h2>
      </div>

      {/* پیشرفت بارگذاری */}
      <div className="w-64 h-1.5 bg-dark-3 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-primary-500 rounded-full animate-progress"></div>
      </div>
    </div>
  );
};

export default Loading;
