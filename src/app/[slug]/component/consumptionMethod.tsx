import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodProps {
  slug:string
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}
const ConsumptionMethodOption = ({ imageAlt, imageUrl, buttonText, option, slug}:ConsumptionMethodProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 px-10 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
        <Button variant="secondary" className="rounded-full">
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
          {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
