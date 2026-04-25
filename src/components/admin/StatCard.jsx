export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  bg,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-5 sm:p-6 lg:p-7 h-full">

      <div className="flex items-start justify-between gap-4">

        {/* Left Content */}
        <div className="flex-1 min-w-0">

          <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-snug">
            {title}
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 break-words">
            {value}
          </h2>

          <p className="mt-3 text-xs sm:text-sm lg:text-base text-gray-400 leading-snug">
            {subtitle}
          </p>

        </div>

        {/* Icon */}
        <div
          className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-lg sm:text-xl ${bg} ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}