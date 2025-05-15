import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { FaArrowRight } from "react-icons/fa";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const LoginPage = () => {
const navigate = useNavigate();
const {login, isLoading} = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    login(data)
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <p>Please enter your credentials to log in.</p>

      <form className="log-in__form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="identifier"
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          required
          error={errors.email?.message}
          {...register("identifier", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          })}
        />

        <FormInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <div className="log-in_actions">
          <Button
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
            icon={<FaArrowRight />}
            iconPosition="right"
          >
            Continue
          </Button>
        </div>
      </form>

      <Button onClick={() => navigate('/onboarding')} icon={<FaArrowRight />} iconPosition="right">
        Click here to Sign Up
      </Button>
    </div>
  );
};

export default LoginPage;
