import React from "react";
import { FaCheck } from "react-icons/fa";

interface SuccessMessageProps {
  message: string;
  subMessage?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  subMessage,
}) => (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="text-green-600 mb-2">
      <FaCheck className="h-12 w-12" />
    </div>
    <div className="text-lg font-semibold text-green-700 mb-2">{message}</div>
    {subMessage && <div className="text-gray-500 text-sm">{subMessage}</div>}
  </div>
);

export default SuccessMessage;