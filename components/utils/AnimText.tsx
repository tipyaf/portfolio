import { motion } from 'framer-motion';

export interface AnimTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export default function AnimText({ text, className = '', duration = 0.25 }: AnimTextProps) {
  const characters = text.split('').map((char, i) => ({
    char,
    key: i,
  }));

  return (
    <span className={className}>
      {/* For SEO */}
      <span className="sr-only">{text}</span>

      {characters.map(({ char, key }, i) => (
        <motion.span
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration,
            delay: i * (duration / 100),
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
