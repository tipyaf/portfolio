"use client";

import {useEffect, useState} from "react";
import css from "./NavBar.module.css"
import {FiDownloadCloud} from "react-icons/fi";
import Button from "@/app/components/utils/Button";

export default function NavBar() {

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY >= 90);
        });
    });

    let buttonClass = "btn-outline-primary";
    if (scroll) {
        buttonClass = "btn-outline-white";
    }

    return (
        <header className={`${css.navBar} ${scroll ? css.scrolled : css.initial} p-3`}>
            <nav className="flex align-center justify-end">
                <Button className={buttonClass} icon={FiDownloadCloud}>Check out my resume</Button>
            </nav>
        </header>
    )
}
