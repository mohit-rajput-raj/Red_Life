'use client'
import Image from "next/image"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import { link } from "fs"
import { use } from "react"
import { useRouter } from "next/navigation"

const models = [
  {
    name: "hospital",
    link:"/dashboard/institution/hospital",
    description: "Everyday tasks and UI generation.",
    image:
      "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
    credit: "Valeria Reverdo on Unsplash",
  },
  {
    name: "blood-bank",
    link:"/dashboard/institution/bank",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
    credit: "Michael Oeser on Unsplash",
  },
  {
    name: "storage",
    link:"/dashboard/institution/storage",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
    credit: "Cherry Laithang on Unsplash",
  },
]

export function SelectInstituteType() {
    const router = useRouter();
  return (
    <div className="flex w-full  flex-col gap-6 px-20">
      <ItemGroup className="grid grid-cols-3 gap-4 w-full flex-wrap ">
        {models.map((model) => (
          <Item onClick={() => router.push(model.link)} key={model.name} variant="outline" className="max-w-[300px] min-w-[100px]  py-5 cursor-pointer">
            <ItemHeader>
              <Image
                src={model.image}
                alt={model.name}
                width={128}
                height={128}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{model.name}</ItemTitle>
              <ItemDescription>{model.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
