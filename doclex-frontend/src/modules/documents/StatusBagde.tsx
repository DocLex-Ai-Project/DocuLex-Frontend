const statusStyles: any = {
  DRAFT: "bg-gray-200 text-gray-700",
  AI_PROCESSING: "bg-yellow-100 text-yellow-700",
  AI_REVIEWED: "bg-blue-100 text-blue-700",
  REVIEW_REQUESTED: "bg-purple-100 text-purple-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-md font-medium ${statusStyles[status] || "bg-gray-100"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;