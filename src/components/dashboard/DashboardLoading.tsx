export const DashboardLoading = () => {
  return (
    <div className="w-full rounded-lg border border-gray-300 bg-white p-4">

 
      <div className="space-y-2"> Loading dashboard data...
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="h-9 animate-pulse rounded bg-gray-100" />
        ))}
      </div>
    </div>
  );
};