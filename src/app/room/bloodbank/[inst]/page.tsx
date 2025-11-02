
import Forme from "./form";



interface PageProps {
  params: { role: string; inst: string };
}

export default async function page({ params }: PageProps) {
   const resolvedParams = await params;
  const id = Number(resolvedParams.inst);

  
  return (
   <Forme id={id}/>
  );
}


