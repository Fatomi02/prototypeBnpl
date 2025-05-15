import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaUser, FaIdCard, FaUniversity } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";
import Button from "../../components/Button/Button";
import "./OnboardingPage.css";

// Step components
import PersonalInfoStep from "./steps/PersonalInfoStep";
import BankDetailsStep from "./steps/BankDetailsStep";
import IdentityVerificationStep from "./steps/IdentityVerificationStep";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const {
    onboardingStep,
    updateOnboardingStep,
    register,
  } = useUserStore();
  const [formData, setFormData] = useState({});

  const steps = [
    {
      id: 1,
      name: "Personal Info",
      path: "/onboarding/personal-info",
      icon: <FaUser />,
    },
    {
      id: 2,
      name: "Bank Details",
      path: "/onboarding/bank-details",
      icon: <FaUniversity />,
    },
    {
      id: 3,
      name: "Identity Verification",
      path: "/onboarding/identity-verification",
      icon: <FaIdCard />,
    },
    {
      id: 4,
      name: "Success",
      path: "/onboarding/success",
      icon: null,
    },
  ];

  const handleNext = async (data) => {
   setFormData(prev => ({ ...prev, ...data }))

    const nextStep = onboardingStep + 1;
    updateOnboardingStep(nextStep);
    if (nextStep <= 3) {
      const nextPath = steps.find((step) => step.id === nextStep)?.path;
      if (nextPath) {
        navigate(nextPath);
      }
    } else {
      register({ ...formData, ...data });
    }
  };

  const handleBack = () => {
    const prevStep = onboardingStep - 1;
    if (prevStep >= 1) {
      updateOnboardingStep(prevStep);

      const prevPath = steps.find((step) => step.id === prevStep)?.path;
      if (prevPath) {
        navigate(prevPath);
      }
    } else {
      navigate("/");
    }
  };


  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-page__sidebar">
        <div className="onboarding-page__logo" onClick={() => navigate("/")}>
          BNPL App
        </div>

        <div className="onboarding-page__steps">
          {steps
            .filter((step) => step.id < 4)
            .map((step) => (
              <div
                key={step.id}
                className={`onboarding-page__step ${
                  onboardingStep >= step.id
                    ? "onboarding-page__step--active"
                    : ""
                }`}
              >
                <div className="onboarding-page__step-indicator">
                  <div className="onboarding-page__step-icon">{step.icon}</div>
                  <div className="onboarding-page__step-connector" />
                </div>
                <div className="onboarding-page__step-content">
                  <div className="onboarding-page__step-name">{step.name}</div>
                </div>
              </div>
            ))}
        </div>

        <div className="onboarding-page__help">
          <h3>Need Help?</h3>
          <p>
            Contact our support team at{" "}
            <a href="mailto:support@bnplapp.com">support@bnplapp.com</a>
          </p>
        </div>
      </div>

      <div className="onboarding-page__content">
        <div className="onboarding-page__header">
          <Button
            variant="primary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={handleBack}
          >
            Back
          </Button>

          <div className="onboarding-page__progress">
            Step {Math.min(onboardingStep, 3)} of 3
          </div>
        </div>

        <div className="onboarding-page__main">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/onboarding/personal-info" replace />}
              />
              <Route
                path="/personal-info"
                element={
                  <motion.div
                    key="personal-info"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <PersonalInfoStep onNext={handleNext} />
                  </motion.div>
                }
              />
              <Route
                path="/bank-details"
                element={
                  <motion.div
                    key="bank-details"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <BankDetailsStep onNext={handleNext} />
                  </motion.div>
                }
              />
              <Route
                path="/identity-verification"
                element={
                  <motion.div
                    key="identity-verification"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <IdentityVerificationStep onNext={handleNext} />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>

        <div className="onboarding-page__footer">
          <p>
            © 2025 BNPL App. By continuing, you agree to our{" "}
            <a href="#">Terms & Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
