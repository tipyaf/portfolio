'use client';

import { IButton } from '@/types/client/button.model';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

interface ButtonProps extends IButton {
  children: ReactNode;
  href?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  download?: boolean;
}

// todo: download directly
// const downloadPDF = (url: string, filename: string) => {
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = filename;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const handleDownload = () => {
//   // setLoading(true);
//   fetch('https://sample/api', {
//     responseType: 'blob',
//   })
//     .then((response) => {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       console.log(url);
//       var blob = new Blob([response.data], {
//         type: 'text/plain;charset=utf-8',
//       });
//       saveAs(blob, `${response.fileName}.pdf`);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.log(err);
//       setLoading(false);
//     });
// };

export default function Button({
  onClick,
  className = '',
  icon: Icon,
  children,
  href = '',
  target,
  download = false,
}: ButtonProps) {
  const classStyle = `btn ${className}`;
  const iconClasStyle = 'mr-2 inline';
  const scale = 0.85;
  const MotionLink = motion(Link);
  // const resumeClick = (e) => {
  //   e.preventDefault();
  //   console.log('passe');
  //   // Use an absolute path from the root
  //   downloadPDF(href, 'toto.pdf');
  // };
  const link = download ? (
    <motion.a whileTap={{ scale }} className={className}>
      {Icon && <Icon className={iconClasStyle} />}
      {children}
    </motion.a>
  ) : (
    <MotionLink href={href} whileTap={{ scale }} className={className} target={target}>
      {Icon && <Icon className={iconClasStyle} />}
      {children}
    </MotionLink>
  );

  const button = (
    <motion.button onClick={onClick} whileTap={{ scale }} className={classStyle}>
      {Icon && <Icon className={iconClasStyle} />}
      {children}
    </motion.button>
  );

  return href ? link : button;
}
