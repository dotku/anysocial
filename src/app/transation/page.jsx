"use client";

import { useState } from "react";
import { transations as transationData } from "./transationData";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default function TransationPage() {
  const [transations, setTransations] = useState(transationData);
  return (
    <div>
      <h2 className="text-2xl">tranations</h2>
      {transations.map((t) => (
        <Card key={t.id}>
          <CardBody>
            {t.send} {t.amount}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
