import React from "react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="h-1 w-16 bg-primary rounded mb-6" />
    </>
  );
};

export default Header;
