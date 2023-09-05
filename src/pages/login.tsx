import BlankLayout from "src/shared/layouts/BlankLayout";
import LoginModule from "src/shared/modules/auth/Login"

const Login = () => {
    return ( <LoginModule />);
}
Login.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Login;