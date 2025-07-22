import React from "react";

interface Props {
  title: string;
}

const Subheader = ({ title }: Props) => {
  return (
    <>
      <h3 className="text-xl font-semibold mt-6 mb-2 border-l-4 border-primary pl-3">
        {title}
      </h3>
    </>
  );
};

export default Subheader;
