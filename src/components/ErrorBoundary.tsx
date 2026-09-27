import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React application error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl border border-stone-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-amber-600/80 bg-stone-900 shadow-md mx-auto flex items-center justify-center">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h2 className="font-serif-brand text-xl font-bold text-stone-900">
              নরসিংদী ফ্যাশন লোড হচ্ছে...
            </h2>
            <p className="text-xs text-stone-600">
              একটি অপ্রত্যাশিত সমস্যা দেখা দিয়েছে। পেজটি পুনরায় লোড করতে নিচের বাটনে ক্লিক করুন।
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              🔄 পেজ রিলোড করুন
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
