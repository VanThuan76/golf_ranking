import BlankLayout from "src/shared/layouts/BlankLayout";
import RegisterModule from "src/shared/modules/auth/Register";

const Register = () => {
    return ( <RegisterModule />);
}
Register.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Register;