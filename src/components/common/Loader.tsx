
const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="w-20 h-20 border-4 border-transparent text-blue-400 animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 animate-spin border-t-red-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
