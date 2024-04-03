import React from "react";
import { Separator } from "./ui/separator";

const Title = ({ title, info }: { title: string; info: string }) => {
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{info}</p>
      </div>
      <Separator className="my-6" />
    </div>
  );
};

export default Title;
