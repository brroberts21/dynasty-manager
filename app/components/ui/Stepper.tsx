import React from "react";

interface StepperProps {
  labels: string[];
  currentStep: number; // 1-based index
}

const Stepper = ({ labels, currentStep }: StepperProps) => {
  return (
    <ul className="steps w-full mb-8">
      {labels.map((label, idx) => {
        let stepClass = "step";
        if (idx + 1 < currentStep) stepClass += " step-primary"; // completed
        else if (idx + 1 === currentStep) stepClass += " step-primary"; // current
        // else default (upcoming)
        return (
          <li className={stepClass} key={label}>
            {label}
          </li>
        );
      })}
    </ul>
  );
};

export default Stepper;
