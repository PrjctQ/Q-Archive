"use client"

const articles = [
  { name: "Understanding Astro.js", date: "11/11/23" },
  { name: "Deep Dive into Supabase Authentication", date: "01/14/24" },
  { name: "Minimalist UI Design with Tailwind", date: "05/05/24" },
  { name: "Building Q-Archive Project", date: "07/21/24" },
  { name: "Deploying Projects Seamlessly", date: "11/02/25" },
];

const List = () => {
  return (
    <div className="font-inter group">
      {articles.map((article, index) => (
        <div
          key={index}
          className="
            flex items-center py-2 cursor-pointer 
            transition-opacity duration-300 ease-in-out
            group-hover:opacity-50 hover:!opacity-100
          "
        >
          {/* Left text */}
          <span className="pr-2">{article.name}</span>

          {/* Flexible line that fills space */}
          <span className="flex-1 border-t border-stone-600 mx-2"></span>

          {/* Date */}
          <span className="text-stone-500">{article.date}</span>
        </div>
      ))}
    </div>
  );
};

export default List;
