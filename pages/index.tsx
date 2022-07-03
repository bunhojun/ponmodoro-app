import HomePage from "../src/pages/home/home";
import { AuthedPage } from "../src/components/authed-page/authed-page";

const Index = () => {
  return (
    <AuthedPage>
      <HomePage />
    </AuthedPage>
  );
};

export default Index;
