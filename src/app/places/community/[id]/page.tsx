import { CommunityPlaceClient } from "./CommunityPlaceClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CommunityPlacePage({ params }: Props) {
  const { id } = await params;
  return <CommunityPlaceClient id={id} />;
}
