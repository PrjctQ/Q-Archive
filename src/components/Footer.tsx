import { GithubIcon, PlayIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-toggle";
import LoginModal from "./LoginModal"; // import the shadcn login modal

export default function Footer() {
  return (
    <footer className="flex shrink-0 items-center w-full mx-auto flex-row justify-between gap-2 py-2 md:py-4 border-t">
      <Link
        target="_blank"
        href="https://github.com/prjctq"
        className="font-bold"
        prefetch={false}
      >
        Q-Archive | ProjectQ
      </Link>

      <div className="flex items-center justify-end gap-4">
        <Link
          href="#"
          className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-stone-700 hover:scale-125 hover:rotate-12 transition-transform p-2"
          prefetch={false}
        >
          <span className="sr-only">Twitter</span>
          <TwitterIcon className="w-4 h-4" />
        </Link>

        <Link
          target="_blank"
          href="https://github.com/prjctq#"
          className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-stone-700 hover:scale-125 hover:rotate-12 transition-transform p-2"
          prefetch={false}
        >
          <span className="sr-only">GitHub</span>
          <GithubIcon className="w-4 h-4" />
        </Link>

        <Link
          href="#"
          className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-stone-700 hover:scale-125 hover:rotate-12 transition-transform p-2"
          prefetch={false}
        >
          <span className="sr-only">YouTube</span>
          <PlayIcon className="w-4 h-4" />
        </Link>

        <ModeToggle />

        {/* LogsIcon now opens the LoginModal */}
        <LoginModal />
      </div>
    </footer>
  );
}