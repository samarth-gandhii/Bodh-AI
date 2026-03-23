"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, HelpCircle } from "lucide-react";

export interface QuizQuestion {
    question: string;
    options: string[];
    correct_answer: string;
    explanation: string;
}

interface QuizUIProps {
    data: QuizQuestion[] | null;
}

export default function QuizUI({ data }: QuizUIProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Reference to auto-scroll when explanation appears
    const scrollBottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect when an answer is submitted
    useEffect(() => {
        if (isSubmitted) {
            setTimeout(() => {
                scrollBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 50);
        }
    }, [isSubmitted]);

    if (!data || data.length === 0) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-inner border border-gray-200">
                <div className="bg-gray-50 p-6 rounded-full mb-6 relative">
                    <HelpCircle size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 tracking-tight">Interactive Quiz</h3>
                <p className="text-sm mt-3 text-center text-gray-500 max-w-xs leading-relaxed">
                    A quiz payload was provided, but no questions were found. Please check the backend data.
                </p>
            </div>
        );
    }

    const currentQuestion = data[currentIndex];
    const totalQuestions = data.length;

    const handleSelectOption = (option: string) => {
        if (isSubmitted) return;
        setSelectedAnswer(option);
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;

        setIsSubmitted(true);
        if (selectedAnswer === currentQuestion.correct_answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setScore(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            // FIX: absolute inset-0 locks bounds
            <div className="absolute inset-0 flex flex-col p-6 bg-gradient-to-br from-[#fbfbfb] to-[#f4f4f5] overflow-y-auto">
                <div className="flex flex-col items-center justify-center flex-1 w-full max-w-lg mx-auto bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                    <div className="relative mb-6">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                            <circle
                                cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent"
                                strokeDasharray={60 * 2 * Math.PI}
                                strokeDashoffset={(60 * 2 * Math.PI) - ((score / totalQuestions) * (60 * 2 * Math.PI))}
                                className="text-purple-500 transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-3xl font-bold text-gray-800">{score}</span>
                            <span className="text-sm text-gray-500 block -mt-1">/ {totalQuestions}</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                    <p className="text-gray-500 text-center mb-8">
                        {score === totalQuestions ? "Perfect score! Outstanding job." :
                            score >= totalQuestions / 2 ? "Great effort! You clearly learned a lot." :
                                "Good try! Keep studying to master this topic."}
                    </p>

                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md group"
                    >
                        <RotateCcw size={18} className="group-hover:-rotate-90 transition-transform duration-300" />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        // FIX: absolute inset-0 completely traps the container preventing blowout
        <div className="absolute inset-0 flex flex-col bg-[#fdfdfd] overflow-hidden rounded-xl">
            {/* Progress Bar Header */}
            <div className="px-6 py-5 bg-white border-b border-gray-100 shrink-0 shadow-sm z-10">
                <div className="flex items-center justify-between mb-3 text-sm font-medium text-gray-500">
                    <span>Question {currentIndex + 1} of {totalQuestions}</span>
                    <span className="text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">Score: {score}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-1 overflow-y-auto px-6 pt-8 pb-6 min-h-0 scroll-smooth">
                <div className="max-w-2xl mx-auto w-full">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-3 mb-10">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = option === currentQuestion.correct_answer;

                            let buttonClass = "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ";

                            if (!isSubmitted) {
                                buttonClass += isSelected
                                    ? "border-purple-500 bg-purple-50 shadow-sm"
                                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)]";
                            } else {
                                if (isCorrect) {
                                    buttonClass += "border-green-500 bg-green-50 shadow-sm text-green-900";
                                } else if (isSelected && !isCorrect) {
                                    buttonClass += "border-red-400 bg-red-50 text-red-900";
                                } else {
                                    buttonClass += "border-gray-100 bg-gray-50 opacity-60 text-gray-500";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelectOption(option)}
                                    disabled={isSubmitted}
                                    className={`flex items-start gap-4 ${buttonClass} group`}
                                >
                                    {/* Custom Radio Circle */}
                                    <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSubmitted
                                            ? isCorrect
                                                ? "border-green-500 bg-green-500"
                                                : isSelected ? "border-red-500 bg-red-500" : "border-gray-300 bg-gray-100 opacity-0"
                                            : isSelected
                                                ? "border-purple-600 bg-purple-600"
                                                : "border-gray-300 group-hover:border-purple-400"
                                        }`}>
                                        {isSubmitted ? (
                                            isCorrect ? <CheckCircle2 size={12} className="text-white" />
                                                : isSelected ? <XCircle size={12} className="text-white" /> : null
                                        ) : (
                                            isSelected && <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </div>
                                    <span className="font-medium text-[15px] pr-8">{option}</span>
                                </button>
                            );
                        })}
                    </div>

                    {isSubmitted && (
                        <div className={`rounded-2xl p-6 mb-4 mt-6 animate-[fadeIn_0.3s_ease-out] border ${selectedAnswer === currentQuestion.correct_answer
                                ? "bg-green-50 border-green-100"
                                : "bg-red-50 border-red-100"
                            }`}>
                            <div className="flex items-center gap-2 mb-3">
                                {selectedAnswer === currentQuestion.correct_answer ? (
                                    <>
                                        <CheckCircle2 className="text-green-600" size={20} />
                                        <h4 className="font-semibold text-green-800">Correct!</h4>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="text-red-500" size={20} />
                                        <h4 className="font-semibold text-red-800">Incorrect</h4>
                                    </>
                                )}
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                {currentQuestion.explanation}
                            </p>
                        </div>
                    )}
                    {/* Invisible div to anchor the auto-scroll */}
                    <div ref={scrollBottomRef} className="h-4 w-full" />
                </div>
            </div>

            {/* Footer Action Bottom */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <div className="max-w-2xl mx-auto flex justify-end">
                    {!isSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedAnswer}
                            className={`px-8 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${selectedAnswer
                                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg translate-y-0"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-8 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg"
                        >
                            {currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}
                            <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}