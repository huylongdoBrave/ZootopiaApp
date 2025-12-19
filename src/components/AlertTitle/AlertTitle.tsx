import React, { useEffect } from "react";

export type AlertType = "success" | "error" | "warning";

interface AlertTitleProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  type: AlertType;
  duration?: number; // Thời gian hiển thị (ms), mặc định là 5000ms
}

const alertConfig = {
  success: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    bgClass: "bg-green-50 text-green-800",
  },
  error: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    bgClass: "bg-red-50 text-red-800",
  },
  warning: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    bgClass: "bg-yellow-50 text-yellow-800",
  },
};

const AlertTitle: React.FC<AlertTitleProps> = ({
  isOpen,
  onClose,
  title,
  description,
  type,
  duration = 2000,
}) => {
    
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);


  if (!isOpen) {
    return null;
  }

  const config = alertConfig[type];

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-2000 w-full max-w-md transition-all duration-300
                  ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
    >
      <div
        className={`flex items-center w-full p-4 rounded-lg shadow-lg ${config.bgClass}`}
        role="alert"
      >
        <div className="shrink-0">
          {config.icon}
        </div>
        <div className="ml-3 text-sm font-medium text-left">
          <p className="font-bold">{title}</p>
          {description && <p className="mt-1">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 bg-transparent rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8"
          aria-label="Đóng"
        >
          <span className="sr-only">Đóng</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlertTitle;
