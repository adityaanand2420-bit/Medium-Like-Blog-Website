
import { AppBar } from "../component/AppBar";
import { BlogCard } from "../component/BlogCard";
import { useBlogs, type blog } from "../hooks/UseBlogs";

export function AllBlogs() {
  const { isLoading, blogs }: { isLoading: boolean; blogs: blog[] } =
    useBlogs();

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <AppBar />
      {blogs.map((item) => {
        return (
          <BlogCard
            id={item.id}
            authorName={item.author.name || "N"}
            title={item.title}
            content={item.content}
            publishedDate="April 2, 2026"
          ></BlogCard>
        );
      })}
    </div>
  );
}
