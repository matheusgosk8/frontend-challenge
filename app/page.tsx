import Hello from "@/components/Hello";
import ToastProvider from "@/Providers/ReactTostifyProvider";

export default function Home() {
  return (
    <main className="">
      <ToastProvider>
        <Hello />
      </ToastProvider>

    </main>
  );
}
