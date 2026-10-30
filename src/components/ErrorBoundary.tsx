import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackRestart?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Applet uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center space-y-4 bg-white rounded-2xl border border-slate-200 shadow-md my-4">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800">화면을 불러오는 중 문제가 발생했습니다</h3>
            <p className="text-xs text-slate-500 mt-1">
              아래 버튼을 눌러 새로운 퀴즈를 다시 시작해주세요.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              if (this.props.fallbackRestart) {
                this.props.fallbackRestart();
              } else {
                window.location.reload();
              }
            }}
            className="w-full py-3 px-4 bg-[#A50034] hover:bg-[#8B002B] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>새로운 5문제 다시 풀기</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
