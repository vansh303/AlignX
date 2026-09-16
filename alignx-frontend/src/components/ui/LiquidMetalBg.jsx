import React, { Component } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";

class LiquidMetalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("LiquidMetal Shader failed to render, fallback to CSS gradient.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function LiquidMetalBg({ className = "absolute inset-0 pointer-events-none opacity-20" }) {
  const fallbackGrad = (
    <div className={`bg-gradient-to-br from-cyan-950/30 via-slate-950 to-blue-950/20 ${className}`} />
  );

  return (
    <div className={className}>
      <LiquidMetalErrorBoundary fallback={fallbackGrad}>
        <LiquidMetal
          colorA="#020617"
          colorB="#0891b2"
          colorC="#1e1b4b"
          colorD="#047857"
          speed={0.15}
          style={{ width: "100%", height: "100%" }}
        />
      </LiquidMetalErrorBoundary>
    </div>
  );
}
