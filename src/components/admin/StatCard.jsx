export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  bg,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl p-8 border shadow-sm">
      
      <div className="flex justify-between items-start">

        {/* Left Side */}
        <div>
          <p className="text-gray-500 text-lg">
            {title}
          </p>

          <h2 className="text-5xl font-bold mt-5">
            {value}
          </h2>

          <p className="text-gray-400 mt-3">
            {subtitle}
          </p>
        </div>

        {/* Right Icon */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${bg} ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}