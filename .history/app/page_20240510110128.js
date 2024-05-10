import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-screen flex flex-row">
        <div className="flex-1 bg-left"></div>
        <div className="flex-1"></div>
      </div>
    </main>
  );
}
