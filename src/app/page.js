import Image from "next/image";
import Navbar from "./components/Navbar";
import ContentsHome from "./contents/ContentsHome";

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full flex-grow pt-20">
        <ContentsHome />
      </main>

      {/* Footer */}
      <footer className="w-full bg-white text-center py-4">
        <p className="text-gray-600 text-sm">
          Made with ❤️ just for you.
        </p>
      </footer>
    </div>
  );
}
