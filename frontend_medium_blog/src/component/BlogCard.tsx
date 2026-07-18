import { Link } from "react-router-dom";

type BlogCardProps = {
    id : string
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
};

export function BlogCard({
    id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="flex justify-center px-3 cursor-pointer">
        {/* need some work regarding responsiveness od width */}
      <div className="border-b border-slate-300 p-3 w-full  md:max-w-[712px]"> 
        <div className="flex gap-2">
          <Avatar avatarName={authorName} />
          <div className="flex gap-2 justify-center items-center">
            {authorName}
            <Circle />
            {publishedDate}
          </div>
        </div>

        <div className="font-bold text-xl mt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-400 font-light text-xs bg-slate-200 rounded-full w-fit p-1 mt-4">{`${Math.floor(content.length / 100)} min read`}</div>
      </div>
    </div>
    </Link>
  );
}

export function Avatar({ size = "small" ,avatarName }: { avatarName: string, size?: "small" | "big"  }) {
  return (
    <div className={`bg-slate-300 relative inline-flex items-center justify-center overflow-hidden bg-neutral-tertiary rounded-full ${size === "small" ? "w-6 h-6" : "w-9 h-9"}`}>
      <span className={`${size === "small" ? "font-normal" : "font-medium"} text-body`}>
        {avatarName[0].toUpperCase()}
      </span>
    </div>
  );
}

function Circle() {
  return <div className="bg-slate-500 rounded-full w-1 h-1 mt-1"></div>;
}
