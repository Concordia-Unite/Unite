/**
 * stepper.ts
 * Ian Kollipara
 * 2022.10.23
 *
 * Stepper Data Hook
 */

import { useState } from "react";

export const useStepper = (steps: number) => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () =>
    setActiveStep((current) => (current < steps ? current + 1 : current));
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));

  return { activeStep, setActiveStep, nextStep, prevStep };
};
