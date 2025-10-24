import { WidPage } from "./client-page";


interface PageProps {
  params: { role: string; wid: string };
}

export default async function page({ params }: PageProps) {
   const resolvedParams = await params;
  const id = Number(resolvedParams.wid);

  
  return (
    <WidPage id={id}/>
  );
}


