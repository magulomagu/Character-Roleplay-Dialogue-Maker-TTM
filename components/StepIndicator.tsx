
import React from 'react';
import { GenerationStep } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface StepIndicatorProps {
  currentStep: GenerationStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  if (currentStep === GenerationStep.IDLE || currentStep === GenerationStep.DONE || currentStep === GenerationStep.ANALYZING) return null;

  const stepMessages: Record<GenerationStep.GENERATING_STYLELESS | GenerationStep.APPLYING_STYLE, string> = {
    [GenerationStep.GENERATING_STYLELESS]: 'ステップ1: 応答内容を生成中...',
    [GenerationStep.APPLYING_STYLE]: 'ステップ2: 話し方を適用中...',
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400 p-2 bg-gray-800 rounded-md">
      <LoadingSpinner size="sm" />
      <span>{stepMessages[currentStep as GenerationStep.GENERATING_STYLELESS | GenerationStep.APPLYING_STYLE]}</span>
    </div>
  );
};

export default StepIndicator;
