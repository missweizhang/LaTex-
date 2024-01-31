import Image from "next/image";
import OverleafForm from "./overleaf";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-20 lg:px-24 max-w-[1200px] lg:mx-auto flex flex-col items-center justify-center ">
      <h1 className="mb-2 md:mb-8 font-bold text-3xl md:text-4xl ">
        LaTex 生字注音
      </h1>
      <OverleafForm />
    </main>
  );
}
