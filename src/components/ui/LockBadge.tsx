"use client";

import React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "./Tooltip";

export interface LockBadgeProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function LockBadge(_props: LockBadgeProps) {
  // 100% Free & Open Source: No locked features
  return null;
}
