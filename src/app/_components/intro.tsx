import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

export function Intro() {
  return (
    <section className="flex flex-row items-center justify-between mt-8 mb-8">
      <h3 className="text-2xl md:text-2xl tracking-tighter leading-tight md:pr-8 font-normal">
        <Link href="/" className="hover:underline">
         K o t o
        </Link>
      </h3>
      
      {/* Desktop Navigation */}
      <h4 className="hidden md:flex text-right text-sm font-normal tracking-widest">
        <span className="mx-3"/>
        <Link href="/about" className="hover:underline">
          ABOUT
        </Link>
        <span className="mx-3"/>
        <Link href="/work" className="hover:underline">
          WORK
        </Link>
        <span className="mx-3"/>
        <Link href="/dashboard" className="hover:underline flex items-center -translate-y-0.42">
        PORTAL
        </Link>
      </h4>
      {/* Mobile Menu */}
      <MobileMenu />
    </section>
  );
}
