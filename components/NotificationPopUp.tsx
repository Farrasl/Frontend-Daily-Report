import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X
} from "lucide-react";

interface NotificationPopupProps {
  message: string;
  onClose: () => void;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  onClose,
  type = "success",
  duration = 5000,
}) => {
  // Configuration for different notification types
  const notificationConfig = {
    success: {
      icon: <CheckCircle2 className="w-6 h-6 text-white" />,
      bgColor: "bg-emerald-500",
      borderColor: "border-emerald-600",
    },
    error: {
      icon: <XCircle className="w-6 h-6 text-white" />,
      bgColor: "bg-red-500",
      borderColor: "border-red-600",
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      bgColor: "bg-amber-500",
      borderColor: "border-amber-600",
    },
    info: {
      icon: <Info className="w-6 h-6 text-white" />,
      bgColor: "bg-blue-500", 
      borderColor: "border-blue-600",
    }
  };

  const config = notificationConfig[type];

  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className={`
        fixed top-4 right-4 z-[9999] 
        ${config.bgColor} ${config.borderColor}
        border-l-4 rounded-lg shadow-2xl 
        overflow-hidden
      `}
    >
      <div className="flex items-center p-4 space-x-3 max-w-md">
        {/* Icon */}
        <div className="flex-shrink-0">
          {config.icon}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <motion.div 
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ 
            duration: duration / 1000, 
            ease: "linear" 
          }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 origin-left"
        />
      </div>
    </motion.div>
  );
};

export default NotificationPopup;