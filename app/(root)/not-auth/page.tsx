import { InfoBlock } from "@/components/shared/info-block";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access denied"
        text="This page can only by viewed by authorized users"
        imageUrl="/images/lock.png"
      />
    </div>
  );
}