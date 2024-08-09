"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    icon?: IconType;
    children: ReactNode;
}

export default function Button({ onClick, className = '', icon: Icon, children }: ButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.85 }}
            className={`btn ${className}`}
        >
            {Icon && <Icon className="mr-1 inline" />}
            {children}
        </motion.button>
    );
};
