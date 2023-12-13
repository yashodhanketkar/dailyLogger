import { QueryContextWrapper } from "./contexts/query";
import { Layout } from "./view";

const App = () => {
  return (
    <QueryContextWrapper>
      <Layout />
    </QueryContextWrapper>
  );
};

export default App;
