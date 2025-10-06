export default async function ProjectPage({ 
  params,
}: { 
  params: Promise<{id: string}>;
}) {

  const {id} = await params

  return <div>dit is project {id}</div>
}
