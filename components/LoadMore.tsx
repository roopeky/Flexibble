"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const handleNavigation = (direction: string) => {};

const LoadMore = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) => {
  const router = useRouter();

  return (
    <div>
      {hasPreviousPage && (
        <Button
          title="First page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {hasPreviousPage && (
        <Button
          title="Previous page"
          handleClick={() => handleNavigation("previous")}
        />
      )}
    </div>
  );
};

export default LoadMore;
