import { lessons, dictionary } from "@acento/content";
import { AcentoDashboard } from "./product";

export default function Page() {
  return <AcentoDashboard lessons={lessons} dictionary={dictionary} />;
}
