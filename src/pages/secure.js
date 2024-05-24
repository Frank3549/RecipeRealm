import { useSession } from "next-auth/react"

export default function SecurePage() {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>Secure Page</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
