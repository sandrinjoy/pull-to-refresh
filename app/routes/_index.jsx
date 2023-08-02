import PullToRefresh from "../components/pull-to-refresh";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen dark:text-neutral-50 text-2xl bg-neutral-50 dark:bg-neutral-800">
      Pull to Refresh
      <PullToRefresh />
    </div>
  );
}
