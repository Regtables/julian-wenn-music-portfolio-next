"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

type LoadingScreenWrapperProps = PropsWithChildren;

const LoadingScreenWrapper = ({ children }: LoadingScreenWrapperProps) => {
  const [shouldShowLoading, setShouldShowLoading] = useState(false);

  useEffect(() => {
    const lastLoadingString = localStorage.getItem("lastLoadingScreen");

    if (lastLoadingString) {
      const lastLoading = JSON.parse(lastLoadingString);
      const lastVisit = new Date(lastLoading.date);
      const now = new Date();
      const hoursSinceLastLoading =
        (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastLoading >= 1) {
        localStorage.setItem(
          "lastLoadingScreen",
          JSON.stringify({ date: now.toISOString() })
        );
        setShouldShowLoading(true);
      }
    } else {
      const now = new Date();
      localStorage.setItem(
        "lastLoadingScreen",
        JSON.stringify({ date: now.toISOString() })
      );
      setShouldShowLoading(true);
    }
  }, []);

  return (
    <>
      {shouldShowLoading && <LoadingScreen />}
      <div>{children}</div>
    </>
  );
};

export default LoadingScreenWrapper;
