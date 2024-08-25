import { AnimatePresence, motion } from 'framer-motion';
import { useScrollLock } from 'usehooks-ts';

export interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  useScrollLock({ lockTarget: 'body' });
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-7 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
