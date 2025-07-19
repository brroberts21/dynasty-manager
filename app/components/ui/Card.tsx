import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  width?: string;
}

const Card = ({ title, children, size = "md", width = "w-96" }: Props) => {
  return (
    <>
      <div
        className={`card ${width} bg-base-100 card-${size} shadow-sm hover:shadow-md transition-shadow duration-300`}
      >
        <div className="card-body">
          <h2 className="card-title text-lg">{title}</h2>
          <div className="card-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
