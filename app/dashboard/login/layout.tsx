export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login page doesn't need authentication checks or dashboard layout
  return <>{children}</>
}