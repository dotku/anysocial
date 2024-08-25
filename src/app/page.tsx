import { VideoChat } from "@/components";
import { Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import PostScreen from "@/components/Posts/PostsScreen";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      <div className="App w-full">
        <PostScreen />
      </div>
    </main>
  );
}
