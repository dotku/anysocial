import PostCreatInput from "./PostCreateInput";
import PostList from "./PostList";

export default function PostScreen() {
  return (
    <div className="max-w-3xl mx-auto">
      <div>
        <PostCreatInput />
      </div>
      <PostList />
    </div>
  );
}
