import Image from "next/image";
import variables from "./page.module.scss";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className={variables.title}>Hello</h1>
      </main>
    </div>
  );
}
