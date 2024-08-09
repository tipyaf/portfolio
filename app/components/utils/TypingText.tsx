import {useEffect, useState} from "react";
import RedoAnimText from "./RedoAnimText";
import CursorBlinker from "./CursorBlinker";
import {useMotionValue, animate, RepeatType} from "framer-motion";

export interface IAnimTextProps {
    delay: number;
    texts: string[];
    className: string;
    repeat: number;
    repeatType?: RepeatType
}

export default function TypingText({delay, texts, className, repeat, repeatType = "reverse"}: IAnimTextProps) {
    const [_, setDone] = useState(false);
    const baseText = "";
    const count = useMotionValue(0);
    const [textSEO, setTextForSEO] = useState('');

    useEffect(() => {
        setTextForSEO(texts.join());
    }, [texts]);

    useEffect(() => {
        if (baseText.length === 0) return;

        const controls = animate(count, baseText.length, {
            type: "tween",
            delay: delay,
            duration: 1,
            ease: "easeInOut",
            onComplete: () => {
                setDone(true);
            }
        });

        return () => {
            controls.stop();
        };
    }, [baseText, count, delay]);

    return (
        <div>
            <span className={className}>
            {/* Hidden text for SEO */}
                <span className="sr-only">{textSEO}</span> {/* Use sr-only for accessibility */}
                {/* Animation component */}
                <RedoAnimText repeat={repeat} repeatType={repeatType} delay={delay + 1} texts={texts}/>
            <CursorBlinker />
        </span>
        </div>
    );
}
