import ForgotPasswordModule from "@/modules/auth/ForgotPassword";
import BlankLayout from "src/shared/layouts/BlankLayout";

const ForgotPassword = () => {
    return ( <ForgotPasswordModule />);
}
ForgotPassword.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default ForgotPassword;