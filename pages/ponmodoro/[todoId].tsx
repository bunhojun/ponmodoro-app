import PonmodoroProvider from "../../src/providers/ponmodoro/PonmodoroProvider";
import PonmodoroPage from "../../src/pages/ponmodoro/ponmodoro";
import { useRouter } from "next/router";

const Ponmodoro = () => {
  const router = useRouter();
  const { todoId } = router.query;
  return (
    <PonmodoroProvider>
      <PonmodoroPage todoId={todoId as string} />
    </PonmodoroProvider>
  );
};

export default Ponmodoro;
