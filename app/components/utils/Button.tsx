"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    icon?: IconType;
    children?: ReactNode;
    href?: string;
}

export default function Button({ onClick, className = '', icon: Icon, children, href}: ButtonProps) {
    const classStyle = `btn ${className}`;
    const iconClasStyle = "mr-1 inline";
    const scale = 0.85;
    const link = <motion.a
        href={href}
        onClick={onClick}
        whileTap={{scale}}
        className={classStyle}
    >
        {Icon && <Icon className={iconClasStyle}/>}
        {children}
    </motion.a>

    const button = <motion.button
        onClick={onClick}
        whileTap={{scale}}
        className={classStyle}
    >
        {Icon && <Icon className={iconClasStyle}/>}
        {children}
    </motion.button>

    return (href ? link : button);
};
