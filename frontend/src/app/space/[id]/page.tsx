import { redirect } from "next/navigation";

interface LegacySpacePageProps {
  params: Promise<{ id: string }>;
}

export default async function LegacySpacePage({ params }: LegacySpacePageProps) {
  const { id } = await params;
  redirect(`/topic/${id}`);
}
