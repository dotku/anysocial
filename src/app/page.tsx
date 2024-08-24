import { VideoChat } from "@/components";
import { Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="App">
        <h1>Social Web</h1>
        <Spinner />
        <Button color="primary">Hello</Button>
      </div>
    </main>
  );
}
