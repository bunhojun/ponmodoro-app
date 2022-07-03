import PonmodoroProvider from "../../src/providers/ponmodoro/PonmodoroProvider";
import PonmodoroPage from "../../src/pages/ponmodoro/ponmodoro";
import { useRouter } from "next/router";
import { AuthedPage } from "../../src/components/authed-page/authed-page";

const Ponmodoro = () => {
  const router = useRouter();
  const { todoId } = router.query;
  return (
    <AuthedPage>
      <PonmodoroProvider>
        <PonmodoroPage todoId={todoId as string} />
      </PonmodoroProvider>
    </AuthedPage>
  );
};

export default Ponmodoro;
