import BlankLayout from "src/shared/layouts/BlankLayout";
import ForgotPasswordModule from "src/shared/modules/auth/ForgotPassword";

const ForgotPassword = () => {
    return ( <ForgotPasswordModule />);
}
ForgotPassword.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default ForgotPassword;