import Link from "next/link";

const Navbar = async () => {
  return (
    <section className="flex mx-auto w-full pt-10">
      {/* text */}
      <div className="space-y-5 ">
        <h1 className="font-bold">Q-Archive</h1>
        <h2 className="">An Archive of ProjectQ's Journey.</h2>
        <p>
          Q-Archive is a minimal, distraction-free space built to preserve and
          document the evolution of ProjectQ. Every entry is designed to place
          the writing itself at the forefront.
        </p>
        <p>
          The archive emphasizes clarity and simplicity, making it easy to read,
          explore, and reflect on past work without unnecessary noise.
        </p>
        <p>
          Browse the posts to dive deeper into the journey, and visit the{" "}
          <Link
            target="_blank"
            href="https://github.com/prjctq"
            className="underline hover:text-stone-400"
          >
            GitHub repository
          </Link>{" "}
          to view the source code.
        </p>
      </div>
    </section>
  );
};

export default Navbar;
